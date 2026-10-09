import type { ComponentProps, ReactNode } from 'react';
export type ChipHierarchy = 'primary' | 'secondary';
export interface ChipProps extends ComponentProps<'button'> {
    /** Primary = filled, Secondary = outlined. */
    hierarchy?: ChipHierarchy;
    /** true = full pill, false = rounded rectangle. */
    rounded?: boolean;
    selected?: boolean;
    /** 16px icon before the label. */
    prefixIcon?: ReactNode;
    /** 16px icon after the label (e.g. a remove "x"). */
    suffixIcon?: ReactNode;
}
/** Selectable pill for filters, multi-select tags and removable tokens. */
export declare function Chip({ hierarchy, rounded, selected, prefixIcon, suffixIcon, className, type, children, ...rest }: ChipProps): import("react").JSX.Element;
