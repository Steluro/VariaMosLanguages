import React from 'react';
import styles from './ElementShapeImage.module.css';

interface ElementShapeImageProps {
  style: any;
}

export function ElementEditionImage({ style }: ElementShapeImageProps) {
  // Extract style properties
  const {
    backgroundColor = '#ffffff',
    borderColor = '#0d6efd',
    borderWidth = 2,
    borderRadius = 8,
    width = 80,
    height = 80,
    shape = 'rectangle', // rectangle, circle, diamond, etc.
    color = '#ffffff',
    fontSize = 32,
  } = style || {};

  const svgStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  const shapeStyle: React.CSSProperties = {
    fill: backgroundColor,
    stroke: borderColor,
    strokeWidth: borderWidth,
  };

  const textStyle: React.CSSProperties = {
    fill: color,
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
  };

  // Render different shapes based on shape property
  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <circle
            cx={width / 2}
            cy={height / 2}
            r={(Math.min(width, height) / 2) - borderWidth}
            style={shapeStyle}
          />
        );
      case 'diamond':
        return (
          <polygon
            points={`${width / 2},${borderWidth} ${width - borderWidth},${height / 2} ${width / 2},${height - borderWidth} ${borderWidth},${height / 2}`}
            style={shapeStyle}
          />
        );
      case 'rectangle':
      default:
        return (
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            rx={borderRadius}
            ry={borderRadius}
            style={shapeStyle}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <svg style={svgStyle} viewBox={`0 0 ${width} ${height}`}>
        {renderShape()}
      </svg>
    </div>
  );
}
