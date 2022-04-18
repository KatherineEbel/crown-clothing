import './button.styles.scss';

const BUTTON_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
}

export default function Button({children, className, ...otherProps}) {
  return (
    <button className={`button-container ${BUTTON_CLASSES[className]}`} {...otherProps}>
      {children}
    </button>
  )
}