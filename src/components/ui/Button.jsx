import Icon from './Icon.jsx'

export default function Button({ href, children, variant = 'primary', icon = 'arrow_outward', className = '', ...props }) {
  const classNames = `button button-${variant} ${className}`
  const content = <>{children}{icon && <Icon name={icon} />}</>
  return href
    ? <a className={classNames} href={href} {...props}>{content}</a>
    : <button type="button" className={classNames} {...props}>{content}</button>
}
