import { type Node, type Edge } from '@xyflow/react';

// Data shapes for our custom nodes
export type NodeData = {
  label?: string;
  color?: string;
  icon?: string;
  gradient?: string;
};

export const initialNodes: Node<NodeData>[] = [
  // --- CENTER HUB ---
  {
    id: 'center',
    type: 'center',
    position: { x: 450, y: 300 },
    data: { label: 'Anseru' },
  },

  // --- MAIN CATEGORY HUBS ---
  {
    id: 'agents',
    type: 'hub',
    position: { x: 250, y: 150 },
    data: { label: 'Agents', color: 'border-blue-600 text-blue-700' },
  },
  {
    id: 'data',
    type: 'hub',
    position: { x: 650, y: 100 },
    data: { label: 'Data', color: 'border-indigo-600 text-indigo-700' },
  },
  {
    id: 'tools',
    type: 'hub',
    position: { x: 150, y: 450 },
    data: { label: 'Tools', color: 'border-blue-800 text-blue-900' },
  },
  {
    id: 'human',
    type: 'hub',
    position: { x: 750, y: 500 },
    data: { label: 'Human', color: 'border-indigo-800 text-indigo-900' },
  },

  // --- FLOATING SUB-NODES ---
  {
    id: 'comment',
    type: 'floating',
    position: { x: 150, y: 50 },
    data: { label: 'Comment', icon: 'message' },
  },
  {
    id: 'author',
    type: 'floating',
    position: { x: 300, y: 30 },
    data: { label: 'Author', icon: 'edit' },
  },
  {
    id: 'search',
    type: 'floating',
    position: { x: 150, y: 220 },
    data: { label: 'Search', icon: 'search' },
  },

  // --- HUMAN SUB-NODES ---
  {
    id: 'sales',
    type: 'human',
    position: { x: 650, y: 350 },
    data: { label: 'Sales', color: 'bg-indigo-50 border-indigo-200' },
  },
  {
    id: 'security',
    type: 'human',
    position: { x: 650, y: 620 },
    data: { label: 'Security', color: 'bg-purple-50 border-purple-200' },
  },
  {
    id: 'proposal',
    type: 'human',
    position: { x: 900, y: 450 },
    data: { label: 'Proposal', color: 'bg-blue-50 border-blue-200' },
  },
  {
    id: 'compliance',
    type: 'human',
    position: { x: 880, y: 600 },
    data: { label: 'Compliance', color: 'bg-indigo-50 border-indigo-200' },
  },

  // --- ACTIVITY CARDS ---
  {
    id: 'act1',
    type: 'activity',
    position: { x: 450, y: 120 },
    data: { label: 'Activities' },
  },
  {
    id: 'act2',
    type: 'activity',
    position: { x: 820, y: 150 },
    data: { label: 'Activities' },
  },
  {
    id: 'act3',
    type: 'activity',
    position: { x: 50, y: 280 },
    data: { label: 'Activities' },
  },
];

export const initialEdges: Edge[] = [
  // Center to Hubs
  { id: 'e-c-agents', source: 'center', target: 'agents', animated: true, style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-c-data', source: 'center', target: 'data', animated: true, style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-c-tools', source: 'center', target: 'tools', animated: true, style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-c-human', source: 'center', target: 'human', animated: true, style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '4 4' } },

  // Hubs to Sub-nodes
  { id: 'e-a-com', source: 'agents', target: 'comment', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-a-auth', source: 'agents', target: 'author', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-a-sea', source: 'agents', target: 'search', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' } },
  
  { id: 'e-h-sal', source: 'human', target: 'sales', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-h-sec', source: 'human', target: 'security', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-h-pro', source: 'human', target: 'proposal', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' } },
  { id: 'e-h-com', source: 'human', target: 'compliance', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' } },
];