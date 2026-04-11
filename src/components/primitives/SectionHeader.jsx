export function SectionHeader({ tag, title, description, className = '' }) {
  return (
    <div className={className}>
      {tag && <p className="anseru-section-tag">{tag}</p>}
      {title && (
        <h2
          className="anseru-section-title mt-1"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {description && (
        <p className="anseru-section-description mt-3">{description}</p>
      )}
    </div>
  );
}