import { ColumnInformation } from "@/lib/types";
import { Input, Label } from "../ui";
import { BooleanSwitch } from "./boolean-switch";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  columnInformation: ColumnInformation;
  onValueChange: (value: any) => void;
}

function InputField({
  columnInformation,
  className,
  onValueChange,
  ...props
}: InputFieldProps) {
  const {
    column_name,
    typname,
    typcategory,
    is_nullable,
    column_default,
    identity_generation,
  } = columnInformation;

  const placeholder =
    column_default ||
    identity_generation ||
    (is_nullable === "YES" ? "NULL" : "");

  const attr: React.InputHTMLAttributes<HTMLInputElement> = {
    id: column_name,
    placeholder,
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
            {...attr}
            checked={Boolean(attr.value)}
            onChange={(e) => onValueChange(e.target.checked)}
          />
        )}
        {typcategory === "N" && (
          <Input
            {...attr}
            type="number"
            onChange={(e) => onValueChange(e.target.value)}
          />
        )}
        {typcategory === "D" && (
          <Input
            {...attr}
            type="datetime-local"
            value={
              attr.value
                ? new Date(attr.value as string).toISOString().split(".")[0]
                : ""
            }
            onChange={(e) => onValueChange(e.target.value)}
            className="block"
          />
        )}
        {typcategory === "S" && (
          <Input
            {...attr}
            type="text"
            onChange={(e) => onValueChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export { InputField };
