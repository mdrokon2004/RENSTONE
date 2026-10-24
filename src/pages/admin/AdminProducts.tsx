import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Copy, Eye, Check, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../lib/formatters';

export const AdminProducts: React.FC = () => {
  const { products, togglePublish, deleteProduct, duplicateProduct } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (search.trim() && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.slug.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-obsidian">
            Vault Products ({products.length})
          </h1>
          <p className="text-xs text-obsidian/60 mt-0.5">
            Manage your catalog, prices, images, stock, and variations.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-obsidian text-champagne text-xs uppercase tracking-wider font-bold rounded shadow hover:bg-champagne hover:text-obsidian transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded border border-black/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-obsidian/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ivory rounded pl-9 pr-3 py-1.5 text-xs text-obsidian outline-none border border-black/10 focus:border-champagne"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="bg-ivory border border-black/10 rounded px-3 py-1.5 text-xs text-obsidian outline-none focus:border-champagne"
        >
          <option value="all">All Categories</option>
          <option value="watches">Watches</option>
          <option value="pendants">Pendants</option>
          <option value="rings">Rings</option>
          <option value="bracelets">Bracelets</option>
          <option value="chains">Chains</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded border border-black/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F6F2] border-b border-black/10 text-obsidian/60 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-obsidian/50 text-xs">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-black/[0.02] transition-colors">
                    {/* Item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded border border-black/10 bg-ivory flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-semibold text-obsidian truncate">{prod.name}</p>
                          <p className="text-[10px] text-obsidian/50 truncate font-mono">{prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 capitalize text-obsidian/70">
                      {prod.category}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-semibold text-obsidian">
                      {formatBDT(prod.price)}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prod.stockQuantity <= 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {prod.stockQuantity} in stock
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => togglePublish(prod.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          prod.isPublished
                            ? 'bg-obsidian text-champagne'
                            : 'bg-black/10 text-obsidian/60'
                        }`}
                      >
                        {prod.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/products/${prod.slug}`}
                          target="_blank"
                          className="p-1.5 text-obsidian/50 hover:text-champagne transition-colors"
                          title="View on Live Store"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          to={`/admin/products/${prod.id}/edit`}
                          className="p-1.5 text-obsidian/50 hover:text-obsidian transition-colors"
                          title="Edit Piece"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => duplicateProduct(prod.id)}
                          className="p-1.5 text-obsidian/50 hover:text-obsidian transition-colors"
                          title="Duplicate Piece"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(prod.id)}
                          className="p-1.5 text-black/30 hover:text-red-600 transition-colors"
                          title="Delete Piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="font-bold text-base text-obsidian">Confirm Deletion</h3>
            <p className="text-xs text-obsidian/70">
              Are you sure you want to remove this piece from the vault? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-black/20 text-xs rounded font-semibold text-obsidian hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white text-xs rounded font-semibold hover:bg-red-700"
              >
                Delete Piece
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
