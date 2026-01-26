import { Order } from '@/data/menuData';

interface StatusBadgeProps {
  status: Order['status'];
}

const statusConfig = {
  pending: { label: 'Pending', className: 'status-pending' },
  preparing: { label: 'Preparing', className: 'status-preparing' },
  ready: { label: 'Ready', className: 'status-ready' },
  completed: { label: 'Completed', className: 'status-completed' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
