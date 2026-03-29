import { Handle, Position } from '@xyflow/react';

export function CenterNode({ data }: { data: any }) {
  return (
    <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-rose-500 p-[3px] shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)]">
      {/* Target/Source handle placed exactly in the center, invisible */}
      <Handle type="target" position={Position.Top} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        {data.label}
      </div>
    </div>
  );
}