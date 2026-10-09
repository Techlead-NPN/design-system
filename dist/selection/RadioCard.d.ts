import type { ComponentProps, ReactNode } from 'react';
export interface RadioCardProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
    /** 20px leading icon. */
    icon?: ReactNode;
    /** The card title. */
    label: ReactNode;
    description?: ReactNode;
    /** Optional status tag shown next to the name. */
    tag?: ReactNode;
}
export declare function RadioCard({ icon, label, description, tag, className, ...rest }: RadioCardProps): import("react").JSX.Element;
