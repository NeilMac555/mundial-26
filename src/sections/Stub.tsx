import { TLabel } from '../components/terminal/atoms';

interface Props {
  description: string;
  needs: string[];
}

export function Stub({ description, needs }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: 0 }}>{description}</p>
      <div>
        <div style={{ marginBottom: 8 }}>
          <TLabel>Needs</TLabel>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {needs.map((n) => (
            <li key={n} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--color-text-2)' }}>
              <span style={{ color: 'var(--color-text-4)' }}>·</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
