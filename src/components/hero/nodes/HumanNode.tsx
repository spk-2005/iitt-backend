import { Handle, Position } from '@xyflow/react';
import { User } from 'lucide-react';

export function HumanNode({ data }: { data: any }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm backdrop-blur-sm ${data.color || 'bg-white border-slate-200'}`}>
      <Handle type="target" position={Position.Top} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-white">
        <User size={16} className="text-slate-500" />
      </div>
      <span className="text-sm font-medium text-slate-700">{data.label}</span>
    </div>
  );
}