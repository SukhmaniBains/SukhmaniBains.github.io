import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  Sparkles,
  Loader2,
  Send,
  RotateCcw,
  Smile,
  Frown,
  Meh,
  CheckCircle
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

// Simple brain icon
const BrainIcon = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

// Examples
const examples = [
  {
    label: 'Product Review',
    text: 'This product completely exceeded my expectations! The build quality is excellent and the features are exactly what I needed. I would highly recommend this to anyone looking for a reliable solution.'
  },
  {
    label: 'Support Ticket',
    text: 'I am extremely frustrated with the service I received. The response time was unacceptable, and the issue remains unresolved after three weeks. This is not the level of support I expected from a premium product.'
  },
  {
    label: 'Meeting Notes',
    text: 'The quarterly review meeting covered standard topics including budget allocation, resource planning, and upcoming milestones. No major concerns were raised. Action items were assigned to respective team leads.'
  }
];

// Keyword-based sentiment analysis (fallback when transformers.js unavailable)
const keywordAnalyze = (text) => {
  const lower = text.toLowerCase();
  const positiveWords = ['excellent', 'great', 'amazing', 'love', 'best', 'recommend', 'exceeded', 'good', 'happy', 'perfect', 'outstanding', 'wonderful', 'fantastic', 'awesome', 'pleased', 'satisfied', ' delighted', 'impressed', 'superb', 'brilliant'];
  const negativeWords = ['terrible', 'awful', 'horrible', 'hate', 'worst', 'frustrated', 'unacceptable', 'bad', 'disappointed', 'angry', 'poor', 'broken', 'useless', 'annoying', 'disgusting', 'regret', 'failure', 'painful', 'difficult', 'slow'];

  let posCount = 0;
  let negCount = 0;

  positiveWords.forEach(w => {
    const regex = new RegExp(w, 'g');
    const matches = lower.match(regex);
    if (matches) posCount += matches.length;
  });
  negativeWords.forEach(w => {
    const regex = new RegExp(w, 'g');
    const matches = lower.match(regex);
    if (matches) negCount += matches.length;
  });

  const totalWords = text.trim().split(/\s+/).length;
  const wordIntensity = Math.min(totalWords / 50, 1);

  let positive = 33 + posCount * 12 - negCount * 8;
  let negative = 33 + negCount * 12 - posCount * 8;
  let neutral = 100 - positive - negative;

  // Clamp values
  if (positive < 5) positive = 5;
  if (negative < 5) negative = 5;
  if (neutral < 5) neutral = 5;

  // Normalize
  const sum = positive + negative + neutral;
  positive = Math.round((positive / sum) * 100);
  negative = Math.round((negative / sum) * 100);
  neutral = 100 - positive - negative;

  // Determine overall
  let overall = 'neutral';
  let confidence = neutral;
  if (positive > negative && positive > neutral) {
    overall = 'positive';
    confidence = positive;
  } else if (negative > positive && negative > neutral) {
    overall = 'negative';
    confidence = negative;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        overall,
        confidence,
        scores: { positive, negative, neutral }
      });
    }, 800 + Math.random() * 600);
  });
};

// Try to load transformers.js dynamically (external, not bundled)
let transformersAvailable = false;
let transformersPipeline = null;

const loadTransformersModel = async () => {
  try {
    const moduleName = '@xenova/transformers';
    const transformers = await import(/* @vite-ignore */ moduleName);
    transformers.env.allowLocalModels = false;
    transformers.env.useBrowserCache = true;
    transformersPipeline = await transformers.pipeline(
      'sentiment-analysis',
      'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
      { quantized: true }
    );
    transformersAvailable = true;
    return transformersPipeline;
  } catch (err) {
    console.log('Transformers.js not available:', err.message);
    transformersAvailable = false;
    return null;
  }
};

