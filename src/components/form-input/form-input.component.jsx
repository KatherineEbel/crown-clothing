import {useState} from "react";
import './form-input.styles.scss';

export default function FormInput ({label, id = '', ...rest}) {
  const [message, setMessage] = useState(null)
  const hasLength = rest.value.length > 0;

  function showError(field) {
    if (field.validity.valueMissing) {
      setMessage(`This field is required`)
    }
    if (field.validity.patternMismatch) {
      setMessage(`This doesn't look like a valid email`)
    }
    if (field.validity.tooShort) {
      setMessage(`Field must be at least ${field.minLength} characters long`)
    }
  }

  function onFocus(e) {
    const label = e.currentTarget.previousElementSibling;
    console.log(e.currentTarget, label)
    if (!label.classList.contains('shrink')) {
      label.classList.toggle('shrink')
    }
    if (message) setMessage(null);
  }

  function onBlur(e) {
    let length = e.currentTarget.value.length;
    if (!length) {
      e.currentTarget.classList.toggle('shrink');
    }
    if (e.currentTarget.checkValidity()) return;
    showError(e.currentTarget);
  }

  return (
    <div className='group'>
      <label htmlFor={id || rest.name} className={`form-input-label ${hasLength ? 'shrink' : ''}`}>
        {label}{' '}
      </label>
      <input className='form-input' {...rest} id={id || rest.name} onBlur={onBlur} onFocus={onFocus} />
      {message ? (
        <span className='form-input-error'>{message}</span>
      ) : null}
    </div>
)
}