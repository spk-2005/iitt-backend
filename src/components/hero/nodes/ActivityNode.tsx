import { Handle, Position } from '@xyflow/react';

export function ActivityNode({ data }: { data: any }) {
  return (
    <div className="w-48 p-4 rounded-xl border border-purple-100 bg-white/80 backdrop-blur-md shadow-lg shadow-purple-500/5">
      {/* Notice no target handle. In the image, these lines point TO the data, but aren't explicitly connected in React Flow yet. We add an invisible target just in case you route an edge to it later */}
      <Handle type="target" position={Position.Top} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      <span className="block text-xs font-semibold text-purple-500 mb-2">{data.label}</span>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full bg-purple-100 rounded-full" />
        <div className="h-1.5 w-2/3 bg-purple-100 rounded-full" />
      </div>
      <span className="block text-[10px] text-slate-400 mt-3">Update field "Pilot end date"</span>
    </div>
  );
}