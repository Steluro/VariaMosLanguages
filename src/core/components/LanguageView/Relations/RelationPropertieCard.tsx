import React from 'react';

/**
 * Props for the RelationPropertieCard component
 * @interface PropertyCardProps
 * @property {string} type - The property type
 * @property {string} name - The property name
 */
interface PropertyCardProps {
  type: string;
  name: string;
}

/**
 * Simple card component for displaying a relation property with type and name
 * @param {PropertyCardProps} props - The component props
 * @returns {JSX.Element} The rendered property card
 */
export function RelationPropertieCard({ type, name }: PropertyCardProps) {
  return (
    <div>
      <strong style={{ fontFamily: 'monospace' }}>{type}</strong> {name}
    </div>
  );
}
