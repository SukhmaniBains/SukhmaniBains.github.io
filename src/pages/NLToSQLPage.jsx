import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Database,
  Sparkles,
  Send,
  RotateCcw,
  Code2,
  Table2,
  CheckCircle2,
  Play
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

// Sample enterprise schema
const sampleSchema = {
  tables: [
    {
      name: 'customers',
      columns: [
        { name: 'customer_id', type: 'INT', pk: true },
        { name: 'customer_name', type: 'VARCHAR(100)' },
        { name: 'region', type: 'VARCHAR(50)' },
        { name: 'signup_date', type: 'DATE' },
        { name: 'total_spent', type: 'DECIMAL(12,2)' },
      ]
    },
    {
      name: 'products',
      columns: [
        { name: 'product_id', type: 'INT', pk: true },
        { name: 'product_name', type: 'VARCHAR(100)' },
        { name: 'category', type: 'VARCHAR(50)' },
        { name: 'price', type: 'DECIMAL(10,2)' },
      ]
    },
    {
      name: 'orders',
      columns: [
        { name: 'order_id', type: 'INT', pk: true },
        { name: 'customer_id', type: 'INT', fk: true },
        { name: 'product_id', type: 'INT', fk: true },
        { name: 'quantity', type: 'INT' },
        { name: 'order_date', type: 'DATE' },
        { name: 'revenue', type: 'DECIMAL(12,2)' },
      ]
    }
  ]
};

// Example NL queries
const examples = [
  {
    label: 'Top Products',
    text: 'top 5 products by revenue last quarter'
  },
  {
    label: 'Regional Sales',
    text: 'total sales by region this year'
  },
  {
    label: 'High-Value Customers',
    text: 'customers who spent more than $10,000'
  },
  {
    label: 'Category Breakdown',
    text: 'revenue by product category'
  }
];

