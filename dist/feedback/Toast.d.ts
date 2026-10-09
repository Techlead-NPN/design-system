import type { ComponentProps, ReactNode } from 'react';
import type { Status } from './status';
export interface ToastProps extends Omit<ComponentProps<'div'>, 'title'> {
    status: Status;
    title: ReactNode;
    description?: ReactNode;
    /** Optional action, e.g. a small Ghost Button. */
    action?: ReactNode;
    onClose?: () => void;
}
/** Temporary message that floats over the page and reports the result of an action. */
export declare function Toast({ status, title, description, action, onClose, className, ...rest }: ToastProps): import("react").JSX.Element;
export interface AlertProps extends ComponentProps<'div'> {
    status: Status;
    /** `full` = one row; `short` = the action drops below the text, for narrow spaces. */
    layout?: 'full' | 'short';
    /** Optional action, e.g. a small Primary Button. */
    action?: ReactNode;
}
/** Inline banner that stays in the page until its condition changes. */
export declare function Alert({ status, layout, action, className, children, ...rest }: AlertProps): import("react").JSX.Element;
export interface CalloutProps extends Omit<ComponentProps<'div'>, 'title'> {
    status: Status;
    title: ReactNode;
    /** Optional action shown bottom right, e.g. a small Ghost Button. */
    action?: ReactNode;
    onClose?: () => void;
}
/** Boxed note with a title and explanation, for guidance that belongs next to the content. */
export declare function Callout({ status, title, action, onClose, className, children, ...rest }: CalloutProps): import("react").JSX.Element;
