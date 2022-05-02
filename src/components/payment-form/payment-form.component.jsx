import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {BUTTON_TYPES} from "../button/button.component";
import {Form, PaymentButton, StyledPaymentForm} from "./payment-form.styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCartTotal} from "../../store/cart/cart.selector";
import {selectCurrentUser} from "../../store/user/user.selector";
import {useState} from "react";
import {clearCart} from "../../store/cart/cart.action";


function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch()
  const processPayment = async () => {
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 })
    })
    const data = await response.json();
    const { paymentIntent: { client_secret }} = data
    const card = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    });
    if (paymentResult.error) {
      alert(paymentResult.error)
      card.clear();
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful!')
        dispatch(clearCart())
      }
    }
  }
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    try {
      setProcessing(true);
      await processPayment()
    } catch (e) {
      console.log(e)
    } finally {
      setProcessing(false);
    }
  }

  return (
    <StyledPaymentForm>
      <h2>Credit Card Payment:</h2>
      <Form onSubmit={paymentHandler}>
        <CardElement/>
        <PaymentButton buttonType={BUTTON_TYPES.inverted} disabled={processing}>
          Pay Now
        </PaymentButton>
      </Form>
    </StyledPaymentForm>
  )
}

export default PaymentForm;