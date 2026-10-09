import type { ComponentProps, ReactNode } from 'react';
export type IconButtonStyle = 'primary' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md';
export interface IconButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
    variant?: IconButtonStyle;
    /** sm = 24px with a 14px icon, md = 32px with a 20px icon. */
    size?: IconButtonSize;
    /** Required: an icon-only button has no visible label. */
    'aria-label': string;
    /** The icon, sized to match `size`. */
    children: ReactNode;
}
export declare function IconButton({ variant, size, className, type, children, ...rest }: IconButtonProps): import("react").JSX.Element;
