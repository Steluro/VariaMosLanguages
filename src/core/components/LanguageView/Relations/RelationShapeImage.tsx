import { useState } from "react";
import styles from "./RelationShapeImage.module.css";
import { ReactFlow, Edge } from "reactflow";
import "reactflow/dist/style.css";
import StyleViewModal from "../StyleViewModal";

/**
 * Props for the RelationShapeImage component
 * @interface RelationShapeImageProps
 * @property {any} style - The relation style object
 */
interface RelationShapeImageProps {
  style: any;
}

/**
 * Visual representation component for relation type using ReactFlow
 * Displays two nodes connected by a styled edge representing the relation
 * @param {RelationShapeImageProps} props - The component props
 * @returns {JSX.Element} The rendered relation shape image
 */
export function RelationShapeImage({ style }: RelationShapeImageProps) {
  const [styleViewModal, setStyleViewModal] = useState(false);
  // Extract edge style properties
  const edgeStyle = (style.style || {}) as Record<string, any>;
  const markerStart = (style.markerStart || {}) as Record<string, any>;
  const markerEnd = (style.markerEnd || {}) as Record<string, any>;

  const containerStyle = {
    stroke: edgeStyle.stroke || "#000",
    strokeWidth: parseInt(edgeStyle.strokeWidth as string) || 2,
    strokeDasharray: edgeStyle.strokeDasharray,
  };

  const nodes = [
    {
      id: "n1",
      position: { x: 0, y: 0 },
      data: { label: "Source" },
      type: "input",
    },
    {
      id: "n2",
      position: { x: 100, y: 100 },
      data: { label: "Target" },
      type: "output",
    },
  ];

  const edge: Edge = {
    id: "e1-2",
    source: "n1",
    target: "n2",
    style: {
      stroke: containerStyle.stroke,
      strokeWidth: containerStyle.strokeWidth,
      strokeDasharray: containerStyle.strokeDasharray,
    },
    markerStart: {
      type: markerStart?.type || "dot",
      color: markerStart?.color || "#000",
    },
    markerEnd: {
      type: markerEnd?.type || "dot",
      color: markerEnd?.color || "#000",
    },
  };

  return (
    <>
      <div className={styles.container} onClick={() => setStyleViewModal(true)}>
        <ReactFlow
          nodes={nodes}
          edges={[edge]}
          fitView
          style={{ width: "100%", height: "100%" }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
        />
      </div>
      <StyleViewModal
        actualStyle={style}
        show={styleViewModal}
        onHide={() => setStyleViewModal(false)}
      />
    </>
  );
}
