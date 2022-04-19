import SignUpForm from "../../components/signup-form/signup-form.component";
import SignInForm from "../../components/signin-form/signin-form.component";
import './auth.style.scss'
export default function Auth() {
  return (
    <div className='Auth'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}