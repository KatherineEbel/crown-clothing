import {useState} from "react";
import FormInput from "../form-input/form-input.component";
import './signup-form.style.scss'
import Button from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignUpStart, googleSignUpStart} from "../../store/user/user.action";

export default function SignUpForm() {
  const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [fields, setFields] = useState(defaultFields);
  const [signUpError, setSignUpError] = useState(null);
  const dispatch = useDispatch()

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setSignUpError(null);
    try {
      dispatch(googleSignUpStart())
    } catch (e) {
      setSignUpError('OOPS! Something went wrong')
      console.log(e)
    }
  }

  // rH6cC9yg@ipPP7c
  const onSubmit = async (e) => {
    e.preventDefault()
    setSignUpError(null);
    const {confirmPassword, displayName, email, password} = fields
    if (!e.currentTarget.checkValidity() || confirmPassword !== password) {
      return alert('form not valid')
    }
    try {
      dispatch(emailSignUpStart(email, password, displayName))
      setFields(defaultFields);
    } catch (e) {
      setSignUpError('OOPS! Something went wrong')
      console.error(e);
    }
  }

  const onInputChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setFields({...fields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>I do not have an account</h2>
      <p>Sign up with your email and password</p>
      {signUpError ? (<p className='signup-error'>{signUpError}</p>) : null}
      <form method="post" onSubmit={onSubmit} noValidate>
        <FormInput value={fields.displayName} name='displayName' type='text' label='Display Name'
                   onChange={onInputChange} required/>
        <FormInput value={fields.email} name='email' type='email' label='Email' pattern='.+@.+\..+'
                   onChange={onInputChange} required/>
        <FormInput value={fields.password} name='password' type='password' label='Password' minLength={6}
                   onChange={onInputChange} required/>
        <FormInput value={fields.confirmPassword} name='confirmPassword' type='password' label='Confirm Password'
                   minLength={6} onChange={onInputChange} required/>
        <div className="actions">
          <Button type='submit'>
            Submit
          </Button>
          <Button className='google' onClick={signUpWithGoogle}>
            Sign up with google
          </Button>
        </div>
      </form>
    </div>
  )
}