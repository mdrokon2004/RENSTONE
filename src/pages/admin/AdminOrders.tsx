import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Send, Check, Eye, X, Phone, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import { formatBDT, cleanPhoneForWhatsApp } from '../../lib/formatters';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, settings } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRef = o.orderReference.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      if (!matchRef && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const handleOpenDetail = (order: Order) => {
    setActiveOrder(order);
    setInternalNoteInput(order.internalNotes || '');
  };

  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!activeOrder) return;
    setIsUpdating(true);
    await updateOrderStatus(activeOrder.id, status, internalNoteInput);
    setActiveOrder({ ...activeOrder, status, internalNotes: internalNoteInput });
    setIsUpdating(false);
  };

  const handleSaveNotes = async () => {
    if (!activeOrder) return;
    setIsUpdating(true);
    await updateOrderStatus(activeOrder.id, activeOrder.status, internalNoteInput);
    setActiveOrder({ ...activeOrder, internalNotes: internalNoteInput });
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-obsidian">
          Customer Orders ({orders.length})
        </h1>
        <p className="text-xs text-obsidian/60 mt-0.5">
          Verify and coordinate delivery with customers across Bangladesh.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded border border-black/10 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-obsidian/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order reference (REN-...), customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ivory rounded pl-9 pr-3 py-1.5 text-xs text-obsidian outline-none border border-black/10 focus:border-champagne"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-ivory border border-black/10 rounded px-3 py-1.5 text-xs text-obsidian outline-none focus:border-champagne font-semibold"
        >
          <option value="all">All Statuses ({orders.length})</option>
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded border border-black/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F6F2] border-b border-black/10 text-obsidian/60 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Delivery Region</th>
                <th className="py-3 px-4">Total (BDT)</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-obsidian/50 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-obsidian">
                      {ord.orderReference}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-obsidian">{ord.customerName}</p>
                      <p className="text-[11px] text-obsidian/60">{ord.customerPhone}</p>
                    </td>

                    <td className="py-3.5 px-4 text-obsidian/80">
                      <span className="font-semibold">{ord.district}</span>
                      <p className="text-[11px] text-obsidian/50 truncate max-w-[150px]">{ord.area}</p>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-obsidian">
                      {formatBDT(ord.total)}
                    </td>

                    <td className="py-3.5 px-4">
                      {ord.preferredChannel === 'whatsapp' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700">
                          <Send className="w-3.5 h-3.5" />
                          <span>Messenger</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        ord.status === 'Contacted' ? 'bg-purple-100 text-purple-800' :
                        ord.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        ord.status === 'Processing' ? 'bg-indigo-100 text-indigo-800' :
                        ord.status === 'Shipped' ? 'bg-teal-100 text-teal-800' :
                        ord.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(ord)}
                        className="px-3 py-1 bg-obsidian text-champagne hover:bg-champagne hover:text-obsidian text-[11px] font-bold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl animate-fade-in text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne-dark font-bold">
                  Order Details
                </span>
                <h3 className="font-display text-lg font-bold font-mono text-obsidian">
                  {activeOrder.orderReference}
                </h3>
                <p className="text-[11px] text-obsidian/50">
                  Received on {new Date(activeOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-1 text-obsidian/50 hover:text-obsidian"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-ivory p-4 rounded border border-black/10">
              <div className="space-y-1">
                <p className="font-bold text-obsidian uppercase text-[10px] tracking-wider">Customer Contact</p>
                <p className="font-semibold text-sm text-obsidian">{activeOrder.customerName}</p>
                <p className="text-obsidian/70 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-champagne-dark" />
                  <span>{activeOrder.customerPhone}</span>
                </p>
                <a
                  href={`https://wa.me/${cleanPhoneForWhatsApp(activeOrder.customerPhone)}?text=Hello%20${encodeURIComponent(activeOrder.customerName)},%20this%20is%20RENSTONE%20regarding%20order%20${activeOrder.orderReference}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-green-700 hover:underline font-semibold mt-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Message Customer on WhatsApp</span>
                </a>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-obsidian uppercase text-[10px] tracking-wider">Delivery Address</p>
                <p className="text-obsidian font-semibold">{activeOrder.district} ({activeOrder.area})</p>
                <p className="text-obsidian/70">{activeOrder.address}</p>
                {activeOrder.notes && (
                  <p className="text-[11px] text-amber-800 italic pt-1">
                    Customer Note: "{activeOrder.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider text-[10px] text-obsidian">Ordered Pieces</p>
              <div className="divide-y divide-black/10 border border-black/10 rounded overflow-hidden">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded border" />
                      )}
                      <div>
                        <p className="font-bold text-obsidian">{item.productName}</p>
                        {item.variantName && (
                          <p className="text-[11px] text-obsidian/60">{item.variantName}</p>
                        )}
                        <p className="text-[11px] text-obsidian/50">{formatBDT(item.unitPrice)} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-obsidian">{formatBDT(item.lineTotal)}</span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="bg-ivory p-3 rounded space-y-1 text-right">
                <div className="flex justify-between text-obsidian/60">
                  <span>Subtotal:</span>
                  <span>{formatBDT(activeOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-obsidian/60">
                  <span>Delivery Charge:</span>
                  <span>{formatBDT(activeOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-obsidian border-t border-black/10 pt-1">
                  <span>Total Amount (COD):</span>
                  <span className="text-champagne-dark">{formatBDT(activeOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Status Management */}
            <div className="space-y-3 border-t border-black/10 pt-4">
              <p className="font-bold uppercase tracking-wider text-[10px] text-obsidian">Update Order Workflow Status</p>
              <div className="flex flex-wrap gap-2">
                {(['Pending', 'Contacted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    disabled={isUpdating}
                    className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                      activeOrder.status === st
                        ? 'bg-obsidian text-champagne border-2 border-champagne shadow'
                        : 'bg-white border border-black/20 text-obsidian hover:bg-black/5'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2 border-t border-black/10 pt-4">
              <label className="block uppercase tracking-wider font-semibold text-[10px] text-obsidian">
                Internal Concierge Notes (Private to Admin)
              </label>
              <textarea
                rows={2}
                value={internalNoteInput}
                onChange={(e) => setInternalNoteInput(e.target.value)}
                placeholder="Log customer contact notes, courier tracking number (e.g. Steadfast / RedX ID)..."
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded p-2.5 outline-none"
              />
              <button
                onClick={handleSaveNotes}
                disabled={isUpdating}
                className="px-4 py-1.5 bg-obsidian text-champagne text-xs font-bold uppercase tracking-wider rounded hover:bg-champagne hover:text-obsidian"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
