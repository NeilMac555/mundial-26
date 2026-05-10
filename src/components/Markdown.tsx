import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

// Markdown rendering for the Terminal palette. Headings in gold (sparingly),
// body in --color-text-2, links in gold, tables sit in surface cards.
const components: Components = {
  h1: ({ children }) => (
    <h2
      className="mt-8 mb-3"
      style={{
        fontSize: 24,
        fontWeight: 500,
        color: 'var(--color-text)',
        letterSpacing: '-0.018em',
      }}
    >
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3
      className="mt-8 mb-3 pb-2"
      style={{
        fontSize: 18,
        fontWeight: 500,
        color: 'var(--color-text)',
        borderBottom: '1px solid var(--color-border)',
        letterSpacing: '-0.012em',
      }}
    >
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4
      className="mt-6 mb-2 font-mono"
      style={{
        fontSize: 11.5,
        fontWeight: 500,
        color: 'var(--color-gold)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </h4>
  ),
  h4: ({ children }) => (
    <h5
      className="mt-4 mb-1.5 font-mono"
      style={{
        fontSize: 10.5,
        fontWeight: 500,
        color: 'var(--color-text-3)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </h5>
  ),
  p: ({ children }) => (
    <p style={{ marginBottom: 12, fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-2)' }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul
      className="mb-3 pl-5 [&>li]:list-disc"
      style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--color-text-2)',
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className="mb-3 pl-5 [&>li]:list-decimal"
      style={{
        fontSize: 14,
        lineHeight: 1.6,
        color: 'var(--color-text-2)',
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
  strong: ({ children }) => (
    <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>{children}</em>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: 'var(--color-gold)', textDecoration: 'underline', textUnderlineOffset: 3 }}
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr
      className="my-8"
      style={{ border: 'none', borderTop: '1px solid var(--color-border)' }}
    />
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="my-3 px-4 py-2"
      style={{
        borderLeft: '2px solid var(--color-gold)',
        background: 'rgba(232, 185, 74, 0.05)',
        fontSize: 14,
        color: 'var(--color-text-2)',
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => {
    const isBlock =
      'className' in props &&
      typeof (props as { className?: string }).className === 'string' &&
      (props as { className?: string }).className!.startsWith('language-');
    if (isBlock) {
      return (
        <pre
          className="num my-3 overflow-x-auto rounded-md p-3"
          style={{
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-2)',
            fontSize: 12,
            color: 'var(--color-text-2)',
          }}
        >
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code
        className="num rounded px-1.5 py-0.5"
        style={{
          background: 'var(--color-surface-2)',
          color: 'var(--color-text)',
          fontSize: '0.88em',
          border: '1px solid var(--color-border)',
        }}
      >
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div
      className="my-4 overflow-x-auto rounded-md"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead
      style={{
        background: 'var(--color-surface)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-3)',
        fontWeight: 500,
      }}
    >
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>{children}</tr>
  ),
  th: ({ children }) => (
    <th style={{ padding: '11px 14px', textAlign: 'left' }}>{children}</th>
  ),
  td: ({ children }) => (
    <td
      style={{
        padding: '11px 14px',
        verticalAlign: 'top',
        fontSize: 13,
        color: 'var(--color-text-2)',
      }}
    >
      {children}
    </td>
  ),
};

export function Markdown({ source }: { source: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
