import { Button, Modal } from 'react-bootstrap';

/**
 * Props for the ConfirmationModal component
 * @interface ConfirmationModalProps
 * @property {boolean} show - Whether the modal is visible
 * @property {() => void} onCancel - Callback when cancel is clicked
 * @property {() => void} onConfirm - Callback when confirm is clicked
 * @property {string} message - The confirmation message to display
 * @property {string} confirmLabel - The label for the confirm button
 * @property {string} confirmButtonVariant - The variant for the confirm button
 * @property {string} cancelLabel - The label for the cancel button
 * @property {string} cancelButtonVariant - The variant for the cancel button
 */
export interface ConfirmationModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
  confirmLabel?: string;
  confirmButtonVariant?: string;
  cancelLabel?: string;
  cancelButtonVariant?: string;
}

/**
 * Default props for the ConfirmationModal component
 */
export const confirmationModalDefaultProps: ConfirmationModalProps =
  Object.freeze({
    message: '',
    show: false,
    onCancel: () => {},
    onConfirm: () => {},
  });

/**
 * Modal component for confirming user actions
 * Displays a message with confirm and cancel buttons
 * @param {ConfirmationModalProps} props - The component props
 * @returns {JSX.Element} The rendered confirmation modal
 */
export default function ConfirmationModal({
  show,
  onCancel,
  onConfirm,
  message,
  confirmLabel = 'Accept',
  confirmButtonVariant = 'primary',
  cancelButtonVariant = 'secondary',
  cancelLabel = 'Cancel',
}: ConfirmationModalProps) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Body style={{ whiteSpace: 'pre-line' }}>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelButtonVariant} onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={confirmButtonVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
