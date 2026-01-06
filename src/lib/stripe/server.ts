import Stripe from 'stripe';

// Initialiser Stripe avec votre clé secrète
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
