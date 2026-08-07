import React from 'react';

interface PropertyCardProps {
  type: string;
  name: string;
}

export function RelationPropertieCard({ type, name }: PropertyCardProps) {
  return (
    <div>
      <strong style={{ fontFamily: 'monospace' }}>{type}</strong> {name}
    </div>
  );
}
