import React, { useState, useEffect } from 'react';
import styles from './EndpointStyleView.module.css';
import { ReactFlow, Edge, Position, Node, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import StyleViewModal from '../StyleViewModal';
import { ReificationTypeEndpoint } from '../../../../Domain/ProductLineEngineering/Entities/ReificationTypeEndpoint';

interface EndpointStyleProps {
  endpoint : ReificationTypeEndpoint;
}

export function EndpointStyleView({ endpoint }: EndpointStyleProps) {
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
      <StyleViewModal
        show={showStyleModal}
        actualStyle={endpoint.style}
        onHide={() => setShowStyleModal(false)}
      />
    </>
  );
}
