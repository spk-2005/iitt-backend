import { Handle, Position } from '@xyflow/react';
import { MessageSquare, Edit3, Search } from 'lucide-react';

export function FloatingNode({ data }: { data: any }) {
  // Simple icon renderer based on string passed in config
  const renderIcon = () => {
    switch (data.icon) {
      case 'message': return <MessageSquare size={14} className="text-indigo-500" />;
      case 'edit': return <Edit3 size={14} className="text-blue-500" />;
      case 'search': return <Search size={14} className="text-slate-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm">
      <Handle type="target" position={Position.Top} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      
      {renderIcon()}
      <span className="text-xs font-medium text-slate-600">{data.label}</span>
    </div>
  );
}