// Simple keyword-based NL to SQL converter (mock AI)
const generateSQL = (query) => {
  const q = query.toLowerCase().trim();

  // Parse intent
  let select = ['*'];
  let from = 'orders';
  let joins = [];
  let where = '';
  let groupBy = '';
  let orderBy = '';
  let limit = '';

  // Detect LIMIT
  const limitMatch = q.match(/(?:top|show)\s+(\d+)/);
  if (limitMatch) limit = `LIMIT ${limitMatch[1]}`;

  // Detect aggregation
  if (q.includes('total') || q.includes('sum')) {
    select = ['SUM(o.revenue) as total_revenue'];
  }
  if (q.includes('count') || q.includes('how many') || q.includes('number of')) {
    select = ['COUNT(*) as count'];
  }
  if (q.includes('average') || q.includes('avg')) {
    select = ['AVG(o.revenue) as avg_revenue'];
  }

  // Detect GROUP BY
  if (q.includes('by region')) {
    select.push('c.region');
    groupBy = 'GROUP BY c.region';
    orderBy = 'ORDER BY total_revenue DESC';
    joins.push('JOIN customers c ON o.customer_id = c.customer_id');
    from = 'orders o';
  } else if (q.includes('by product') || q.includes('by category')) {
    select.push('p.category');
    groupBy = 'GROUP BY p.category';
    orderBy = 'ORDER BY total_revenue DESC';
    joins.push('JOIN products p ON o.product_id = p.product_id');
    from = 'orders o';
  } else if (q.includes('by customer')) {
    select.push('c.customer_name');
    groupBy = 'GROUP BY c.customer_name';
    orderBy = 'ORDER BY total_revenue DESC';
    joins.push('JOIN customers c ON o.customer_id = c.customer_id');
    from = 'orders o';
  }

  // Detect WHERE conditions
  if (q.includes('more than') || q.includes('greater than') || q.includes('over')) {
    const amountMatch = q.match(/\$?([\d,]+)/);
    if (amountMatch) {
      const amount = amountMatch[1].replace(/,/g, '');
      if (q.includes('spent') || q.includes('revenue')) {
        where = `WHERE o.revenue > ${amount}`;
      } else if (q.includes('price')) {
        where = `WHERE p.price > ${amount}`;
      }
    }
  }
  if (q.includes('last quarter') || q.includes('this quarter')) {
    where = where ? `${where} AND o.order_date >= DATE_TRUNC('quarter', CURRENT_DATE)`
                  : `WHERE o.order_date >= DATE_TRUNC('quarter', CURRENT_DATE)`;
  }
  if (q.includes('this year') || q.includes('year to date')) {
    where = where ? `${where} AND o.order_date >= DATE_TRUNC('year', CURRENT_DATE)`
                  : `WHERE o.order_date >= DATE_TRUNC('year', CURRENT_DATE)`;
  }
  if (q.includes('last month')) {
    where = where ? `${where} AND o.order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')`
                  : `WHERE o.order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')`;
  }

  // Detect SELECT columns
  if (q.includes('product name') || q.includes('products')) {
    if (!select.some(s => s.includes('product_name'))) {
      select.unshift('p.product_name');
    }
    if (!joins.some(j => j.includes('products'))) {
      joins.push('JOIN products p ON o.product_id = p.product_id');
    }
    from = 'orders o';
  }
  if (q.includes('customer name') || q.includes('customers')) {
    if (!select.some(s => s.includes('customer_name'))) {
      select.unshift('c.customer_name');
    }
    if (!joins.some(j => j.includes('customers'))) {
      joins.push('JOIN customers c ON o.customer_id = c.customer_id');
    }
    from = 'orders o';
  }

  // Default if no aggregation detected and no specific columns
  if (select[0] === '*' && !groupBy) {
    if (q.includes('product')) {
      select = ['p.product_name', 'p.category', 'p.price'];
      joins.push('JOIN products p ON o.product_id = p.product_id');
      from = 'orders o';
    } else if (q.includes('customer')) {
      select = ['c.customer_name', 'c.region', 'c.total_spent'];
      joins.push('JOIN customers c ON o.customer_id = c.customer_id');
      from = 'orders o';
    }
  }

  // Build final SQL
  let sql = `SELECT ${select.filter(Boolean).join(', ')}\nFROM ${from}`;
  if (joins.length) sql += '\n' + joins.join('\n');
  if (where) sql += '\n' + where;
  if (groupBy) sql += '\n' + groupBy;
  if (orderBy) sql += '\n' + orderBy;
  if (limit) sql += '\n' + limit;

  return sql + ';';
};

// Generate mock results based on query type
const generateMockResults = (query) => {
  const q = query.toLowerCase();

  if (q.includes('by region')) {
    return {
      columns: ['region', 'total_revenue'],
      rows: [
        ['North America', '$4,230,000'],
        ['EMEA', '$3,100,000'],
        ['APAC', '$2,450,000'],
        ['Latin America', '$980,000'],
      ]
    };
  }
  if (q.includes('by category') || q.includes('category')) {
    return {
      columns: ['category', 'total_revenue'],
      rows: [
        ['Enterprise Software', '$5,600,000'],
        ['Cloud Infrastructure', '$3,200,000'],
        ['Data Services', '$2,800,000'],
        ['Consulting', '$1,160,000'],
      ]
    };
  }
  if (q.includes('top') && q.includes('product')) {
    return {
      columns: ['product_name', 'total_revenue'],
      rows: [
        ['Analytics Platform Pro', '$1,240,000'],
        ['Data Warehouse Suite', '$980,000'],
        ['BI Connector Enterprise', '$760,000'],
        ['Report Builder Cloud', '$540,000'],
        ['ETL Pipeline Manager', '$420,000'],
      ]
    };
  }
  if (q.includes('spent') || q.includes('high-value')) {
    return {
      columns: ['customer_name', 'region', 'total_spent'],
      rows: [
        ['Acme Corporation', 'North America', '$42,000'],
        ['GlobalTech Industries', 'EMEA', '$38,500'],
        ['Pacific Data Systems', 'APAC', '$31,200'],
        ['Metro Analytics Group', 'North America', '$28,900'],
      ]
    };
  }

  // Default
  return {
    columns: ['order_id', 'customer_name', 'product_name', 'revenue', 'order_date'],
    rows: [
      ['10842', 'Acme Corporation', 'Analytics Platform Pro', '$12,000', '2026-04-15'],
      ['10841', 'GlobalTech Industries', 'Data Warehouse Suite', '$8,500', '2026-04-14'],
      ['10840', 'Pacific Data Systems', 'BI Connector Enterprise', '$6,200', '2026-04-13'],
      ['10839', 'Metro Analytics Group', 'Report Builder Cloud', '$4,900', '2026-04-12'],
      ['10838', 'Summit Financial', 'ETL Pipeline Manager', '$3,800', '2026-04-11'],
    ]
  };
};

