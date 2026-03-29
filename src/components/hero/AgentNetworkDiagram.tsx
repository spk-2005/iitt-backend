// 'use client';

// import React from 'react';
// import { ReactFlow, Background, useNodesState, useEdgesState } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// // Import Data
// import { initialNodes, initialEdges } from './DiagramConfig';

// // Import Custom Nodes
// import { CenterNode } from './nodes/CenterNode';
// import { HubNode } from './nodes/HubNode';
// import { HumanNode } from './nodes/HumanNode';
// import { FloatingNode } from './nodes/FloatingNode';
// import { ActivityNode } from './nodes/ActivityNode';

// // Map node types for React Flow
// const nodeTypes = {
//   center: CenterNode,
//   hub: HubNode,
//   human: HumanNode,
//   floating: FloatingNode,
//   activity: ActivityNode,
// };

// export default function AgentNetworkDiagram() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   return (
//     <div className="w-full h-[800px] relative bg-[#FAFAFA] overflow-hidden rounded-3xl border border-slate-200">
      
//       {/* Aesthetic glowing background orb */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/5 to-rose-500/5 rounded-full blur-3xl pointer-events-none" />

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         nodeTypes={nodeTypes}
//         fitView
//         fitViewOptions={{ padding: 0.2 }}
//         proOptions={{ hideAttribution: true }}
//         panOnDrag={false} 
//         zoomOnScroll={false}
//         zoomOnPinch={false}
//         zoomOnDoubleClick={false}
//         className="z-10"
//       >
//         {/* Optional: Add a subtle dotted background if you want that blueprint feel */}
//         {/* <Background color="#E2E8F0" gap={16} size={1} /> */}
//       </ReactFlow>
//     </div>
//   );
// }