const AIDemoPage = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [useRealModel, setUseRealModel] = useState(false);

  // Try to load transformers.js on mount
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        setModelLoading(true);
        setLoadProgress(5);

        const pipe = await loadTransformersModel();
        if (cancelled) return;

        if (pipe) {
          setLoadProgress(100);
          setUseRealModel(true);
        }
        setModelLoading(false);
      } catch (err) {
        if (cancelled) return;
        setModelLoading(false);
        setUseRealModel(false);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const analyze = useCallback(async () => {
    if (!inputText.trim() || inputText.trim().length < 3) {
      setError('Please enter at least 3 characters to analyze.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setResult(null);

    try {
      let sentimentResult;

      if (useRealModel && transformersPipeline) {
        setModelLoading(true);
        setLoadProgress(40);

        const output = await transformersPipeline(inputText.trim(), { top_k: 3 });

        const scores = { positive: 0, negative: 0, neutral: 0 };
        output.forEach((item) => {
          const label = item.label.toLowerCase();
          if (label.includes('positive')) scores.positive = Math.round(item.score * 100);
          else if (label.includes('negative')) scores.negative = Math.round(item.score * 100);
          else if (label.includes('neutral')) scores.neutral = Math.round(item.score * 100);
        });

        const total = scores.positive + scores.negative + scores.neutral;
        if (total === 0) {
          scores.positive = 0; scores.negative = 0; scores.neutral = 100;
        } else if (total !== 100) {
          scores.positive = Math.round((scores.positive / total) * 100);
          scores.negative = Math.round((scores.negative / total) * 100);
          scores.neutral = 100 - scores.positive - scores.negative;
        }

        let overall = 'neutral';
        let confidence = scores.neutral;
        if (scores.positive > scores.negative && scores.positive > scores.neutral) {
          overall = 'positive';
          confidence = scores.positive;
        } else if (scores.negative > scores.positive && scores.negative > scores.neutral) {
          overall = 'negative';
          confidence = scores.negative;
        }

        sentimentResult = { overall, confidence, scores };
      } else {
        sentimentResult = await keywordAnalyze(inputText.trim());
      }

      setResult(sentimentResult);
    } catch (err) {
      setError('Analysis failed. Using fallback mode.');
      try {
        const fallback = await keywordAnalyze(inputText.trim());
        setResult(fallback);
      } catch {
        setError('Unable to analyze text. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
      setModelLoading(false);
      setLoadProgress(0);
    }
  }, [inputText, useRealModel]);

  const loadExample = (text) => {
    setInputText(text);
    setResult(null);
    setError(null);
  };

  const clearAll = () => {
    setInputText('');
    setResult(null);
    setError(null);
    setLoadProgress(0);
  };

  const sentimentConfig = {
    positive: {
      label: 'Positive',
      emoji: '😊',
      icon: Smile,
      color: 'text-accent-emerald',
      bg: 'bg-accent-emerald/10',
      border: 'border-accent-emerald/30',
      bar: 'bg-accent-emerald'
    },
    negative: {
      label: 'Negative',
      emoji: '😠',
      icon: Frown,
      color: 'text-accent-coral',
      bg: 'bg-accent-coral/10',
      border: 'border-accent-coral/30',
      bar: 'bg-accent-coral'
    },
    neutral: {
      label: 'Neutral',
      emoji: '😐',
      icon: Meh,
      color: 'text-accent-gold',
      bg: 'bg-accent-gold/10',
      border: 'border-accent-gold/30',
      bar: 'bg-accent-gold'
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-accent-blue" />
            <span className="font-mono text-xs text-accent-blue tracking-wider uppercase">
              Interactive Demo
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mb-4">
            AI Sentiment Analysis Dashboard
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-6">
            Real-time NLP powered by Transformers.js. Analyze any text to detect sentiment - completely in your browser.
          </p>

          {/* Privacy Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/30">
            <Shield size={16} className="text-accent-emerald" />
            <span className="text-accent-emerald text-sm font-medium">
              100% Private - All analysis runs in your browser
            </span>
          </div>
        </AnimatedSection>

        {/* Main Content */}
        <AnimatedSection delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-heading font-semibold text-sm text-text-primary">
                    Enter Text to Analyze
                  </label>
                  <span className="text-xs text-text-muted font-mono">
                    {inputText.length} chars
                  </span>
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setError(null);
                  }}
                  placeholder="Paste customer feedback, reviews, meeting notes, or any text to analyze..."
                  className="w-full h-48 bg-bg-primary border border-border-color rounded-lg p-4 text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent-blue transition-colors text-sm leading-relaxed"
                />

                {error && (
                  <p className="text-accent-coral text-sm mt-3">{error}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <button
                    onClick={analyze}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-blue hover:bg-accent-blue-hover text-bg-primary font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Analyze Sentiment
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-border-color hover:border-text-muted text-text-secondary hover:text-text-primary font-medium text-sm rounded-lg transition-colors"
                  >
                    <RotateCcw size={16} />
                    Clear
                  </button>
                </div>

                {/* Example Buttons */}
                <div className="mt-6">
                  <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-3 block">
                    Try Examples
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {examples.map((ex) => (
                      <button
                        key={ex.label}
                        onClick={() => loadExample(ex.text)}
                        className="px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-xs text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-colors"
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <AnimatePresence mode="wait">
                {isAnalyzing && modelLoading && !result && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-bg-secondary border border-border-color rounded-xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Loader2 size={20} className="text-accent-blue animate-spin" />
                      <span className="font-heading font-semibold text-text-primary">
                        {useRealModel ? 'Loading AI Model...' : 'Preparing Analysis...'}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-blue-hover rounded-full"
                        animate={{ width: `${loadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">
                        {useRealModel ? 'Downloading model (~66MB)' : 'Processing...'}
                      </span>
                      <span className="text-xs font-mono text-accent-blue">
                        {Math.round(loadProgress)}%
                      </span>
                    </div>

                    {useRealModel && (
                      <p className="text-xs text-text-muted mt-4">
                        This only happens once. The model is cached for future analyses.
                      </p>
                    )}
                  </motion.div>
                )}

                {result && !isAnalyzing && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {/* Overall Sentiment */}
                    <div className={`bg-bg-secondary border rounded-xl p-6 ${sentimentConfig[result.overall].border} ${sentimentConfig[result.overall].bg}`}>
                      <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-3 block">
                        Overall Sentiment
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">{sentimentConfig[result.overall].emoji}</span>
                        <div>
                          <h3 className={`font-heading text-2xl font-bold ${sentimentConfig[result.overall].color}`}>
                            {sentimentConfig[result.overall].label}
                          </h3>
                          <p className="text-text-muted text-sm">
                            {result.confidence}% confidence
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-bg-secondary border border-border-color rounded-xl p-6">
                      <span className="text-xs text-text-muted font-mono uppercase tracking-wider mb-4 block">
                        Sentiment Breakdown
                      </span>

                      <div className="space-y-4">
                        {(['positive', 'negative', 'neutral']).map((key) => {
                          const config = sentimentConfig[key];
                          const value = result.scores[key];
                          return (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <config.icon size={16} className={config.color} />
                                  <span className="text-sm text-text-primary capitalize">{config.label}</span>
                                </div>
                                <span className="text-sm font-mono font-medium text-text-primary">
                                  {value}%
                                </span>
                              </div>
                              <div className="w-full h-2.5 bg-bg-primary rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${value}%` }}
                                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                                  className={`h-full rounded-full ${config.bar}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-accent-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-sm text-text-primary mb-1">
                            Analysis Complete
                          </h4>
                          <p className="text-xs text-text-muted leading-relaxed">
                            {useRealModel
                              ? 'The text was processed locally using a DistilBERT sentiment model. No data was transmitted to any external server.'
                              : 'Analysis completed using keyword-based sentiment scoring. For production use, a trained transformer model would provide more nuanced results.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isAnalyzing && !result && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-bg-secondary border border-border-color rounded-xl flex flex-col items-center justify-center text-center py-16"
                  >
                    <BrainIcon size={48} className="text-text-muted/30 mb-4" />
                    <h3 className="font-heading font-semibold text-text-muted mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-text-muted text-sm max-w-xs">
                      Enter some text and click "Analyze Sentiment" to see the AI-powered results.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default AIDemoPage;
