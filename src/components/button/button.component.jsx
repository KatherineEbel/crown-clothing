import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";
import {SpinnerContainer} from "../spinner/spinner.styles";

export const BUTTON_TYPES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES.base) =>
  ({
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[buttonType])


export default function Button({children, buttonType, disabled, ...otherProps}) {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>
      { disabled ? (<SpinnerContainer width={'30px'} height={'30px'}/>) : children}
    </CustomButton>
  )
}