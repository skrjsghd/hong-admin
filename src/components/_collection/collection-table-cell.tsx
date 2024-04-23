import { cn } from "@/lib/utils";

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
  const renderValue = () => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return JSON.stringify(value);
  };

  return (
    <td>
      <div className={cn("flex items-center p-2", className)} {...props}>
        {renderValue()}
      </div>
    </td>
  );
};

export { CollectionTableCell };
