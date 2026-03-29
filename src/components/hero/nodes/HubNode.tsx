import { Handle, Position } from '@xyflow/react';

export function HubNode({ data }: { data: any }) {
  return (
    <div className={`px-6 py-3 rounded-2xl border-[2.5px] bg-white shadow-lg font-semibold tracking-wide ${data.color || 'border-slate-800 text-slate-800'}`}>
      <Handle type="target" position={Position.Top} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      {data.label}
    </div>
  );
}