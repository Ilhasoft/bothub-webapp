export default {
  addStripe: (callback) => {
    if (!process.env.BOTHUB_WEBAPP_PAYMENT_ENABLED || document.getElementById('stripe-script')) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.id = 'stripe-script';
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  },
};
