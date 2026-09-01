import React, { useState } from 'react';
import styles from './EndpointStyle.module.css';
import { ReactFlow, Edge, Position, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import StylePropertyModal from '../../StyleEdition/StylePropertyModal';

interface EndpointStyleProps {
  style: any;
  onStyleChange: (newStyle: Record<string, unknown>) => void;
}

export function EndpointStyle({ style, onStyleChange }: EndpointStyleProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);

  // Extract edge style properties
  const edgeStyle = (style.style || {}) as Record<string, any>;
  const markerStart = (style.markerStart || {}) as Record<string, any>;
  const markerEnd = (style.markerEnd || {}) as Record<string, any>;

 

  const nodes : Node[] = [
    {
      id: 'n1',
      position: { x: 0, y: 30 },
      data: { label: 'Rei.' },
      type: 'input',
      style: { width: 20, height: 20 },
      sourcePosition: Position.Right,
    },
    {
      id: 'n2',
      position: { x: 150, y: 30 },
      data: { label: 'Elt.' },
      type: 'output',
      style: { width: 20, height: 20 },
      targetPosition: Position.Left,
    },
  ];

  const edge: Edge = {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    style: {
      stroke: edgeStyle.stroke || '#000',
      strokeWidth: edgeStyle.strokeWidth || 2,
      strokeDasharray: edgeStyle.strokeDasharray,
    },
    markerStart: {
      type: markerStart?.type || 'none',
      color: markerStart?.color || '#000',
      strokeWidth: markerStart?.strokeWidth || 1,
    },
    markerEnd: {
      type: markerEnd?.type || 'none',
      color: markerEnd?.color || '#000',
      strokeWidth: markerEnd?.strokeWidth || 1,
    },
  };

  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    onStyleChange(newStyle);
    setShowStyleModal(false);
  };
  console.log(edge);
  return (
    <>
      <div className={styles.container} onClick={() => setShowStyleModal(true)}>
        <ReactFlow
          nodes={nodes}
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
