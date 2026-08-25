import {useEffect, useState} from 'react';
import type {CSSProperties} from 'react';
import styles from './ElementShapeImage.module.css';
import StyleViewModal from '../StyleViewModal';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';

interface ElementShapeImageProps {
  element: ElementType;
}

export function ElementViewImage({ element }: ElementShapeImageProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);

  // Extract styles for title, properties, and body categories
  const title = (element.style.title || {}) as Record<string, unknown>;
  const properties = (element.style.properties || {}) as Record<string, unknown>;
  const body = (element.style.body || {}) as Record<string, unknown>;

  const containerStyle: CSSProperties = {
    width: '200px',
    height: '100%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
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
          <span style={titleStyle}>{element.name}</span>
          <div style={propertiesStyle}>
            {Object.entries(element.properties || {}).map(([key, value]) => (
              <div key={key}>{key}: {String(value)}</div>
            ))}
          </div>
        </div>
      </div>
      <StyleViewModal
        show={showStyleModal}
        actualStyle={element.style}
        onHide={() => setShowStyleModal(false)}
      />
    </>
  );
}
