import { Alert } from "react-bootstrap";

interface ForbiddenPageProps {
  message?: string;
}

export default function ForbiddenPage({ message = "You do not have permission to access this language." }: ForbiddenPageProps) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>403 - Forbidden</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
}
