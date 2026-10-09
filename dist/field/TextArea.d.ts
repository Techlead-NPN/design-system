import type { ComponentProps, ReactNode } from 'react';
export interface TextAreaProps extends ComponentProps<'textarea'> {
    /** Label shown above the field. */
    label?: ReactNode;
    /** Hint shown below the field. In the error state it turns red. */
    hint?: ReactNode;
    /** Error state: red border and red hint. */
    error?: boolean;
    /** Show a "used/max" character counter. Needs `maxLength`. */
    counter?: boolean;
}
export declare function TextArea({ label, hint, error, counter, id, className, onChange, ...rest }: TextAreaProps): import("react").JSX.Element;
