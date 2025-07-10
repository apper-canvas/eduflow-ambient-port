class PaymentService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "https://api.example.com";
  }

  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createPaymentIntent(paymentData) {
    await this.delay();
    
    // In a real application, this would make a secure API call to your backend
    // which would then create the payment intent with Stripe
    
    // Mock response - in production, this comes from your backend
    const mockClientSecret = `pi_${Math.random().toString(36).substr(2, 24)}_secret_${Math.random().toString(36).substr(2, 24)}`;
    
    return {
      clientSecret: mockClientSecret,
      paymentIntentId: `pi_${Math.random().toString(36).substr(2, 24)}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: 'requires_payment_method'
    };
  }

  async confirmPayment(paymentIntentId, paymentData) {
    await this.delay();
    
    // Mock payment confirmation
    // In production, this would verify the payment with Stripe
    
    return {
      success: true,
      paymentIntent: {
        id: paymentIntentId,
        status: 'succeeded',
        amount: paymentData.amount,
        currency: paymentData.currency,
        payment_method: {
          id: `pm_${Math.random().toString(36).substr(2, 24)}`,
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          }
        },
        created: Math.floor(Date.now() / 1000)
      }
    };
  }

  async processRefund(paymentIntentId, amount) {
    await this.delay();
    
    // Mock refund processing
    return {
      success: true,
      refund: {
        id: `re_${Math.random().toString(36).substr(2, 24)}`,
        amount: amount,
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000)
      }
    };
  }

  async getPaymentHistory(userId) {
    await this.delay();
    
    // Mock payment history
    return [
      {
        Id: 1,
        paymentIntentId: "pi_1234567890",
        amount: 99.99,
        currency: "usd",
        status: "succeeded",
        courseId: 1,
        courseName: "Complete React Development Course",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: {
          type: "card",
          card: {
            brand: "visa",
            last4: "4242"
          }
        }
      },
      {
        Id: 2,
        paymentIntentId: "pi_0987654321",
        amount: 149.99,
        currency: "usd",
        status: "succeeded",
        courseId: 2,
        courseName: "Advanced JavaScript Patterns",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: {
          type: "card",
          card: {
            brand: "mastercard",
            last4: "8888"
          }
        }
      }
    ];
  }

  async validatePayment(paymentIntentId) {
    await this.delay();
    
    // Mock payment validation
    return {
      valid: true,
      paymentIntent: {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 9999, // $99.99 in cents
        currency: 'usd'
      }
    };
  }
}

export const paymentService = new PaymentService();