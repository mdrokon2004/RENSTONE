import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, ShoppingCart, DollarSign, AlertTriangle, ArrowRight, 
  Plus, CheckCircle2, Clock, Truck 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../lib/formatters';

export const AdminDashboard: React.FC = () => {
  const { products, orders, settings } = useStore();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const lowStockProducts = products.filter(p => p.stockQuantity <= 5 && p.isPublished);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-obsidian">
            Store Performance Overview
          </h1>
          <p className="text-xs text-obsidian/60 mt-1">
            Real-time catalog analytics and customer order verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-obsidian text-champagne text-xs font-semibold uppercase tracking-wider rounded hover:bg-champagne hover:text-obsidian transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-white p-5 rounded-lg border border-black/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-obsidian/50 text-xs uppercase font-semibold">
            <span>Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-champagne-dark" />
          </div>
          <p className="text-2xl font-bold text-obsidian">{totalOrders}</p>
          <p className="text-[11px] text-amber-700 font-medium">
            {pendingOrders} awaiting customer contact
          </p>
        </div>

        {/* Estimated Revenue */}
        <div className="bg-white p-5 rounded-lg border border-black/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-obsidian/50 text-xs uppercase font-semibold">
            <span>Recorded Volume</span>
            <DollarSign className="w-4 h-4 text-champagne-dark" />
          </div>
          <p className="text-2xl font-bold text-obsidian">{formatBDT(totalRevenue)}</p>
          <p className="text-[11px] text-obsidian/50">Across all orders</p>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-lg border border-black/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-obsidian/50 text-xs uppercase font-semibold">
            <span>Vault Inventory</span>
            <Package className="w-4 h-4 text-champagne-dark" />
          </div>
          <p className="text-2xl font-bold text-obsidian">{products.length}</p>
          <p className="text-[11px] text-green-700 font-medium">
            {products.filter(p => p.isPublished).length} pieces published live
          </p>
        </div>

        {/* Inventory Warning */}
        <div className="bg-white p-5 rounded-lg border border-black/10 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-obsidian/50 text-xs uppercase font-semibold">
            <span>Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-obsidian">{lowStockProducts.length}</p>
          <p className="text-[11px] text-red-600 font-medium">
            {lowStockProducts.length > 0 ? 'Requires restocking' : 'Optimal inventory levels'}
          </p>
        </div>
      </div>

      {/* Recent Orders & Low Stock Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-black/10 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <h3 className="font-display uppercase tracking-wider text-sm font-bold text-obsidian">
              Recent Customer Order Requests
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs uppercase tracking-wider font-semibold text-champagne-dark hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-8 text-center text-xs text-obsidian/50">
              No orders submitted yet. Visit the storefront and place a test order request!
            </div>
          ) : (
            <div className="divide-y divide-black/10 overflow-x-auto">
              {recentOrders.map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between text-xs gap-4 min-w-[500px]">
                  <div>
                    <span className="font-mono font-bold text-obsidian">{order.orderReference}</span>
                    <p className="text-obsidian/60 text-[11px] mt-0.5">
                      {order.customerName} • {order.customerPhone} ({order.district})
                    </p>
                  </div>

                  <span className="font-semibold text-obsidian">
                    {formatBDT(order.total)}
                  </span>

                  <div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <Link
                    to="/admin/orders"
                    className="text-xs text-champagne-dark font-semibold hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg border border-black/10 p-5 shadow-sm space-y-4">
          <div className="border-b border-black/10 pb-3">
            <h3 className="font-display uppercase tracking-wider text-sm font-bold text-obsidian">
              Inventory Attention
            </h3>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-obsidian/50">
              All published pieces have healthy inventory.
            </div>
          ) : (
            <div className="divide-y divide-black/10">
              {lowStockProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-obsidian truncate">{p.name}</p>
                    <p className="text-[11px] text-obsidian/50 capitalize">{p.category}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold flex-shrink-0">
                    {p.stockQuantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
