import type { ComponentProps, ReactNode } from 'react';
export type ButtonHierarchy = 'primary' | 'outline' | 'ghost';
export type ButtonAccent = 'default' | 'danger' | 'blue';
export type ButtonSize = 'sm' | 'md';
export interface ButtonProps extends ComponentProps<'button'> {
    /** Primary = the one main action; Outline = secondary; Ghost = lowest emphasis. */
    hierarchy?: ButtonHierarchy;
    accent?: ButtonAccent;
    /** sm = 24px high, md = 32px high. */
    size?: ButtonSize;
    /** 14px icon before the label. */
    prefixIcon?: ReactNode;
    /** 14px icon after the label. */
    suffixIcon?: ReactNode;
    /** Keyboard shortcut hint shown after the label, e.g. "⌘O". */
    shortcut?: ReactNode;
}
export declare function Button({ hierarchy, accent, size, prefixIcon, suffixIcon, shortcut, className, type, children, ...rest }: ButtonProps): import("react").JSX.Element;
