import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavLink = ({ 
  to, 
  children, 
  className,
  icon,
  badge,
  ...props 
}) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
          "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
          isActive && "bg-primary-100 text-primary-700 font-medium",
          className
        )
      }
      {...props}
    >
      {icon && (
        <ApperIcon 
          name={icon} 
          size={18} 
          className="text-current"
        />
      )}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </RouterNavLink>
  );
};

export default NavLink;