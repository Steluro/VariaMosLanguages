import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { LanguagesFilter } from "./LanguagesContainer";

/**
 * Props for the FilterPannel component
 * @interface FilterPannelProps
 * @property {LanguagesFilter} languageFilter - The current language filter
 * @property {(filter: LanguagesFilter) => void} setLanguageFilter - Callback to update the filter
 * @property {"myLanguages" | "shared" | "active" | "all"} variant - The variant of the language list
 */
interface FilterPannelProps {
  languageFilter: LanguagesFilter;
  setLanguageFilter: (filter: LanguagesFilter) => void;
  variant: "myLanguages" | "shared" | "active" | "all";
}

const STATUS_OPTIONS = ["draft", "pending", "published", "deleted"];
const ACCESS_LEVEL = ["viewer", "editor", "manager"];
const TYPE_OPTIONS = ["scope", "domain", "application"];

/**
 * Filter panel component for language list
 * Provides filtering by name, owner, status, type, and access level
 * @param {FilterPannelProps} props - The component props
 * @returns {JSX.Element} The rendered filter panel
 */
export function FilterPannel({
  languageFilter,
  setLanguageFilter,
  variant,
}: FilterPannelProps) {
  /**
   * Handle name filter change
   * @param {string} value - The new name filter value
   */
  const handleNameChange = (value: string) => {
    setLanguageFilter({ ...languageFilter, name: value || undefined });
  };

  /**
   * Handle owner name filter change
   * @param {string} value - The new owner name filter value
   */
  const handleOwnerNameChange = (value: string) => {
    setLanguageFilter({ ...languageFilter, ownerName: value || undefined });
  };

  /**
   * Handle status filter toggle
   * @param {string} status - The status to toggle
   */
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

  /**
   * Handle type filter toggle
   * @param {string} type - The type to toggle
   */
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

  /**
   * Handle access level filter toggle
   * @param {string} accessLevel - The access level to toggle
   */
  const handleAccessLevelToggle = (accessLevel: string) => {
    const currentAccessLevels = languageFilter.collaboratorRole
      ? Array.isArray(languageFilter.collaboratorRole)
        ? languageFilter.collaboratorRole
        : [languageFilter.collaboratorRole]
      : [];
    
    const newAccessLevels = currentAccessLevels.includes(accessLevel)
      ? currentAccessLevels.filter((al) => al !== accessLevel)
      : [...currentAccessLevels, accessLevel];
    
    setLanguageFilter({
      ...languageFilter,
      collaboratorRole: newAccessLevels.length > 0 ? newAccessLevels : undefined,
    });
  };

  /**
   * Handle filter reset to default values based on variant
   */
  const handleReset = () => {
    const baseFilter = new LanguagesFilter();
    switch (variant) {
      case "myLanguages":
        baseFilter.ownerId = languageFilter.ownerId;
        baseFilter.status = ["draft", "pending"];
        break;
      case "shared":
        baseFilter.collaboratorId = languageFilter.collaboratorId;
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

  const currentAccessLevels = languageFilter.collaboratorRole
    ? Array.isArray(languageFilter.collaboratorRole)
      ? languageFilter.collaboratorRole
      : [languageFilter.collaboratorRole]
    : [];

  return (
    <Card className="mb-3" style={{ border: '1px solid #dee2e6' }}>
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

          {variant.toLowerCase() != "mylanguages" && (<Form.Group className="mb-3" controlId="filterOwnerName">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by owner..."
              value={languageFilter.ownerName || ""}
              onChange={(e) => handleOwnerNameChange(e.target.value)}
            />
          </Form.Group>)}

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
       {variant.toLowerCase() == "shared" && (
        <Form.Group className="mb-3" controlId="filterSharedWith">
            <Form.Label>Access Level</Form.Label>
            {ACCESS_LEVEL.map((accessLevel) => (
                <Form.Check
                  key={accessLevel}
                  type="checkbox"
                  id={`accessLevel-${accessLevel}`}
                  label={accessLevel}
                  checked={currentAccessLevels.includes(accessLevel)}
                  onChange={() => handleAccessLevelToggle(accessLevel)}
                  className="mb-1"
                />
              ))}
          </Form.Group>
       )}
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
