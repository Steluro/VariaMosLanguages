import { Alert } from "react-bootstrap";

export default function ForbiddenPage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>403 - Forbidden</Alert.Heading>
        <p>You do not have permission to access this language.</p>
      </Alert>
    </div>
  );
}
