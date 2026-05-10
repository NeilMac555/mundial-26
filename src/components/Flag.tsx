import { flagFor } from '../data/flags';

interface Props {
  nation: string;
  size?: 16 | 20 | 24 | 32 | 48 | 64;
  className?: string;
}

const SRC_WIDTH: Record<number, number> = { 16: 20, 20: 20, 24: 40, 32: 40, 48: 80, 64: 80 };
const SRC_WIDTH_2X: Record<number, number> = { 16: 40, 20: 40, 24: 80, 32: 80, 48: 160, 64: 160 };

export function Flag({ nation, size = 20, className }: Props) {
  const code = flagFor(nation);
  if (!code) {
    return (
      <span
        aria-label={nation}
        className={'inline-block rounded-sm border border-stone-700/60 bg-stone-800/60 ' + (className ?? '')}
        style={{ width: size, height: Math.round(size * 0.75) }}
      />
    );
  }
  const w = SRC_WIDTH[size];
  const w2 = SRC_WIDTH_2X[size];
  return (
    <img
      src={`https://flagcdn.com/w${w}/${code}.png`}
      srcSet={`https://flagcdn.com/w${w2}/${code}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code.toUpperCase()}
      loading="lazy"
      className={'inline-block rounded-sm border border-stone-700/40 align-middle ' + (className ?? '')}
    />
  );
}
