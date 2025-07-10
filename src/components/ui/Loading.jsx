import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Loading = ({ 
  type = "spinner", 
  size = "md", 
  className,
  ...props 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (type === "skeleton") {
    return (
      <div className={cn("animate-pulse space-y-4", className)} {...props}>
        <div className="h-4 bg-gray-200 rounded w-3/4 shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 shimmer" />
        <div className="h-4 bg-gray-200 rounded w-5/6 shimmer" />
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-2", className)} {...props}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <motion.div
          className={cn(
            "bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full",
            sizes[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div
        className={cn(
          "border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin",
          sizes[size]
        )}
      />
    </div>
  );
};

export default Loading;