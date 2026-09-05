import React from 'react';

/**
 * Props for the ElementPropertieCard component
 * @interface PropertyCardProps
 * @property {string} type - The property type
 * @property {string} name - The property name
 */
interface PropertyCardProps {
  type: string;
  name: string;
}

/**
 * Simple card component for displaying an element property with type and name
 * @param {PropertyCardProps} props - The component props
 * @returns {JSX.Element} The rendered property card
 */
export function ElementPropertieCard({ type, name }: PropertyCardProps) {
  return (
    <div>
      <strong style={{ fontFamily: 'monospace' }}>{type}</strong> {name}
    </div>
  );
}
