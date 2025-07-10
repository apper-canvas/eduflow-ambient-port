import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import ProgressBar from "@/components/atoms/ProgressBar";
import ApperIcon from "@/components/ApperIcon";

const CourseCard = ({ 
  course, 
  showProgress = false,
  progress = 0,
  className,
  ...props 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "success";
      case "intermediate": return "warning";
      case "advanced": return "error";
      default: return "default";
    }
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
      {...props}
    >
      <Link to={`/courses/${course.Id}`}>
        <Card hover className="overflow-hidden h-full">
          <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-500 relative overflow-hidden">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ApperIcon name="Play" size={48} className="text-white/80" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge 
                variant={getDifficultyColor(course.difficulty)}
                className="capitalize"
              >
                {course.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <Avatar
                src={course.instructorAvatar}
                alt={course.instructorName}
                size="sm"
                fallback={course.instructorName?.charAt(0)}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {course.instructorName}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {course.description}
                </p>
              </div>
            </div>
            
            {showProgress && (
              <div className="mb-4">
                <ProgressBar 
                  value={progress} 
                  showLabel 
                  className="mb-2"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ApperIcon name="Clock" size={16} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Users" size={16} />
                  {course.studentsCount || 0}
                </div>
              </div>
              <div className="text-lg font-semibold text-primary-600">
                {formatPrice(course.price)}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CourseCard;