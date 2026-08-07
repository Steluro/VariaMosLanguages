import React from 'react';

interface PropertyCardProps {
  type: string;
  name: string;
}

export function ReificationPropertieCard({ type, name }: PropertyCardProps) {
  return (
    <div>
      <strong style={{ fontFamily: 'monospace' }}>{type}</strong> {name}
    </div>
  );
}
