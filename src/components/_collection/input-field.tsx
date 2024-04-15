import { ColumnInformation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

type InputFieldProps = {
  columnInformation: ColumnInformation;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputField({
  columnInformation,
  className,
  ...props
}: InputFieldProps) {
  const { column_name, typname, typcategory, is_nullable, column_default } =
    columnInformation;

  const getAttrType = (): HTMLInputTypeAttribute => {
    if (typcategory === "N") {
      return "number";
    }
    if (typcategory === "D") {
      return "datetime-local";
    }
    return "text";
  };

  const placeholder = column_default
    ? column_default
    : is_nullable === "YES"
      ? "NULL"
      : "";

  const attr: React.InputHTMLAttributes<HTMLInputElement> = {
    type: getAttrType(),
    placeholder,
    ...props,
  };

  return (
    <label className="grid grid-cols-5">
      <div className="col-span-1">
        <div>{column_name}</div>
        <div>{typname}</div>
      </div>
      <input className={cn("col-span-4", className)} {...attr} />
    </label>
  );
}

export { InputField };
