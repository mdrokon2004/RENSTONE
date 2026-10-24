import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleEdit = (cat: Category) => {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
  };

  const handleReset = () => {
    setEditingCat(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const catSlug = slug.trim() ? slug.trim().toLowerCase() : name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingCat) {
      await updateCategory(editingCat.id, {
        name: name.trim(),
        slug: catSlug,
        description: description.trim(),
        image: image.trim()
      });
    } else {
      await addCategory({
        name: name.trim(),
        slug: catSlug,
        description: description.trim(),
        image: image.trim() || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
      });
    }

    handleReset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-obsidian">
          Collection Categories
        </h1>
        <p className="text-xs text-obsidian/60 mt-0.5">
          Organize timepieces, crests, rings, and wristwear collections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Form */}
        <div className="bg-white p-6 rounded-lg border border-black/10 shadow-sm space-y-4">
          <h3 className="font-bold uppercase tracking-wider text-xs text-obsidian border-b border-black/10 pb-2">
            {editingCat ? 'Edit Category' : 'Create Category'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingCat) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                }}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none font-mono"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Banner Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div className="pt-2 flex gap-2">
              {editingCat && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 border rounded text-xs font-semibold"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-2.5 bg-obsidian text-champagne hover:bg-champagne hover:text-obsidian text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                {editingCat ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-black/10 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-black/10 bg-[#F8F6F2]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-obsidian">
              Active Store Categories ({categories.length})
            </h3>
          </div>

          <div className="divide-y divide-black/10">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-12 h-12 rounded object-cover border border-black/10"
                  />
                  <div>
                    <h4 className="font-bold text-obsidian text-sm">{cat.name}</h4>
                    <p className="text-[11px] font-mono text-obsidian/50">/{cat.slug}</p>
                    <p className="text-[11px] text-obsidian/70 line-clamp-1">{cat.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 text-obsidian/50 hover:text-obsidian"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1.5 text-black/30 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
