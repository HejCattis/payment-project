import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBKEY);
const options = {
	mode: 'payment' as 'payment',
	amount: 1099,
	currency: 'usd',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Elements stripe={stripePromise} options={options}>
		<App />
	</Elements>
)
