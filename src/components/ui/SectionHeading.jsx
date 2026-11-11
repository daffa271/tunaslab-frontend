export default function SectionHeading({ id, label, children, description, className = '' }) {
  return (
    <div className={`section-heading ${className}`}>
      {label && <p className="section-label">{label}</p>}
      <h2 id={id}>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
