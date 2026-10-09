import type { ReactNode } from 'react';
export interface OverlayProps {
    /** Called when the scrim is clicked or Escape is pressed. */
    onClose?: () => void;
    /** `center` for dialogs, `bottom` for a bottom sheet. */
    align?: 'center' | 'bottom';
    children: ReactNode;
}
/** The dimmed backdrop behind a dialog or sheet. */
export declare function Overlay({ onClose, align, children }: OverlayProps): import("react").JSX.Element;
export interface ConfirmationDialogProps {
    title: ReactNode;
    description?: ReactNode;
    /** Optional extra content between the text and the buttons. */
    children?: ReactNode;
    /** Destructive = the confirm button is red. */
    destructive?: boolean;
    confirmLabel: ReactNode;
    cancelLabel: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}
/** Small dialog that asks the user to confirm or cancel one action. */
export declare function ConfirmationDialog({ title, description, children, destructive, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmationDialogProps): import("react").JSX.Element;
export interface ContentDialogProps {
    /** sm = 400px, md = 600px, lg = 780px wide. */
    size?: 'sm' | 'md' | 'lg';
    title: ReactNode;
    onClose?: () => void;
    children: ReactNode;
    /** Footer buttons, in reading order (secondary first, primary last). */
    actions?: ReactNode;
}
/** Dialog with a title bar, free content, and a footer of actions. */
export declare function ContentDialog({ size, title, onClose, children, actions }: ContentDialogProps): import("react").JSX.Element;
export interface BottomSheetProps {
    title: ReactNode;
    /** Second line under the title, for a confirmation sheet. */
    detail?: ReactNode;
    children?: ReactNode;
    /** Footer buttons; they share the width equally. */
    actions?: ReactNode;
}
/** Mobile panel that slides up from the bottom edge. Use inside `<Overlay align="bottom">`. */
export declare function BottomSheet({ title, detail, children, actions }: BottomSheetProps): import("react").JSX.Element;
