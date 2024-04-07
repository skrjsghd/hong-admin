import { ColumnInformation } from "@/lib/types";

type InputFieldProps = {
  category: ColumnInformation["typcategory"];
  nullable: ColumnInformation["is_nullable"];
} & React.InputHTMLAttributes<HTMLInputElement>;
function InputField({ category, nullable, ...props }: InputFieldProps) {
  const attr: React.InputHTMLAttributes<HTMLInputElement> = {
    type: category === "N" ? "number" : "text",
    placeholder: nullable === "YES" ? "NULL" : "NOT NULL",
    ...props,
  };
  return <input {...attr} />;
}

export { InputField };
