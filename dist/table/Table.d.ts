import type { ComponentProps, ReactNode } from 'react';
export declare function Table({ className, ...rest }: ComponentProps<'table'>): import("react").JSX.Element;
export interface TableRowProps extends ComponentProps<'tr'> {
    /** Selected rows are tinted indigo. */
    selected?: boolean;
}
/** A body row. Hover and selection tint every cell in the row. */
export declare function TableRow({ selected, className, ...rest }: TableRowProps): import("react").JSX.Element;
export interface TableHeaderCellProps extends ComponentProps<'th'> {
    /** 14px icon before the label. */
    icon?: ReactNode;
    /** Shows the sort button; called when it is pressed. */
    onSort?: () => void;
    /** The column's menu is open, or it is the active sort column. */
    active?: boolean;
}
export declare function TableHeaderCell({ icon, onSort, active, className, children, ...rest }: TableHeaderCellProps): import("react").JSX.Element;
export interface TableCellProps extends ComponentProps<'td'> {
    /** Read-only values use the secondary text color. */
    readOnly?: boolean;
}
export declare function TableCell({ readOnly, className, ...rest }: TableCellProps): import("react").JSX.Element;
/** The narrow leading cell that holds the row-selection checkbox (use `<Checkbox size={14} />`). */
export declare function TableSelectCell({ header, className, children, ...rest }: ComponentProps<'td'> & {
    header?: boolean;
}): import("react").JSX.Element;
