import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import PaymentForm from "@/components/molecules/PaymentForm";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentModal = ({ course, onSuccess, onError, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setIsProcessing(false);
    onSuccess(paymentData);
  };

  const handlePaymentError = (error) => {
    setIsProcessing(false);
    onError(error);
  };

  const handleProcessingChange = (processing) => {
    setIsProcessing(processing);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="CreditCard" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-xl text-gray-900">
                  Complete Purchase
                </h2>
                <p className="text-sm text-gray-500">Secure payment processing</p>
              </div>
            </div>
            
            {!isProcessing && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-400" />
              </button>
            )}
          </div>

          {/* Course Summary */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="BookOpen" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {course.category} • {course.difficulty}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Course Price</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <Elements stripe={stripePromise}>
              <PaymentForm
                course={course}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onProcessingChange={handleProcessingChange}
                isProcessing={isProcessing}
              />
            </Elements>
          </div>

          {/* Security Notice */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Shield" size={16} className="text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-600">
                    Your payment information is encrypted and secure. We use Stripe for processing payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;