// Simple SQL syntax highlighter
const highlightSQL = (sql) => {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'LIMIT', 'AND', 'OR', 'AS', 'COUNT', 'SUM', 'AVG', 'DATE_TRUNC', 'CURRENT_DATE', 'INTERVAL'];
  let highlighted = sql;
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi');
    highlighted = highlighted.replace(regex, `<span class="text-accent-blue font-semibold">${kw}</span>`);
  });
  // String literals
  highlighted = highlighted.replace(/'[^']*'/g, '<span class="text-accent-emerald">$&</span>');
  // Numbers
  highlighted = highlighted.replace(/\$?[\d,]+/g, '<span class="text-accent-gold">$&</span>');
  return highlighted;
};

const NLToSQLPage = () => {
  const [input, setInput] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [sqlResult, setSqlResult] = useState(null);
  const [mockResults, setMockResults] = useState(null);
  const [showSchema, setShowSchema] = useState(true);

  const convert = useCallback(() => {
    if (!input.trim()) return;
    setIsConverting(true);
    setSqlResult(null);
    setMockResults(null);

    // Simulate processing delay
    setTimeout(() => {
      const sql = generateSQL(input.trim());
      const results = generateMockResults(input.trim());
      setSqlResult(sql);
      setMockResults(results);
      setIsConverting(false);
    }, 600 + Math.random() * 400);
  }, [input]);

  const loadExample = (text) => {
    setInput(text);
    setSqlResult(null);
    setMockResults(null);
  };

  const clearAll = () => {
    setInput('');
    setSqlResult(null);
    setMockResults(null);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <AnimatedSection>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-blue transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Home</span>
          </Link>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Database size={20} className="text-accent-blue" />
            <span className="font-mono text-xs text-accent-blue tracking-wider uppercase">
              Interactive Demo
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Natural Language to SQL
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Type a business question in plain English and see the AI-generated SQL query - with a mock execution preview.
          </p>
        </AnimatedSection>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Input & Schema */}
          <div className="lg:col-span-1 space-y-4">
            {/* Schema Toggle */}
            <AnimatedSection delay={0.1}>
              <div className="bg-bg-secondary border border-border-color rounded-xl p-4">
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <Table2 size={16} className="text-accent-blue" />
                  <span className="font-heading font-semibold text-sm text-text-primary">Sample Schema</span>
                  <span className="ml-auto text-xs text-text-muted">
                    {showSchema ? 'Hide' : 'Show'}
                  </span>
                </button>

                <AnimatePresence>
                  {showSchema && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 space-y-3">
                        {sampleSchema.tables.map((table) => (
                          <div key={table.name} className="text-xs">
                            <div className="font-mono font-semibold text-accent-gold mb-1">
                              {table.name}
                            </div>
                            <div className="space-y-0.5 pl-2">
                              {table.columns.map((col) => (
                                <div key={col.name} className="flex items-center gap-2">
                                  <span className="text-text-secondary">{col.name}</span>
                                  <span className="text-text-muted text-[10px]">{col.type}</span>
                                  {col.pk && <span className="text-accent-blue text-[10px]">PK</span>}
                                  {col.fk && <span className="text-accent-coral text-[10px]">FK</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>

            {/* Input Area */}
            <AnimatedSection delay={0.2}>
              <div className="bg-bg-secondary border border-border-color rounded-xl p-4">
                <label className="font-heading font-semibold text-sm text-text-primary mb-3 block">
                  Ask a Question
                </label>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., top 5 products by revenue last quarter..."
                  className="w-full h-28 bg-bg-primary border border-border-color rounded-lg p-3 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent-blue transition-colors text-sm leading-relaxed"
                />

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <button
                    onClick={convert}
                    disabled={isConverting || !input.trim()}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-accent-blue hover:bg-accent-blue-hover text-bg-primary font-medium text-xs rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isConverting ? (
                      <>
                        <Sparkles size={14} className="animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Convert to SQL
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-border-color text-text-secondary text-xs rounded-lg hover:border-text-muted transition-colors"
                  >
                    <RotateCcw size={14} />
                    Clear
                  </button>
                </div>

                {/* Examples */}
                <div className="mt-4">
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider mb-2 block">
                    Try These
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((ex) => (
                      <button
                        key={ex.label}
                        onClick={() => loadExample(ex.text)}
                        className="px-2.5 py-1.5 rounded-lg bg-bg-primary border border-border-color text-[11px] text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="wait">
              {isConverting && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-bg-secondary border border-border-color rounded-xl p-6 flex items-center justify-center gap-3"
                >
                  <Sparkles size={18} className="text-accent-blue animate-spin" />
                  <span className="text-text-secondary text-sm">Generating SQL from natural language...</span>
                </motion.div>
              )}

              {sqlResult && !isConverting && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* SQL Output */}
                  <div className="bg-bg-secondary border border-border-color rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border-color">
                      <div className="flex items-center gap-2">
                        <Code2 size={16} className="text-accent-blue" />
                        <span className="font-heading font-semibold text-sm text-text-primary">
                          Generated SQL
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-muted font-mono">ANSI SQL</span>
                        <div className="flex items-center gap-1.5 text-accent-emerald text-xs">
                          <CheckCircle2 size={14} />
                          Valid
                        </div>
                      </div>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre
                        className="font-mono text-sm text-text-secondary leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: highlightSQL(sqlResult) }}
                      />
                    </div>
                  </div>

                  {/* Mock Execution */}
                  {mockResults && (
                    <div className="bg-bg-secondary border border-border-color rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-color">
                        <Play size={16} className="text-accent-emerald" />
                        <span className="font-heading font-semibold text-sm text-text-primary">
                          Mock Results
                        </span>
                        <span className="ml-auto text-[10px] text-text-muted font-mono">
                          {mockResults.rows.length} rows
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border-color">
                              {mockResults.columns.map((col) => (
                                <th
                                  key={col}
                                  className="text-left px-4 py-2.5 font-mono text-xs text-accent-blue font-medium"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {mockResults.rows.map((row, i) => (
                              <tr
                                key={i}
                                className="border-b border-border-color/50 hover:bg-bg-primary/50 transition-colors"
                              >
                                {row.map((cell, j) => (
                                  <td key={j} className="px-4 py-2.5 text-text-secondary">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-accent-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm text-text-primary mb-1">
                          How It Works
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed">
                          This demo uses keyword extraction and pattern matching to translate natural language into SQL.
                          In production, a fine-tuned LLM (like Text-to-SQL models from Defog or MotherDuck) would
                          handle ambiguous queries, complex joins, and database-specific syntax. The schema context
                          is passed as part of the prompt for accurate table/column resolution.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {!isConverting && !sqlResult && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-bg-secondary border border-border-color rounded-xl flex flex-col items-center justify-center text-center py-20"
                >
                  <Database size={48} className="text-text-muted/30 mb-4" />
                  <h3 className="font-heading font-semibold text-text-muted mb-2">
                    Ready to Convert
                  </h3>
                  <p className="text-text-muted text-sm max-w-xs">
                    Type a business question or select an example to see the AI-generated SQL query.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NLToSQLPage;
