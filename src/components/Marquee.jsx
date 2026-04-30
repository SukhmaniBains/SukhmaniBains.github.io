const Marquee = () => {
  const items = [
    'POWER BI', 'FABRIC', 'SQL', 'SNOWFLAKE', 'TABLEAU', 'PYTHON',
    'Salesforce', 'Clari', 'Vena', 'Planful', 'ETL/ELT', 'Azure',
    'LLMs', 'LangChain'
  ];

  const renderItems = (keyPrefix) => (
    <div className="flex items-center gap-8 whitespace-nowrap">
      {items.map((item, index) => (
        <span key={`${keyPrefix}-${index}`} className="flex items-center gap-8">
          <span className="font-mono text-sm md:text-base text-text-muted tracking-wider uppercase">
            {item}
          </span>
          <span className="text-accent-blue text-lg">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden py-6 bg-bg-secondary/50 border-y border-border-color">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {renderItems('a')}
        {renderItems('b')}
        {renderItems('c')}
      </div>
    </div>
  );
};

export default Marquee;
