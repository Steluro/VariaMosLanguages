import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { LanguagesFilter } from "./LanguagesContainer";

interface FilterPannelProps {
  languageFilter: LanguagesFilter;
  setLanguageFilter: (filter: LanguagesFilter) => void;
  variant: "myLanguages" | "active" | "all";
}

const STATUS_OPTIONS = ["draft", "pending", "published", "deleted"];
const TYPE_OPTIONS = ["scope", "domain", "application"];

export function FilterPannel({
  languageFilter,
  setLanguageFilter,
  variant,
}: FilterPannelProps) {
  const handleNameChange = (value: string) => {
    setLanguageFilter({ ...languageFilter, name: value || undefined });
  };

  const handleOwnerNameChange = (value: string) => {
    setLanguageFilter({ ...languageFilter, ownerName: value || undefined });
  };

  const handleStatusToggle = (status: string) => {
    const currentStatuses = languageFilter.status
      ? Array.isArray(languageFilter.status)
        ? languageFilter.status
        : [languageFilter.status]
      : [];
    
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];
    
    setLanguageFilter({
      ...languageFilter,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = languageFilter.type
      ? Array.isArray(languageFilter.type)
        ? languageFilter.type
        : [languageFilter.type]
      : [];
    
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    
    setLanguageFilter({
      ...languageFilter,
      type: newTypes.length > 0 ? newTypes : undefined,
    });
  };

  const handleReset = () => {
    const baseFilter = new LanguagesFilter();
    switch (variant) {
      case "myLanguages":
        baseFilter.ownerId = languageFilter.ownerId;
        baseFilter.status = ["draft", "pending"];
        break;
      case "active":
        baseFilter.status = "published";
        break;
      case "all":
        break;
    }
    setLanguageFilter(baseFilter);
  };

  const currentStatuses = languageFilter.status
    ? Array.isArray(languageFilter.status)
      ? languageFilter.status
      : [languageFilter.status]
    : [];

  const currentTypes = languageFilter.type
    ? Array.isArray(languageFilter.type)
      ? languageFilter.type
      : [languageFilter.type]
    : [];

  return (
    <Card className="mb-3">
      <Card.Header as="h5">Filters</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="filterName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by name..."
              value={languageFilter.name || ""}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="filterOwnerName">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by owner..."
              value={languageFilter.ownerName || ""}
              onChange={(e) => handleOwnerNameChange(e.target.value)}
            />
          </Form.Group>

          { variant.toLowerCase() == "all" && (<Form.Group className="mb-3" controlId="filterStatus">
            <Form.Label>Status</Form.Label>
            <div>
              {STATUS_OPTIONS.map((status) => (
                <Form.Check
                  key={status}
                  type="checkbox"
                  id={`status-${status}`}
                  label={status}
                  checked={currentStatuses.includes(status)}
                  onChange={() => handleStatusToggle(status)}
                  className="mb-1"
                />
              ))}
            </div>
          </Form.Group>)}

          <Form.Group className="mb-3" controlId="filterType">
            <Form.Label>Type</Form.Label>
            <div>
              {TYPE_OPTIONS.map((type) => (
                <Form.Check
                  key={type}
                  type="checkbox"
                  id={`type-${type}`}
                  label={type}
                  checked={currentTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="mb-1"
                />
              ))}
            </div>
          </Form.Group>

          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
