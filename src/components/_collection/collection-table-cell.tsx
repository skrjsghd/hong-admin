import { cn } from "@/lib/utils";
import { Badge } from "../ui";

interface CollectionTableCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: any;
}
const CollectionTableCell: React.FC<CollectionTableCellProps> = ({
  className,
  children,
  value,
  ...props
}) => {
  const typeParser = () => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    if (typeof value === "number") {
      return (
        <Badge variant="secondary" className="mx-auto">
          {value}
        </Badge>
      );
    }
    if (typeof value === "boolean") {
      return (
        <Badge variant="outline" className="mx-auto">
          {value ? "TRUE" : "FALSE"}
        </Badge>
      );
    }
    return value;
  };

  return (
    <td>
      <div className={cn("flex items-center p-2", className)} {...props}>
        {typeParser()}
      </div>
    </td>
  );
};

export { CollectionTableCell };
