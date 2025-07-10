import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const LessonItem = ({ 
  lesson, 
  courseId,
  isActive = false,
  isCompleted = false,
  className,
  ...props 
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return "Play";
      case "pdf": return "FileText";
      case "text": return "BookOpen";
      case "quiz": return "HelpCircle";
      default: return "Circle";
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-600";
      case "pdf": return "bg-red-100 text-red-600";
      case "text": return "bg-green-100 text-green-600";
      case "quiz": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group",
        className
      )}
      {...props}
    >
      <Link 
        to={lesson.type === "quiz" 
          ? `/courses/${courseId}/quiz/${lesson.Id}`
          : `/courses/${courseId}/lessons/${lesson.Id}`
        }
        className={cn(
          "flex items-center gap-3 p-4 rounded-lg transition-all duration-200",
          "border border-gray-200 hover:border-primary-300 hover:shadow-md",
          isActive && "border-primary-500 bg-primary-50 shadow-md",
          isCompleted && "bg-green-50 border-green-200"
        )}
      >
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <ApperIcon name="Check" size={14} className="text-white" />
            </div>
          ) : (
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              getTypeBadge(lesson.type)
            )}>
              <ApperIcon name={getTypeIcon(lesson.type)} size={14} />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={cn(
              "font-medium text-gray-900 group-hover:text-primary-600 transition-colors",
              isActive && "text-primary-600",
              isCompleted && "text-success"
            )}>
              {lesson.title}
            </h4>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full capitalize",
              getTypeBadge(lesson.type)
            )}>
              {lesson.type}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {lesson.duration && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" size={14} />
                {lesson.duration} min
              </div>
            )}
            {lesson.type === "quiz" && lesson.questions && (
              <div className="flex items-center gap-1">
                <ApperIcon name="HelpCircle" size={14} />
                {lesson.questions.length} questions
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <ApperIcon 
            name="ChevronRight" 
            size={16} 
            className="text-gray-400 group-hover:text-primary-500 transition-colors"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default LessonItem;