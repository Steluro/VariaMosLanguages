import { useEffect, useState } from 'react';
import styles from './RelationShapeImage.module.css';
import StylePropertyModal from '../StyleEdition/StylePropertyModal';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';
import { updateRelation } from '../../../../DataProvider/Services/relationType.service';
import { ReactFlow, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface RelationShapeImageProps {
  relation: RelationType;
}

export function RelationShapeImage({ relation }: RelationShapeImageProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [style, setStyle] = useState<Record<string, any>>(relation.style || {});
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});
  const [propertiesStyle, setPropertiesStyle] = useState<Record<string, any>>({});

  useEffect(() => {
    // Extract styles for edge categories
    const edgeStyle = (style.style || {}) as Record<string, any>;
    const markerStart = (style.markerStart || {}) as Record<string, any>;
    const markerEnd = (style.markerEnd || {}) as Record<string, any>;

    setContainerStyle({
      stroke: edgeStyle.stroke || '#000',
      strokeWidth: parseInt(edgeStyle.strokeWidth as string) || 2,
      strokeDasharray: edgeStyle.strokeDasharray,
    });

    setPropertiesStyle({
      markerStart,
      markerEnd,
    });
  }, [style]);

  const nodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '' }, style: { width: 5, height: 5 } },
    { id: '2', position: { x: 170, y: 100 }, data: { label: '' }, style: { width: 5, height: 5 } },
  ];

  const edge: Edge = {
    id: 'e1-2',
    source: '1',
    target: '2',
    style: {
      stroke: containerStyle.stroke,
      strokeWidth: containerStyle.strokeWidth,
      strokeDasharray: containerStyle.strokeDasharray,
    },
    markerStart: {
      type : propertiesStyle.markerStart?.type || 'none',
      width : parseInt(propertiesStyle.markerStart?.width as string) || 10,
      height : parseInt(propertiesStyle.markerStart?.height as string) || 10,
      color : propertiesStyle.markerStart?.color || '#000'
    },
    markerEnd: {
      type : propertiesStyle.markerEnd?.type || 'none',
      width : parseInt(propertiesStyle.markerEnd?.width as string) || 10,
      height : parseInt(propertiesStyle.markerEnd?.height as string) || 10,
      color : propertiesStyle.markerEnd?.color || '#000'
    }
  };

  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    updateRelation(relation.languageId, relation.uuid, { style: newStyle });
    setStyle(newStyle);
    setShowStyleModal(false);
  };

  return (
    <>
      <div className={styles.container} onClick={() => setShowStyleModal(true)} style={{ width: '200px', height: '100px' }}>
        <ReactFlow
          nodes={nodes}
          edges={[edge]}
          fitView
          style={{ width: '100%', height: '100%' }}
          nodesDraggable={false}
          elementsSelectable={false}
        />
      </div>
      <StylePropertyModal
        show={showStyleModal}
        actualStyle={style}
        onHide={() => setShowStyleModal(false)}
        onSelectProperty={handleStyleChange}
      />
    </>
  );
}
