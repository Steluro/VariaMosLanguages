import { useEffect, useState } from 'react';
import styles from './RelationShapeImage.module.css';
import StylePropertyModal from '../StyleEdition/StylePropertyModal';
import { RelationType } from '../../../../Domain/ProductLineEngineering/Entities/RelationType';
import { updateRelation } from '../../../../DataProvider/Services/relationType.service';
import { ReactFlow, Edge, MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * Props for the RelationShapeImage component
 * @interface RelationShapeImageProps
 * @property {RelationType} relation - The relation type to display
 */
interface RelationShapeImageProps {
  relation: RelationType;
}

/**
 * Component for displaying relation type visual representation using ReactFlow
 * Shows a graph with source and target nodes connected by a styled edge
 * @param {RelationShapeImageProps} props - The component props
 * @returns {JSX.Element} The rendered relation shape image component
 */
export function RelationShapeImage({ relation }: RelationShapeImageProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [style, setStyle] = useState<Record<string, any>>(relation.style || {});
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});
const [markerStart, setMarkerStart] = useState<Record<string, any>>({});
const [markerEnd, setMarkerEnd] = useState<Record<string, any>>({});


  /**
   * Extract and apply styles for edge categories
   */
  useEffect(() => {
    // Extract styles for edge categories
    const edgeStyle = (style.style || {}) as Record<string, any>;
    const markerStart = (style.markerStart || {}) as Record<string, any>;
    const markerEnd = (style.markerEnd || {}) as Record<string, any>;

    setContainerStyle(edgeStyle);
    setMarkerStart(markerStart);
    setMarkerEnd(markerEnd);
  }, [style]);

  const initialNodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Source' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: 'Target' },
    type: 'output',
  },
];

  const edge: Edge = {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    style: {
      stroke: containerStyle.stroke || "#000",
      strokeWidth: containerStyle.strokeWidth || 2,
      strokeDasharray: containerStyle.strokeDasharray,
    },
    markerStart: {
      type : markerStart?.type || 'none',
      color : markerStart?.color || '#000',
      strokeWidth : markerStart?.strokeWidth || 1,
    },
    markerEnd: {
      type : markerEnd?.type || 'none',
      color : markerEnd?.color || '#000',
      strokeWidth : markerEnd?.strokeWidth || 1,
    }
  };

  /**
   * Handle style changes and update relation
   * @param {Record<string, unknown>} newStyle - The new style object
   */
  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    updateRelation(relation.languageId, relation.uuid, { style: newStyle });
    setStyle(newStyle);
    setShowStyleModal(false);
  };
  
  return (
    <>
      <div className={styles.container}  onClick={() => setShowStyleModal(true)}>
        <ReactFlow
          nodes={initialNodes}
          edges={[edge]}
          fitView
          style={{ width: '100%', height: '100%' }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
        >
          <Background />
        </ReactFlow>
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
