import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterPanel = ({ 
  filters,
  onFiltersChange,
  onClearFilters,
  className,
  ...props 
}) => {
  const categories = [
    "All Categories",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
    "Health & Fitness",
    "Language",
    "Teaching"
  ];

  const difficulties = [
    "All Levels",
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  const prices = [
    "All Prices",
    "Free",
    "Paid"
  ];

  const durations = [
    "All Durations",
    "0-2 hours",
    "2-6 hours",
    "6-12 hours",
    "12+ hours"
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value && value !== "All Categories" && value !== "All Levels" && 
      value !== "All Prices" && value !== "All Durations"
    ).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-xl shadow-soft p-6 space-y-6",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg text-gray-900">
          Filters
        </h3>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-primary-600 hover:text-primary-700"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Select
            value={filters.category || "All Categories"}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <Select
            value={filters.difficulty || "All Levels"}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <Select
            value={filters.price || "All Prices"}
            onChange={(e) => handleFilterChange("price", e.target.value)}
          >
            {prices.map(price => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <Select
            value={filters.duration || "All Durations"}
            onChange={(e) => handleFilterChange("duration", e.target.value)}
          >
            {durations.map(duration => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <ApperIcon name="Filter" size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Active Filters ({getActiveFiltersCount()})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || value.startsWith("All")) return null;
              return (
                <Badge
                  key={key}
                  variant="primary"
                  className="cursor-pointer hover:bg-primary-200"
                  onClick={() => handleFilterChange(key, "")}
                >
                  {value}
                  <ApperIcon name="X" size={12} className="ml-1" />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FilterPanel;