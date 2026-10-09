import type { ComponentProps, ReactNode } from 'react';
export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
    /** Label text. Omit for a bare checkbox and pass `aria-label` instead. */
    children?: ReactNode;
    /** Which side of the box the label sits on. */
    labelSide?: 'left' | 'right';
    /** "Some but not all" — shows a dash instead of a check. */
    indeterminate?: boolean;
    /** Error state: red border, red fill when selected. */
    error?: boolean;
    /** Box size in px. 16 by default; 14 inside table and menu rows. */
    size?: 14 | 16;
}
export declare function Checkbox({ children, labelSide, indeterminate, error, size, className, ref: outerRef, ...rest }: CheckboxProps): import("react").JSX.Element;
