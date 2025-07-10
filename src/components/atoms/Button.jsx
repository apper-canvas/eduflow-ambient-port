import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children,
  isLoading = false,
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 hover:shadow-lg",
    accent: "bg-accent-500 text-white hover:bg-accent-600 hover:shadow-lg",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    success: "bg-success text-white hover:bg-green-600",
    warning: "bg-warning text-white hover:bg-yellow-600",
    error: "bg-error text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "rounded-lg font-medium transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        !disabled && "transform hover:scale-105",
        className
      )}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;