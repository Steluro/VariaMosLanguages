import {useEffect, useState} from 'react';
import type {CSSProperties} from 'react';
import styles from './ReificationShapeImage.module.css';
import { ReificationType } from '../../../../Domain/ProductLineEngineering/Entities/ReificationType';
import StyleViewModal from '../StyleViewModal';

interface RelationShapeImageProps {
  reification : ReificationType;
}

export function ReificationViewImage({ reification }: RelationShapeImageProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);

  // Extract styles for title, properties, and body categories
  const title = (reification.style.title || {}) as Record<string, unknown>;
  const properties = (reification.style.properties || {}) as Record<string, unknown>;
  const body = (reification.style.body || {}) as Record<string, unknown>;

  const containerStyle: CSSProperties = {
    width: '200px',
    height: '100%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '40px',
    ...body,
  };

  const titleStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    ...title,
  };

  const propertiesStyle: CSSProperties = {
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    textAlign: 'center' as const,
    ...properties,
  };
useEffect(()=>{
  console.log(body,containerStyle);
},[body,containerStyle])
  return (
    <>
      <div className={styles.container} onClick={() => {setShowStyleModal(true)}}>
        <div style={containerStyle}>
          <span style={titleStyle}>{reification.name}</span>
          <div style={propertiesStyle}>
            {Object.entries(reification.properties || {}).map(([key, value]) => (
              <div key={key}>{key}: {String(value)}</div>
            ))}
          </div>
        </div>
      </div>
      <StyleViewModal
        show={showStyleModal}
        actualStyle={reification.style}
        onHide={() => setShowStyleModal(false)}
      />
    </>
  );
}
