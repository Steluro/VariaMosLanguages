import { useEffect, useState } from 'react';
import styles from './ReificationShapeImage.module.css';
import StylePropertyModal from '../StyleEdition/StylePropertyModal';
import { ReificationType } from '../../../../Domain/ProductLineEngineering/Entities/ReificationType';
import { updateReification } from '../../../../DataProvider/Services/reificationType.service';

/**
 * Props for the ReificationEditionImage component
 * @interface ReificationShapeImageProps
 * @property {ReificationType} reification - The reification type to display
 */
interface ReificationEditionImageProps {
  reification: ReificationType;
}

/**
 * Component for displaying and editing reification type visual representation
 * Shows reification name, properties, and allows style customization
 * @param {ReificationShapeImageProps} props - The component props
 * @returns {JSX.Element} The rendered reification image component
 */
export function ReificationEditionImage({ reification }: ReificationEditionImageProps) {
  const [showStyleModal,setShowStyleModal]=useState(false);
  const [style, setStyle] = useState<Record<string, any>>(reification.style || {});
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});
  const [titleStyle, setTitleStyle] = useState<Record<string, any>>({});
  const [propertiesStyle, setPropertiesStyle] = useState<Record<string, any>>({});

  /**
   * Extract and apply styles for title, properties, and body categories
   * Map title and properties to text category in the JSON
   */
  useEffect(()=>{  
  // Extract styles for title, properties, and body categories
  // Map title and properties to text category in the JSON
  const title = (style.title || {}) as Record<string, any>;
  const properties = (style.properties || {}) as Record<string, any>;
  const body = (style.body || {}) as Record<string, any>;

  setContainerStyle({
    width: '200px',
    height: '100%',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '40px',
    ...body,
  });

  setTitleStyle({
    fontSize: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    ...title ,
  });

  setPropertiesStyle({
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    textAlign: 'center',
    ...properties,
  });
  }, [style]);

  
  /**
   * Handle style changes and update reification
   * @param {Record<string, unknown>} newStyle - The new style object
   */
  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    updateReification(reification.languageId, reification.uuid, { style: newStyle });
    setStyle(newStyle);
    setShowStyleModal(false);
  };

  return (
    <>
    <div className={styles.container} onClick={()=>setShowStyleModal(true)}>
      <div style={containerStyle}>
        <span style={titleStyle}>{reification.name}</span>
        <div style={propertiesStyle}>
          {Object.entries(reification.properties || {}).map(([key, value]) => (
            <div key={key}>{key}: {String(value)}</div>
          ))}
        </div>
      </div>
    </div>
    <StylePropertyModal
      show = {showStyleModal}
      actualStyle={style}
      onHide={()=>setShowStyleModal(false)}
      onSelectProperty={handleStyleChange}
    />
    </>
  );
}
