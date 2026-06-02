type SummaryCardsProps = {
  activeTickets: number;
  soldOutTickets: number;
  totalTickets: number;
  onCreateTicket?: () => void;
};

export default function SummaryCards({
  activeTickets,
  soldOutTickets,
  totalTickets,
  onCreateTicket,
}: SummaryCardsProps) {
  const safeTotal = totalTickets > 0 ? totalTickets : 1;
  const activeWidth = (activeTickets / safeTotal) * 100;
  const soldOutWidth = (soldOutTickets / safeTotal) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-500 mb-3">Ticket Status Overview</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Active Tickets</span>
          <span className="text-lg font-bold text-emerald-600">{activeTickets}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${activeWidth}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Sold Out</span>
          <span className="text-lg font-bold text-rose-600">{soldOutTickets}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${soldOutWidth}%` }} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
        <h3 className="text-sm font-semibold text-white/80 mb-2">Quick Actions</h3>
        <p className="text-2xl font-bold mb-3">Manage Tickets</p>
        <p className="text-sm text-white/70 mb-4">Create new ticket types or edit existing ones</p>
        <button
          type="button"
          onClick={onCreateTicket}
          className="px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
        >
          + Create New Ticket Type
        </button>
      </div>
    </div>
  );
}