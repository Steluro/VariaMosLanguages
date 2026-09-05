import { Modal, Button } from "react-bootstrap";

/**
 * Props for the StyleViewModal component
 * @interface StyleViewModalProps
 * @property {boolean} show - Whether the modal is visible
 * @property {Record<string, unknown>} actualStyle - The style object to display
 * @property {() => void} onHide - Callback when modal is closed
 */
interface StyleViewModalProps {
  show: boolean;
  actualStyle : Record<string, unknown>
  onHide: () => void;
}

/**
 * Modal component for viewing style properties
 * Displays all style categories and their properties in a read-only format
 * @param {StyleViewModalProps} props - The component props
 * @returns {JSX.Element} The rendered style view modal
 */
export default function StyleViewModal({ show, actualStyle, onHide }: StyleViewModalProps) {
  /**
   * Handle modal close
   */
  const handleHide = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Style Properties</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actualStyle && (
          <div className="mt-3">
            <h5>Current Style:</h5>
            {Object.entries(actualStyle).map(([category, properties]) => (
              <div key={category} className="mb-3">
                <h6>{category.charAt(0).toUpperCase() + category.slice(1)}</h6>
                {typeof properties === 'object' && properties !== null && (
                  <ul>
                    {Object.entries(properties).map(([prop, value]) => (
                      <li key={prop}>
                        <strong>{prop}:</strong> {String(value)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
