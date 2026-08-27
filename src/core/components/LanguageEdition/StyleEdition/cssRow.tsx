import { Form } from 'react-bootstrap';
import { cssProperties } from './cssProperties';

interface cssRowProps {
  category: "body" | "title" | "properties" | "style" | "markerStart" | "markerEnd";
  propertyName: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

export default function CssRow({ category, propertyName, value, onChange }: cssRowProps) {

  function getCssGroup(category){
    switch (category) {
      case "body":
        return "body";
      case "title":
        return "text";
      case "properties":
        return "text";
      case "style":
        return "style";
      case "markerStart":
        return "marker";
      case "markerEnd":
        return "marker";
      default:
        return "Unknown";
    }
  }

  const propertyConfig = cssProperties[getCssGroup(category)]?.[propertyName as keyof typeof cssProperties[keyof typeof cssProperties]];
  
  if (!propertyConfig) {
    return null;
  }

  const { inputType, options } = propertyConfig as {
    inputType: string | string[];
    options?: string[];
  };

  const renderInput = () => {
    // Case: two input types (number and select)
    if (Array.isArray(inputType)) {
      const [type1, type2] = inputType;
      const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const unitValue = typeof value === 'string' ? value.replace(/[0-9.]/g, '') : '';

      return (
        <div className="d-flex gap-2">
          <Form.Control
            type={type1}
            value={numericValue}
            onChange={(e) => onChange(`${e.target.value}${unitValue}`)}
            style={{ width: '80px' }}
          />
          <Form.Select
            value={unitValue || (options?.[0] || '')}
            onChange={(e) => onChange(`${numericValue}${e.target.value}`)}
            style={{ width: '80px' }}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </div>
      );
    }

    // Case: single input type
    switch (inputType) {
      case 'color':
        return (
          <Form.Control
            type="color"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: '60px', height: '38px' }}
          />
        );
      case 'select':
        return (
          <Form.Select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        );
      case 'number':
        return (
          <Form.Control
            type="number"
            value={value as number}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            min="0"
          />
        );
      default:
        return (
          <Form.Control
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Form.Group className="mb-2 d-flex align-items-center">
      <Form.Label className="mb-0 me-2 fw-bold" style={{ minWidth: '180px' }}>
        {propertyName}:
      </Form.Label>
      {renderInput()}
    </Form.Group>
  );
}
