export default function ScrollReveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}