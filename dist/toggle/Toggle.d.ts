import type { ComponentProps, ReactNode } from 'react';
export interface ToggleProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
    /** Required when the toggle has no visible label next to it. */
    'aria-label'?: string;
}
/** On/off switch. Takes effect immediately — use Checkbox when a form is submitted later. */
export declare function Toggle({ className, ...rest }: ToggleProps): import("react").JSX.Element;
export interface ToggleCardProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
    /** 20px leading icon. */
    icon?: ReactNode;
    /** The card title. */
    label: ReactNode;
    description?: ReactNode;
}
/** A settings row with a switch. The whole card is the click target and takes the focus ring. */
export declare function ToggleCard({ icon, label, description, className, ...rest }: ToggleCardProps): import("react").JSX.Element;
