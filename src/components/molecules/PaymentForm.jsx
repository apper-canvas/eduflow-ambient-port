import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { paymentService } from "@/services/api/paymentService";

const PaymentForm = ({ course, onSuccess, onError, onProcessingChange, isProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardErrors, setCardErrors] = useState({});
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US"
    }
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        fontFamily: 'Inter, sans-serif',
        '::placeholder': {
          color: '#9CA3AF',
        },
        padding: '12px 16px',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: true,
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardErrors({ card: event.error.message });
    } else {
      setCardErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBillingDetails(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!billingDetails.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!billingDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingDetails.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!billingDetails.address.line1.trim()) {
      errors.address = "Address is required";
    }
    
    if (!billingDetails.address.city.trim()) {
      errors.city = "City is required";
    }
    
    if (!billingDetails.address.state.trim()) {
      errors.state = "State is required";
    }
    
    if (!billingDetails.address.postal_code.trim()) {
      errors.postal_code = "Postal code is required";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setCardErrors(validationErrors);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    onProcessingChange(true);

    try {
      // Create payment intent
      const { clientSecret } = await paymentService.createPaymentIntent({
        amount: course.price * 100, // Convert to cents
        currency: 'usd',
        metadata: {
          courseId: course.Id,
          courseName: course.title,
        }
      });

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Payment successful
      onSuccess({
        paymentId: result.paymentIntent.id,
        amount: course.price,
        paymentMethod: result.paymentIntent.payment_method,
      });

    } catch (error) {
      onError(error);
    } finally {
      onProcessingChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 mb-3">Billing Information</h3>
        
        <FormField
          label="Full Name"
          type="text"
          value={billingDetails.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={cardErrors.name}
          required
          isPayment
          placeholder="John Doe"
        />
        
        <FormField
          label="Email Address"
          type="email"
          value={billingDetails.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={cardErrors.email}
          required
          isPayment
          placeholder="john@example.com"
        />
        
        <FormField
          label="Address"
          type="text"
          value={billingDetails.address.line1}
          onChange={(e) => handleInputChange('address.line1', e.target.value)}
          error={cardErrors.address}
          required
          isPayment
          placeholder="123 Main Street"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="City"
            type="text"
            value={billingDetails.address.city}
            onChange={(e) => handleInputChange('address.city', e.target.value)}
            error={cardErrors.city}
            required
            isPayment
            placeholder="New York"
          />
          
          <FormField
            label="State"
            type="text"
            value={billingDetails.address.state}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            error={cardErrors.state}
            required
            isPayment
            placeholder="NY"
          />
        </div>
        
        <FormField
          label="Postal Code"
          type="text"
          value={billingDetails.address.postal_code}
          onChange={(e) => handleInputChange('address.postal_code', e.target.value)}
          error={cardErrors.postal_code}
          required
          isPayment
          placeholder="10001"
        />
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 mb-3">Payment Information</h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Details <span className="text-red-500">*</span>
          </label>
          <div className={cn(
            "p-3 border rounded-lg bg-white transition-colors",
            cardErrors.card ? "border-red-500" : "border-green-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
          )}>
            <CardElement
              options={cardElementOptions}
              onChange={handleCardChange}
            />
          </div>
          {cardErrors.card && (
            <p className="text-sm text-red-500 mt-1">{cardErrors.card}</p>
          )}
        </div>
      </div>

      {/* Payment Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          type="submit"
          variant="payment"
          size="lg"
          disabled={!stripe || isProcessing}
          isLoading={isProcessing}
          className="w-full flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <ApperIcon name="CreditCard" size={20} />
              Pay ${course.price}
            </>
          )}
        </Button>
      </motion.div>

      {/* Terms */}
      <div className="text-xs text-gray-500 text-center">
        By completing this purchase, you agree to our{" "}
        <a href="#" className="text-primary-600 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary-600 hover:underline">
          Privacy Policy
        </a>
      </div>
    </form>
  );
};

export default PaymentForm;