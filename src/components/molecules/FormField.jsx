import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required = false,
  className,
  children,
  ...props 
}) => {
  const id = props.id || props.name;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return <Textarea id={id} error={!!error} {...props} />;
      case "select":
        return (
          <Select id={id} error={!!error} {...props}>
            {children}
          </Select>
        );
      default:
        return <Input id={id} type={type} error={!!error} {...props} />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;