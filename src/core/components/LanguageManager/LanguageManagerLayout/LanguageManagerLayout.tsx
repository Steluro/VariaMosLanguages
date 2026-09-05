import React from "react";
import { Container, Col, Row } from "react-bootstrap";

/**
 * Layout component for Language Manager
 * Wraps children in a container with row layout
 * @param {object} props - The component props
 * @property {React.ReactNode} children - Child components to render
 * @returns {JSX.Element} The rendered layout
 */
function LanguageManagerLayout({ children }) {
  return (
    <Container>
      {React.Children.map(children, (child) => (
        <Row className="mt-2">
          <Col>{child}</Col>
        </Row>
      ))}
    </Container>
  );
}

export default LanguageManagerLayout;
