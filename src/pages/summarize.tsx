import React, { useState } from 'react';

export default function SummarizePage() {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState<'bullet' | 'paragraph' | 'action'>('bullet');
  const [useBold, setUseBold] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function formatSummary(summary: string, useBold: boolean) {
    if (useBold) {
      return summary;
    } else {
      return summary
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1');
    }
  }

  async function handleSummarize() {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, style, useBold }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to summarize');
      } else {
        setSummary(formatSummary(data.summary, useBold));
      }
    } catch (e) {
      setError('Network error');
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '3rem auto',
        fontFamily: "'Inter', sans-serif",
        color: '#1a202c',
        padding: '0 1rem',
      }}
    >
      <h1
        style={{
          fontWeight: 700,
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#2c5282',
          textShadow: '1px 1px 3px rgba(44,82,130,0.3)',
        }}
      >
        CleanNote.AI
      </h1>

      <label
        htmlFor="input"
        style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '1.1rem',
          marginBottom: 6,
          color: '#2d3748',
        }}
      >
        Enter text to summarize:
      </label>
      <textarea
        id="input"
        rows={8}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste or type your text here..."
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: '1.8px solid #cbd5e0',
          boxShadow: 'inset 0 1px 3px rgb(0 0 0 / 0.05)',
          resize: 'vertical',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '1.75rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#2b6cb0')}
        onBlur={e => (e.currentTarget.style.borderColor = '#cbd5e0')}
      />

      <label
        htmlFor="style"
        style={{
          display: 'block',
          fontWeight: 600,
          fontSize: '1.1rem',
          marginBottom: 6,
          color: '#2d3748',
        }}
      >
        Choose summary style:
      </label>
      <select
        id="style"
        value={style}
        onChange={e => setStyle(e.target.value as 'bullet' | 'paragraph' | 'action')}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          borderRadius: 8,
          border: '1.8px solid #cbd5e0',
          boxShadow: 'inset 0 1px 3px rgb(0 0 0 / 0.05)',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '1.75rem',
          transition: 'border-color 0.3s ease',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = '#2b6cb0')}
        onBlur={e => (e.currentTarget.style.borderColor = '#cbd5e0')}
      >
        <option value="bullet">Bullet Points</option>
        <option value="paragraph">Paragraph</option>
        <option value="action">Actionable Insights</option>
      </select>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.75rem',
          fontWeight: 600,
          fontSize: 16,
          color: '#2d3748',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <input
          type="checkbox"
          checked={useBold}
          onChange={e => {
            setUseBold(e.target.checked);
            if (summary) {
              setSummary(formatSummary(summary, e.target.checked));
            }
          }}
          style={{
            marginRight: 12,
            width: 20,
            height: 20,
            cursor: 'pointer',
            accentColor: '#2b6cb0',
          }}
        />
        Use bold formatting in summary
      </label>

      <button
        onClick={handleSummarize}
        disabled={loading || !input.trim()}
        style={{
          backgroundColor: loading || !input.trim() ? '#a0aec0' : '#2b6cb0',
          color: 'white',
          border: 'none',
          padding: '14px 24px',
          fontSize: 18,
          fontWeight: 600,
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          borderRadius: 10,
          boxShadow: loading || !input.trim() ? 'none' : '0 4px 14px rgba(43,108,176,0.4)',
          width: '100%',
          transition: 'background-color 0.3s ease',
          marginBottom: 32,
        }}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && (
        <p
          style={{
            color: '#e53e3e',
            backgroundColor: '#fff5f5',
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid #feb2b2',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          {error}
        </p>
      )}

      {summary && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            backgroundColor: 'white',
            padding: 24,
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 24px rgba(160,174,192,0.25)',
            fontSize: 16,
            lineHeight: 1.5,
            fontFamily: "'Inter', monospace",
            color: '#2d3748',
            userSelect: 'text',
            maxHeight: 400,
            overflowY: 'auto',
          }}
        >
          {summary}
        </pre>
      )}
    </div>
  );
}
