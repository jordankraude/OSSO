'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Q3VOtGBc05bKNreyq0OPY6OxBxmP41urK1enKtbfygMABhXtscvcaQxoCGmZ1rJbxOdbQvNS0M2kgO7kmbROtVm00mcNDZFgI'); 

const DonationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [amount, setAmount] = useState<string>(''); // State for the donation amount

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
  
    // Validate donation amount
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid donation amount.');
      setProcessing(false);
      return;
    }
  
    if (!stripe || !elements) {
      setError('Stripe.js has not yet loaded. Please try again later.');
      setProcessing(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (cardElement) {
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (paymentError) {
        setError(paymentError.message || 'An error occurred while processing the payment.');
      } else {
        // Send the paymentMethod.id and amount to your server to process the payment
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: parsedAmount * 100 }), // Amount in cents
        });
  
        if (response.ok) {
          console.log('Payment successful!');
          // Redirect to the success page after successful payment
          window.location.href = '/success';
        } else {
          const errorResponse = await response.json();
          setError(errorResponse.error || 'An unexpected error occurred.');
        }
      }
    }
    setProcessing(false);
  };

  return (
    <div className={`fixed -inset-4 flex items-center justify-center w-full bg-black bg-opacity-50 ${isOpen ? 'block ' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4">Donate</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter donation amount"
            className="border p-2 mb-4 w-full rounded"
            required
            min="0.01" // Minimum donation amount
            step="0.01" // Allows decimal input
          />
          <CardElement className="border p-2 mb-4" />
          <button
            type="submit"
            disabled={processing || !stripe}
            className={`w-full py-2 rounded-lg ${processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          >
            {processing ? 'Processing...' : 'Donate'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500">Close</button>
      </div>
    </div>
  );
};

const DonationModalWithStripe: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Elements stripe={stripePromise}>
    <DonationModal isOpen={isOpen} onClose={onClose} />
  </Elements>
);

export default DonationModalWithStripe;
