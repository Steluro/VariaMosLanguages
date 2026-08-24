import { useState } from 'react';
import styles from './ElementShapeImage.module.css';
import StyleViewModal from '../StyleViewModal';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';

interface ElementShapeImageProps {
  element: ElementType;
}

export function ElementViewImage({ element }: ElementShapeImageProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);
  const style = element.style || {};
  
  // Extract styles for title, properties, and body categories
  const titleStyle = (style as Record<string, unknown>).title as Record<string, string> || {};
  const propertiesStyle = (style as Record<string, unknown>).properties as Record<string, string> || {};
  const bodyStyle = (style as Record<string, unknown>).body as Record<string, string> || {};

  const containerStyle: React.CSSProperties = {
    ...bodyStyle,
    width: '200px',
    height: '100%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleCss: React.CSSProperties = {
    ...titleStyle,
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const propertiesCss: React.CSSProperties = {
    ...propertiesStyle,
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  };

  return (
    <>
    <div className={styles.container} onClick={() => setShowStyleModal(true)}>
      <div style={containerStyle}>
        <span style={titleCss}>{element.name}</span>
        <div style={propertiesCss}>
          {Object.entries(element.properties || {}).map(([key, value]) => (
            <div key={key}>{key}: {String(value)}</div>
          ))}
        </div>
      </div>
    </div>
    <StyleViewModal
      show={showStyleModal}
      actualStyle={style}
      onHide={() => setShowStyleModal(false)}
    />
    </>
  );
}
