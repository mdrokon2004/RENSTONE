import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Image, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductVariantOption, ProductSpecification } from '../../types';

export const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();

  const isEditMode = Boolean(id);
  const existingProduct = isEditMode ? products.find((p) => p.id === id) : null;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('watches');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(2500);
  const [compareAtPrice, setCompareAtPrice] = useState<number | undefined>(undefined);
  const [stockQuantity, setStockQuantity] = useState<number>(20);
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(false);

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [highlights, setHighlights] = useState<string[]>([
    'Forged from surgical-grade 316L stainless steel',
    'Finished with 18K champagne gold vacuum PVD coating',
    'Resistant to sweat, water, and corrosion'
  ]);
  const [newHighlight, setNewHighlight] = useState('');

  const [variants, setVariants] = useState<ProductVariantOption[]>([]);
  const [specifications, setSpecifications] = useState<ProductSpecification[]>([
    { label: 'Base Metal', value: '316L Stainless Steel' },
    { label: 'Coating', value: 'Vacuum PVD Champagne Gold' }
  ]);

  const [careInstructions, setCareInstructions] = useState('');
  const [warranty, setWarranty] = useState('2-Year Craftsmanship Guarantee across Bangladesh.');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setSlug(existingProduct.slug);
      setCategory(existingProduct.category);
      setDescription(existingProduct.description);
      setPrice(existingProduct.price);
      setCompareAtPrice(existingProduct.compareAtPrice);
      setStockQuantity(existingProduct.stockQuantity);
      setIsPublished(existingProduct.isPublished);
      setIsFeatured(existingProduct.isFeatured);
      setIsNewArrival(existingProduct.isNewArrival);
      setImages(existingProduct.images || []);
      setHighlights(existingProduct.highlights || []);
      setVariants(existingProduct.variants || []);
      setSpecifications(existingProduct.specifications || []);
      setCareInstructions(existingProduct.careInstructions || '');
      setWarranty(existingProduct.warranty || '');
    }
  }, [existingProduct]);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights(highlights.filter((_, idx) => idx !== index));
  };

  const handleAddVariant = () => {
    const newVar: ProductVariantOption = {
      id: 'var-' + Date.now().toString(36),
      name: 'Option ' + (variants.length + 1),
      sku: `REN-${category.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      stockQuantity: 10,
      attributes: {}
    };
    setVariants([...variants, newVar]);
  };

  const handleAddSpec = () => {
    setSpecifications([...specifications, { label: 'New Spec', value: 'Value' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);

    const generatedSlug = slug.trim() 
      ? slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const productPayload = {
      name: name.trim(),
      slug: generatedSlug,
      category,
      description: description.trim(),
      highlights,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      stockQuantity: Number(stockQuantity),
      isPublished,
      isFeatured,
      isNewArrival,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'],
      variants,
      specifications,
      careInstructions: careInstructions.trim() || undefined,
      warranty: warranty.trim() || undefined
    };

    if (isEditMode && id) {
      await updateProduct(id, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setIsSaving(false);
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/products"
          className="text-xs uppercase tracking-wider font-semibold text-obsidian/60 hover:text-obsidian flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <h1 className="font-display text-xl font-bold uppercase tracking-wider text-obsidian">
          {isEditMode ? 'Edit Vault Piece' : 'Create New Vault Piece'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Core Details */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2">
            1. Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!isEditMode) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                }}
                placeholder="e.g. Molten Crest Pendant"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="molten-crest-pendant"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Stock Units *</label>
              <input
                type="number"
                required
                min="0"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1">Editorial Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Craftsmanship, metallurgy, design inspiration..."
              className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
            />
          </div>
        </div>

        {/* Pricing & Flags */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2">
            2. Pricing & Visibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Price (BDT ৳) *</label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1">Compare-At Price (Optional BDT ৳)</label>
              <input
                type="number"
                min="0"
                value={compareAtPrice || ''}
                onChange={(e) => setCompareAtPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Leave blank if no discount"
                className="w-full bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="accent-champagne"
              />
              <span className="font-semibold">Published on Live Store</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-champagne"
              />
              <span className="font-semibold">Bestseller / Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="accent-champagne"
              />
              <span className="font-semibold">New Arrival Badge</span>
            </label>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian border-b border-black/10 pb-2">
            3. Photography & Media
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded overflow-hidden border border-black/10 bg-ivory group">
                <img src={img} alt="Product view" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Enter public Image URL (Unsplash, Supabase Storage, CDN)..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 bg-ivory border border-black/15 focus:border-champagne rounded px-3 py-2 outline-none"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-obsidian text-champagne text-xs font-semibold rounded hover:bg-champagne hover:text-obsidian"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white p-6 rounded-lg border border-black/10 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-black/10 pb-2">
            <h3 className="font-bold uppercase tracking-wider text-sm text-obsidian">
              4. Product Variants (Sizes, Finishes, Lengths)
            </h3>
            <button
              type="button"
              onClick={handleAddVariant}
              className="text-xs font-semibold text-champagne-dark hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant</span>
            </button>
          </div>

          {variants.length === 0 ? (
            <p className="text-xs text-obsidian/50 italic">No variants configured. Product sells as a single standard item.</p>
          ) : (
            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div key={v.id || idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-ivory p-3 rounded border border-black/10">
                  <input
                    type="text"
                    placeholder="Option Name (e.g. US 10 / Gold)"
                    value={v.name}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[idx].name = e.target.value;
                      setVariants(updated);
                    }}
                    className="bg-white border border-black/15 rounded px-2.5 py-1.5 text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="SKU"
                    value={v.sku}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[idx].sku = e.target.value;
                      setVariants(updated);
                    }}
                    className="bg-white border border-black/15 rounded px-2.5 py-1.5 text-xs outline-none font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={v.stockQuantity}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[idx].stockQuantity = Number(e.target.value);
                      setVariants(updated);
                    }}
                    className="bg-white border border-black/15 rounded px-2.5 py-1.5 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setVariants(variants.filter((_, i) => i !== idx))}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end gap-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 border border-black/20 text-xs uppercase tracking-wider font-bold rounded hover:bg-black/5"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-obsidian text-champagne hover:bg-champagne hover:text-obsidian font-display uppercase tracking-widest text-xs font-bold rounded shadow-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Product to Vault'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
