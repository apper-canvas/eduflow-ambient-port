import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const QuizOption = ({ 
  option, 
  isSelected = false,
  isCorrect = false,
  isIncorrect = false,
  showResult = false,
  onClick,
  disabled = false,
  className,
  ...props 
}) => {
  const getStateClasses = () => {
    if (showResult) {
      if (isCorrect) {
        return "border-success bg-green-50 text-green-800";
      }
      if (isIncorrect) {
        return "border-error bg-red-50 text-red-800";
      }
      return "border-gray-200 bg-gray-50 text-gray-500";
    }
    
    if (isSelected) {
      return "border-primary-500 bg-primary-50 text-primary-700";
    }
    
    return "border-gray-200 hover:border-primary-300 hover:bg-primary-50";
  };

  const getIcon = () => {
    if (showResult) {
      if (isCorrect) {
        return <ApperIcon name="Check" size={16} className="text-success" />;
      }
      if (isIncorrect) {
        return <ApperIcon name="X" size={16} className="text-error" />;
      }
    }
    
    if (isSelected) {
      return <ApperIcon name="CheckCircle" size={16} className="text-primary-600" />;
    }
    
    return <ApperIcon name="Circle" size={16} className="text-gray-400" />;
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.01 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-lg border-2 transition-all duration-200",
        "flex items-center gap-3 text-left",
        "disabled:cursor-not-allowed",
        !disabled && "cursor-pointer",
        getStateClasses(),
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="font-medium">{option.text}</p>
        {option.explanation && showResult && (
          <p className="text-sm text-gray-600 mt-1">{option.explanation}</p>
        )}
      </div>
    </motion.button>
  );
};

export default QuizOption;