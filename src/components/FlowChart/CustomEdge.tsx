import React, { type FC } from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from '@xyflow/react';

const CustomEdge: FC<EdgeProps<Edge<{ label: string, color: string, style: { translate: string } }>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
           // transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
         transform: `${data?.style?.translate ? `translate(${data.style.translate})` : 'translate(-50%, -50%)'} translate(${labelX}px,${labelY}px)`,
        }}
          className={`relative ${data.color ? `${data.color}` : 'bg-[#ffcc00]'} p-2 w-fit text-white text-sm font-bold rounded-md  edge-label-renderer__custom-edge `}
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
 
export default CustomEdge;