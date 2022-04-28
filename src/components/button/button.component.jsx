import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

const BUTTON_TYPES = {
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


export default function Button({children, buttonType, ...otherProps}) {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}