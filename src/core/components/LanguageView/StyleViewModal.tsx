import { Modal, Button } from "react-bootstrap";

interface StyleViewModalProps {
  show: boolean;
  actualStyle : Record<string, unknown>
  onHide: () => void;
}

export default function StyleViewModal({ show, actualStyle, onHide }: StyleViewModalProps) {
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
