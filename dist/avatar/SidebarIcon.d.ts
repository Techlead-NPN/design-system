import type { ComponentProps, ReactNode } from 'react';
export type SidebarIconColor = 'ocean' | 'sky' | 'teal' | 'sun' | 'fuchsia' | 'blossom' | 'emerald' | 'blush' | 'peach' | 'stone';
export interface SidebarIconProps extends ComponentProps<'span'> {
    /** Decorative only — pick for variety, never to signal status. */
    color?: SidebarIconColor;
    /** 16 for compact or nested rows, 24 for prominent entries. The icon is 14px in both. */
    size?: 16 | 24;
    /** A 14px icon. */
    children: ReactNode;
}
/** Small tinted chip holding one icon, used for sidebar navigation items. */
export declare function SidebarIcon({ color, size, className, children, ...rest }: SidebarIconProps): import("react").JSX.Element;
