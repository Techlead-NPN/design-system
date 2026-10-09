import type { ComponentProps, ReactNode } from 'react';
/** The floating panel that holds menu rows. */
export declare function Menu({ className, ...rest }: ComponentProps<'div'>): import("react").JSX.Element;
/** Small caption that titles a group of rows inside a menu. */
export declare function MenuGroupLabel({ className, ...rest }: ComponentProps<'div'>): import("react").JSX.Element;
export interface MenuItemProps extends ComponentProps<'button'> {
    /** 16px leading icon, or a Checkbox for multi-select rows. */
    leading?: ReactNode;
    /** Second line under the title. */
    supportingText?: ReactNode;
    /** Single-select: indigo title and a trailing check. */
    selected?: boolean;
    /** Shows a trailing chevron: the row opens a sub-menu or another view. */
    hasSubmenu?: boolean;
    /** Trailing content such as a keyboard shortcut hint. */
    trailing?: ReactNode;
    /** Keyboard highlight. In menus the current row uses the hover fill, not a focus ring. */
    active?: boolean;
}
export declare function MenuItem({ leading, supportingText, selected, hasSubmenu, trailing, active, className, type, children, ...rest }: MenuItemProps): import("react").JSX.Element;
