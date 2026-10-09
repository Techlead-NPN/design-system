import type { ComponentProps, ReactNode } from 'react';
export interface TextInputProps extends Omit<ComponentProps<'input'>, 'prefix'> {
    /** Label shown above the field. */
    label?: ReactNode;
    /** Hint shown below the field. In the error state it turns red — use it for the error message. */
    hint?: ReactNode;
    /** Error state: red border and red hint. */
    error?: boolean;
    /** 16px icon or short text before the value. */
    prefix?: ReactNode;
    /** 16px icon or short text after the value. */
    suffix?: ReactNode;
}
export declare const fieldLabel = "text-support-label text-tertiary";
export declare const fieldHint = "text-support-caption text-tertiary";
export declare const fieldHintError = "text-support-caption text-danger";
export declare const fieldBox: string;
export declare const fieldBoxError = "inset-ring-danger focus-within:inset-ring-danger";
export declare const fieldText: string;
export declare function TextInput({ label, hint, error, prefix, suffix, id, className, ...rest }: TextInputProps): import("react").JSX.Element;
