import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {useState} from "react";
import './signin-form.style.scss'
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

export default function SignInForm () {
  const defaultFields = {
    email: '',
    password: '',
  }
  const [fields, setFields] = useState(defaultFields);
  const [signInError, setSignInError] = useState(null);
  const dispatch = useDispatch()

  const onSignInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  // rH6cC9yg@ipPP7c
  const onSubmit = async (e) => {
    e.preventDefault()
    setSignInError(null);
    if (!e.currentTarget.checkValidity()) {
      return alert('form not valid')
    }
    try {
      dispatch(emailSignInStart(...Object.values(fields)))
      setFields(defaultFields);
    } catch (e) {
      let message;
      if (e.code === 'auth/wrong-password') {
        message = 'Please recheck your password'
      } else if (e.code === 'auth/user-not-found') {
        message = 'Double check your credentials'
      } else {
        message = 'OOPs! Something went wrong'
      }
      setSignInError(message)
    }
  }

  const onInputChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setFields({...fields, [name]: value})
  }

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <p>Sign in with your email and password</p>
      {signInError ? (
        <p className='signin-error'>{signInError}</p>
      ) : null}
      <form method="post" onSubmit={onSubmit} noValidate>
        <FormInput value={fields.email} name='email' id='signin-email' type='email' label='Email' pattern='.+@.+\..+' onChange={onInputChange} required />
        <FormInput value={fields.password} name='password' id='signin-password' type='password' label='Password' minLength={6} onChange={onInputChange} required />
        <div className="actions">
          <Button type='submit'>
            Submit
          </Button>
          <Button className='google' type='button' onClick={onSignInWithGoogle}>
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  )
}