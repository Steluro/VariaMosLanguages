import { useEffect, useState } from 'react';
import styles from './ElementShapeImage.module.css';
import StylePropertyModal from '../StyleEdition/StylePropertyModal';
import { ElementType } from '../../../../Domain/ProductLineEngineering/Entities/ElementType';
import { updateElement } from '../../../../DataProvider/Services/elementType.service';

/**
 * Props for the ElementEditionImage component
 * @interface ElementShapeImageProps
 * @property {ElementType} element - The element type to display the style of
 */
interface ElementShapeImageProps {
  element: ElementType;
}

/**
 * Component for displaying and editing element type visual representation
 * Shows element with his name, properties, and open style customization modal on click
 * @param {ElementShapeImageProps} props - The component props
 * @returns {JSX.Element} The rendered element image component
 */
export function ElementEditionImage({ element }: ElementShapeImageProps) {
  const [showStyleModal,setShowStyleModal]=useState(false);
  const [style, setStyle] = useState<Record<string, any>>(element.style || {});
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
   * Handle style changes and update element
   * @param {Record<string, unknown>} newStyle - The new style object
   */
  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    updateElement(element.languageId, element.uuid, { style: newStyle });
    setStyle(newStyle);
    setShowStyleModal(false);
  };

  return (
    <>
    <div className={styles.container} onClick={()=>setShowStyleModal(true)}>
      <div style={containerStyle}>
        <span style={titleStyle}>{element.name}</span>
        <div style={propertiesStyle}>
          {Object.entries(element.properties || {}).map(([key]) => (
            <div key={key}>{key}</div>
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
