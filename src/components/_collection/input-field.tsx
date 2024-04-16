import { ColumnInformation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import { Input, Label } from "../ui";

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
    id: column_name,
    type: getAttrType(),
    placeholder,
    className: cn("col-span-4", className),
    ...props,
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      <Label
        htmlFor={column_name}
        title={column_name}
        description={typname}
        className="col-span-1"
      />
      <Input {...attr} />
    </div>
  );
}

export { InputField };
