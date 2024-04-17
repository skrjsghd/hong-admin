import { ColumnInformation } from "@/lib/types";
import { Input, Label } from "../ui";
import { BooleanSwitch } from "./boolean-switch";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  columnInformation: ColumnInformation;
  onValueChange: (value: any) => void;
}

function InputField({
  value,
  columnInformation,
  className,
  onValueChange,
  ...props
}: InputFieldProps) {
  const { column_name, typname, typcategory, is_nullable, column_default } =
    columnInformation;

  const placeholder = column_default
    ? column_default
    : is_nullable === "YES"
      ? "NULL"
      : "";

  const attr: React.InputHTMLAttributes<HTMLInputElement> = {
    id: column_name,
    placeholder,
    value,
    ...props,
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <Label
        htmlFor={column_name}
        title={column_name}
        description={typname}
        className="col-span-1"
      />
      <div className="col-span-4">
        {typcategory === "B" && (
          <BooleanSwitch
            checked={Boolean(value)}
            onChange={(e) => onValueChange(e.target.checked)}
            {...attr}
          />
        )}
        {typcategory === "N" && (
          <Input
            type="number"
            onChange={(e) => onValueChange(e.target.value)}
            {...attr}
          />
        )}
        {typcategory === "D" && (
          <Input
            {...attr}
            type="datetime-local"
            onChange={(e) => onValueChange(e.target.value)}
            className="block"
          />
        )}
        {typcategory === "S" && (
          <Input
            type="text"
            onChange={(e) => onValueChange(e.target.value)}
            {...attr}
          />
        )}
      </div>
    </div>
  );
}

export { InputField };
