import type { ComponentProps, ReactNode } from 'react';
export type TooltipPointer = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'left' | 'right';
export interface TooltipProps extends Omit<ComponentProps<'div'>, 'title'> {
    /** Which edge the pointer sits on, and where along it. */
    pointer?: TooltipPointer;
    title?: ReactNode;
    children: ReactNode;
}
export declare function Tooltip({ pointer, title, className, children, ...rest }: TooltipProps): import("react").JSX.Element;
