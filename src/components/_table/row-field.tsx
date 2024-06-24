import { ColumnInformation } from "@/lib/types";
import { Fragment } from "react";
import { Input, Switch, Textarea } from "../ui";

type RowFieldProps = {
  columnInformation: ColumnInformation;
  value: any;
  onChangeValue: (value: any) => void;
};
function RowField({ columnInformation, value, onChangeValue }: RowFieldProps) {
  const {
    column_default,
    constraint_type,
    typname,
    typcategory,
    column_name,
    is_nullable,
  } = columnInformation;
  const required = is_nullable === "NO" && column_default === null;
  const inputAttr: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  > = {
    name: column_name,
    placeholder: column_default || constraint_type || "NULL",
    value: value,
    onChange: (e) => {
      const v = e.target.value;
      onChangeValue(v);
    },
  };
  const parseDate = (date: Date | string | null) => {
    if (!date) return "";
    if (typeof date === "string") {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  return (
    <Fragment key={column_name}>
      <div className="text-sm">
        <div className="font-medium">
          {required && "*"}
          {column_name}
        </div>
        <div className="text-muted-foreground">{typname}</div>
      </div>

      {typcategory === "S" && <Textarea {...inputAttr} />}
      {typcategory === "N" && <Input type="number" {...inputAttr} />}
      {typcategory === "D" && (
        <Input
          type="datetime-local"
          className="w-fit"
          {...inputAttr}
          value={parseDate(value)}
        />
      )}
      {typcategory === "B" && (
        <Switch
          {...inputAttr}
          checked={value}
          onChange={(e) => {
            onChangeValue(e.target.checked);
          }}
        />
      )}
    </Fragment>
  );
}

export { RowField };
