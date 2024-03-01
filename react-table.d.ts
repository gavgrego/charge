import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    // Your additional properties here
    getCellContext: (
      context: CellContext<TData, TValue>
    ) => TableCellProps | void;
  }
}
