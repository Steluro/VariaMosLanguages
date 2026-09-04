import React, { useState, useEffect } from 'react';
import styles from './EndpointStyle.module.css';
import { ReactFlow, Edge, Position, Node, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StylePropertyModal from '../../StyleEdition/StylePropertyModal';
import { ReificationTypeEndpoint } from '../../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint';
import { set } from 'immer/dist/internal';

/**
 * Props for the EndpointStyle component
 * @interface EndpointStyleProps
 * @property {ReificationTypeEndpoint} endpoint - The endpoint to display
 * @property {(newStyle: Record<string, unknown>) => void} onStyleChange - Callback to update endpoint style
 */
interface EndpointStyleProps {
  endpoint : ReificationTypeEndpoint;
  onStyleChange: (newStyle: Record<string, unknown>) => void;
}

/**
 * Component for displaying endpoint visual representation using ReactFlow
 * Shows a graph with reification and element nodes connected by an edge
 * @param {EndpointStyleProps} props - The component props
 * @returns {JSX.Element} The rendered endpoint style component
 */
export function EndpointStyle({ endpoint, onStyleChange }: EndpointStyleProps) {
  const [showStyleModal, setShowStyleModal] = useState(false);

  const nodes: Node[] = [
    {
      id: 'n1',
      type: 'input',
      position: { x: 0, y: 30 },
      data: { label: 'Rei.' },
      style: { width: 50, height: 50 },
      sourcePosition: Position.Right,
    },
    {
      id: 'n2',
      position: { x: 200, y: 30 },
      data: { label: 'Elt.' },
      type: 'output',
      style: { width: 50, height: 50 },
      targetPosition: Position.Left,
    },
  ];
  const edge : Edge = {
      id: 'e1-2',
      source: 'n1',
      target: 'n2',
      style: {
        stroke: endpoint.style.style["stroke"] || '#000',
        strokeWidth: endpoint.style.style['strokeWidth'] || 2,
        strokeDasharray: endpoint.style.style['strokeDasharray'],
      },
      markerStart: {
        type: endpoint.style.markerStart["type"] || 'none',
        color: endpoint.style.markerStart['color'] || '#000',
        strokeWidth: endpoint.style.markerStart["strokeWidth"] || 1,
      },
      markerEnd: {
        type: endpoint.style.markerEnd["type"] || 'none',
        color: endpoint.style.markerEnd["color"] || '#000',
        strokeWidth: endpoint.style.markerEnd["strokeWidth"] || 1,
      },
    };

  /**
   * Handle style changes and update endpoint
   * @param {Record<string, unknown>} newStyle - The new style object
   */
  const handleStyleChange = (newStyle: Record<string, unknown>) => {
    onStyleChange(newStyle);
    setShowStyleModal(false);
  };
  return (
    <>
      <div className={styles.container}  onClick={() => setShowStyleModal(true)}>
        <ReactFlow
          nodes={nodes}
          edges={[edge]}
          fitView
          // style={{ width: '100%', height: '100%' }}
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
        actualStyle={endpoint.style}
        onHide={() => setShowStyleModal(false)}
        onSelectProperty={handleStyleChange}
      />
    </>
  );
}
