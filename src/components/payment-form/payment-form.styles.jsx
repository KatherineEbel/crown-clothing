import styled from "styled-components";
import Button from "../button/button.component";

export const StyledPaymentForm = styled.div`
  align-items: center;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
`

export const Form = styled.form`
  height: 100px;
  min-width: 300px;
`

export const PaymentButton = styled(Button)`
  width: 100%;
  margin-left: auto;
  margin-top: 2rem;
`