import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Pending' | 'Approved' | 'Rejected';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusClasses = {
    Pending: "bg-warning/20 text-warning-foreground border border-warning/30",
    Approved: "bg-success/20 text-success border border-success/30",
    Rejected: "bg-destructive/20 text-destructive border border-destructive/30",
  };

  return (
    <span className={cn(baseClasses, statusClasses[status], className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
