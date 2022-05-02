import { loadStripe } from "@stripe/stripe-js";

const { REACT_APP_STRIPE_PUBLISHABLE_KEY } = process.env;

export const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLISHABLE_KEY);