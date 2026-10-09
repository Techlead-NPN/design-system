import type { ComponentProps, ReactNode } from 'react';
/** A horizontal tab bar. Put `Tab`s inside. */
export declare function Tabs({ className, ...rest }: ComponentProps<'div'>): import("react").JSX.Element;
export interface TabProps extends ComponentProps<'button'> {
    selected?: boolean;
    /** Height of the label area: 28px or 32px. */
    size?: 28 | 32;
    /** 16px icon before the label. */
    prefixIcon?: ReactNode;
    /** 16px icon after the label (e.g. a chevron on a "+4 More" tab). */
    suffixIcon?: ReactNode;
}
export declare function Tab({ selected, size, prefixIcon, suffixIcon, className, type, children, ...rest }: TabProps): import("react").JSX.Element;
