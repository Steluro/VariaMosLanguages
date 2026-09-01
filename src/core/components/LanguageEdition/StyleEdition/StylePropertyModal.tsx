import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { cssProperties } from "./cssProperties";
import CssRow from "./cssRow";
import { Record } from "react-bootstrap-icons";

interface StylePropertyModalProps {
  show: boolean;
  actualStyle : Record<string, unknown>
  onHide: () => void;
  onSelectProperty: (newStyle: Record<string, unknown>) => void;
}

export default function StylePropertyModal({ show, actualStyle,onHide, onSelectProperty }: StylePropertyModalProps) {
  const [newStyle, setNewStyle] = useState<Record<string, unknown>>(
    JSON.parse(JSON.stringify(actualStyle))
  );

  const handleHide = () => {
    onHide();
  };

  const handlePropertyChange = (category: string, prop: string, newValue: string | number) => {
    setNewStyle((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as Record<string, unknown>),
        [prop]: newValue,
      },
    }));
  };

  return (
    <Modal show={show} onHide={handleHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select CSS Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {actualStyle && (
          <div className="mt-3">
            {Object.entries(newStyle).map(([category, properties]) => (
              <div  className="mb-3">
                <div className="text-primary fw-bold" style={{ fontSize: '1.1rem' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                {typeof properties === 'object' && properties !== null && (
                  <div>
                    {Object.entries(properties).map(([prop, value]) => (
                      <CssRow
                        key={prop}
                        category={category as "body" | "title" | "properties" | "style" | "markerStart" | "markerEnd"}
                        propertyName={prop}
                        value={value as string | number}
                        onChange={(newValue) => handlePropertyChange(category, prop, newValue)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          onSelectProperty(newStyle);
        }}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
