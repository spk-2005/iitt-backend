import noiseSrc from '../../assets/noise-256.webp';

export function NoiseOverlay({ className = '', style = {} }) {
  return (
    <div
      className={`noise-overlay absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'overlay',
        backgroundImage: `url(${noiseSrc})`,
        backgroundSize: '200px 200px',
        ...style,
      }}
    />
  );
}