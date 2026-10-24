import { Category, Product, StoreSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-watches',
    slug: 'watches',
    name: 'Timepieces',
    description: 'Precision engineered luxury timepieces crafted for commanding elegance.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1
  },
  {
    id: 'cat-pendants',
    slug: 'pendants',
    name: 'Pendants & Crests',
    description: 'Distinctive talismans, molten textures, and architectural symbols.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2
  },
  {
    id: 'cat-rings',
    slug: 'rings',
    name: 'Signet & Bands',
    description: 'Substantial signet rings, textured damascus bands, and onyx insets.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3
  },
  {
    id: 'cat-bracelets',
    slug: 'bracelets',
    name: 'Bracelets & Cuffs',
    description: 'Sculpted wristwear combining obsidian beads, brushed steel, and gold.',
    image: 'https://images.unsplash.com/photo-1611591475155-426c0438d4c9?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4
  },
  {
    id: 'cat-chains',
    slug: 'chains',
    name: 'Chains & Links',
    description: 'Hand-assembled Cuban links, franco chains, and bespoke wheat textures.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'RENSTONE',
  tagline: 'Timeless Style. Distinctive Details.',
  whatsappNumber: '8801322177107', // Official RENSTONE WhatsApp Concierge
  messengerUrl: 'https://www.facebook.com/profile.php?id=61594618265976',
  dhakaDeliveryFee: 80,
  outsideDhakaDeliveryFee: 150,
  freeDeliveryThreshold: 5000,
  announcementText: 'Complimentary Express Shipping on orders over ৳5,000 across Bangladesh',
  announcementEnabled: true,
  contactEmail: 'renstoneofficialbd@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61594618265976',
  contactPhone: '+880 1322-177107',
  contactAddress: 'Dhaka, Bangladesh (100% Online Exclusive Boutique)'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ren-001',
    slug: 'molten-crest-pendant-with-chain',
    name: 'Molten Crest Pendant with Box Chain',
    category: 'pendants',
    description: 'Inspired by raw molten metallurgy and architectural heritage, this standout talisman features a textured organic crest suspended from a surgical-grade Italian box chain. Finished with hand-buffed champagne gold and micro-etched beveling.',
    highlights: [
      'Raw organic molten crest texture with hand-beveled edges',
      '316L Marine-Grade Stainless Steel with 18K Champagne Gold PVD coating',
      'Resistant to sweat, water, and heat — will not tarnish or discolor skin',
      'Includes 2.5mm Italian box chain with reinforced lobster claw clasp',
      'Arrives in signature RENSTONE obsidian matte presentation box'
    ],
    price: 2450,
    compareAtPrice: 3100,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      {
        id: 'var-001-1',
        name: 'Champagne Gold / 22" Chain',
        sku: 'REN-PEN-001-GLD-22',
        stockQuantity: 18,
        attributes: { Finish: 'Champagne Gold', Length: '22 Inches' }
      },
      {
        id: 'var-001-2',
        name: 'Champagne Gold / 24" Chain',
        sku: 'REN-PEN-001-GLD-24',
        stockQuantity: 14,
        attributes: { Finish: 'Champagne Gold', Length: '24 Inches' }
      },
      {
        id: 'var-001-3',
        name: 'Raw Obsidian Silver / 22" Chain',
        sku: 'REN-PEN-001-SLV-22',
        stockQuantity: 8,
        attributes: { Finish: 'Raw Silver', Length: '22 Inches' }
      }
    ],
    stockQuantity: 40,
    isPublished: true,
    isFeatured: true,
    isNewArrival: false,
    specifications: [
      { label: 'Pendant Dimensions', value: '28mm x 19mm x 3.5mm' },
      { label: 'Base Metal', value: '316L Hypoallergenic Stainless Steel' },
      { label: 'Coating', value: '0.4μm Vacuum PVD Champagne Gold' },
      { label: 'Chain Type', value: 'Square Box Link (2.5mm width)' },
      { label: 'Clasp Mechanism', value: 'Reinforced Custom Stamped Lobster' }
    ],
    careInstructions: 'Rinse with fresh water after ocean or chlorinated pool use. Polish lightly with a microfiber cloth.',
    warranty: '2-Year Tarnish & Craftsmanship Guarantee across Bangladesh.',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'ren-002',
    slug: 'obsidian-chrono-41mm',
    name: 'The Obsidian Chrono 41mm Watch',
    category: 'watches',
    description: 'An authoritative chronograph combining a matte obsidian dial with faceted champagne gold indexes and surgical steel casing. Features sub-dials for seconds, minutes, and a stealth date aperture.',
    highlights: [
      '41mm Diamond-Polished 316L Stainless Steel Case',
      'Sapphire Crystal Glass with Dual Anti-Reflective Coating',
      'Japanese Precision Mecha-Quartz Chronograph Movement',
      'Interchangeable Quick-Release Italian Leather & Mesh Straps',
      '5 ATM / 50M Water Resistance'
    ],
    price: 6500,
    compareAtPrice: 7800,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      {
        id: 'var-002-1',
        name: 'Matte Black Dial / Obsidian Leather',
        sku: 'REN-WTC-002-BLK-LTH',
        stockQuantity: 12,
        attributes: { Dial: 'Matte Black', Strap: 'Obsidian Leather' }
      },
      {
        id: 'var-002-2',
        name: 'Matte Black Dial / Gold Steel Mesh',
        sku: 'REN-WTC-002-BLK-MSH',
        priceModifier: 400,
        stockQuantity: 9,
        attributes: { Dial: 'Matte Black', Strap: 'Gold Steel Mesh' }
      }
    ],
    stockQuantity: 21,
    isPublished: true,
    isFeatured: true,
    isNewArrival: true,
    specifications: [
      { label: 'Case Diameter', value: '41mm' },
      { label: 'Case Thickness', value: '10.8mm' },
      { label: 'Lug Width', value: '20mm' },
      { label: 'Movement', value: 'Seiko VK64 Mecha-Quartz' },
      { label: 'Water Rating', value: '5 ATM (Splash & Rain Proof)' }
    ],
    careInstructions: 'Avoid operating chronograph pushers submerged in water. Store in provided watch roll.',
    warranty: '2-Year Official Movement Warranty.',
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 'ren-003',
    slug: 'roman-numeral-signet-ring',
    name: 'Roman Numeral Heritage Signet Ring',
    category: 'rings',
    description: 'Carved with clean architectural Roman numerals honoring timeless discipline. Engineered with a comfort-fit bevel interior and satin-brushed face contrasting against polished exterior walls.',
    highlights: [
      'Substantial weight with solid core construction',
      'Comfort-fit ergonomic inner band for all-day wear',
      'Corrosion and scratch-resistant physical vapor deposition',
      'No green discoloration or allergic skin reaction'
    ],
    price: 1450,
    compareAtPrice: 1850,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-003-8', name: 'US Size 8 / Gold', sku: 'REN-RNG-003-08', stockQuantity: 6, attributes: { Size: 'US 8', Color: 'Gold' } },
      { id: 'var-003-9', name: 'US Size 9 / Gold', sku: 'REN-RNG-003-09', stockQuantity: 15, attributes: { Size: 'US 9', Color: 'Gold' } },
      { id: 'var-003-10', name: 'US Size 10 / Gold', sku: 'REN-RNG-003-10', stockQuantity: 18, attributes: { Size: 'US 10', Color: 'Gold' } },
      { id: 'var-003-11', name: 'US Size 11 / Gold', sku: 'REN-RNG-003-11', stockQuantity: 10, attributes: { Size: 'US 11', Color: 'Gold' } }
    ],
    stockQuantity: 49,
    isPublished: true,
    isFeatured: true,
    isNewArrival: false,
    specifications: [
      { label: 'Band Width', value: '14mm tapering to 6mm' },
      { label: 'Weight', value: '13.5 grams' },
      { label: 'Finish', value: 'Brushed top / Mirror polished sides' }
    ],
    careInstructions: 'Clean with warm soapy water and soft brush.',
    warranty: 'Lifetime color guarantee against greening or tarnishing.',
    createdAt: '2026-01-14T10:00:00Z'
  },
  {
    id: 'ren-004',
    slug: '5mm-cuban-curb-chain',
    name: '5mm Diamond-Cut Cuban Curb Chain',
    category: 'chains',
    description: 'The defining staple of contemporary menswear. Featuring custom flat-diamond cut edges that reflect ambient light with sharp distinction. Balanced weight with an engineered low-profile clasp.',
    highlights: [
      'Precision flat-cut links that lay completely flat against chest',
      'Heavyweight feel without neck fatigue',
      'Heat & sweat proof — wear seamlessly during workouts',
      'Secured with twin safety latches on custom box clasp'
    ],
    price: 2250,
    compareAtPrice: 2900,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-004-20', name: '20 Inch / Champagne Gold', sku: 'REN-CHN-004-20', stockQuantity: 14, attributes: { Length: '20 Inches', Color: 'Gold' } },
      { id: 'var-004-22', name: '22 Inch / Champagne Gold', sku: 'REN-CHN-004-22', stockQuantity: 20, attributes: { Length: '22 Inches', Color: 'Gold' } },
      { id: 'var-004-24', name: '24 Inch / Champagne Gold', sku: 'REN-CHN-004-24', stockQuantity: 7, attributes: { Length: '24 Inches', Color: 'Gold' } }
    ],
    stockQuantity: 41,
    isPublished: true,
    isFeatured: true,
    isNewArrival: false,
    specifications: [
      { label: 'Chain Width', value: '5.0 mm' },
      { label: 'Link Type', value: 'Solid Cuban Link' },
      { label: 'Clasp', value: 'Double Safety Folding Box Clasp' }
    ],
    careInstructions: 'Store flat when not worn to prevent tangling.',
    warranty: '2-Year Durability Guarantee.',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'ren-005',
    slug: 'obsidian-beaded-gold-bar-cuff',
    name: 'Obsidian Matte Bead & Gold Accent Cuff',
    category: 'bracelets',
    description: 'Natural volcanic obsidian beads with a velvet-matte tactile touch, anchored by a micro-machined brushed champagne gold bar engraved with the RENSTONE mark.',
    highlights: [
      'Natural volcanic matte obsidian stone spheres',
      'Industrial strength silicone elastic cord — will not loosen with wear',
      'Solid steel central bar with champagne gold PVD coat',
      'Effortless solo styling or stacked with a timepiece'
    ],
    price: 1750,
    compareAtPrice: 2200,
    images: [
      'https://images.unsplash.com/photo-1611591475155-426c0438d4c9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-005-s', name: 'Medium (17cm - 19cm Wrist)', sku: 'REN-BRC-005-M', stockQuantity: 22, attributes: { Fit: 'Medium (17-19cm)' } },
      { id: 'var-005-l', name: 'Large (19cm - 21cm Wrist)', sku: 'REN-BRC-005-L', stockQuantity: 16, attributes: { Fit: 'Large (19-21cm)' } }
    ],
    stockQuantity: 38,
    isPublished: true,
    isFeatured: false,
    isNewArrival: true,
    specifications: [
      { label: 'Bead Diameter', value: '8mm' },
      { label: 'Accent Bar', value: '316L Stainless Steel PVD' },
      { label: 'Cord', value: 'Reinforced Multi-Core Polymer' }
    ],
    careInstructions: 'Avoid overstretching cord beyond wrist size.',
    warranty: '1-Year String Integrity Guarantee.',
    createdAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 'ren-006',
    slug: 'aegis-shield-talisman',
    name: 'Aegis Shield Talisman Necklace',
    category: 'pendants',
    description: 'An emblem of invincibility. The Aegis Shield represents steadfast protection, featuring angular geometrical facets with high-contrast shadowed recesses and a diamond-cut rope chain.',
    highlights: [
      'Architectural shield silhouette with reinforced bail',
      'Includes 3mm diamond-cut rope chain (22-inch length)',
      'Waterproof, sweatproof, and resistant to tarnishing'
    ],
    price: 2200,
    compareAtPrice: 2800,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-006-1', name: 'Champagne Gold', sku: 'REN-PEN-006-GLD', stockQuantity: 15, attributes: { Color: 'Champagne Gold' } },
      { id: 'var-006-2', name: 'Obsidian Black', sku: 'REN-PEN-006-BLK', stockQuantity: 11, attributes: { Color: 'Obsidian Black' } }
    ],
    stockQuantity: 26,
    isPublished: true,
    isFeatured: false,
    isNewArrival: true,
    specifications: [
      { label: 'Pendant Height', value: '30mm' },
      { label: 'Chain Length', value: '22 Inches' },
      { label: 'Metal', value: '316L Stainless Steel' }
    ],
    careInstructions: 'Pat dry after shower or swim.',
    warranty: '2-Year Color Retention Guarantee.',
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'ren-007',
    slug: 'sovereign-onyx-inset-ring',
    name: 'Sovereign Onyx Inset Signet Ring',
    category: 'rings',
    description: 'A genuine mirror-cut black onyx stone embedded into a heavy brushed gold octagonal signet base. Minimalist, bold, and quietly formidable.',
    highlights: [
      'Natural deep black onyx stone with mirror-lapidary finish',
      'Solid non-hollow construction with comfortable rounded edges',
      'Will not turn green, fade, or irritate sensitive skin'
    ],
    price: 1850,
    compareAtPrice: 2350,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-007-8', name: 'US 8', sku: 'REN-RNG-007-08', stockQuantity: 5, attributes: { Size: 'US 8' } },
      { id: 'var-007-9', name: 'US 9', sku: 'REN-RNG-007-09', stockQuantity: 12, attributes: { Size: 'US 9' } },
      { id: 'var-007-10', name: 'US 10', sku: 'REN-RNG-007-10', stockQuantity: 14, attributes: { Size: 'US 10' } },
      { id: 'var-007-11', name: 'US 11', sku: 'REN-RNG-007-11', stockQuantity: 8, attributes: { Size: 'US 11' } }
    ],
    stockQuantity: 39,
    isPublished: true,
    isFeatured: true,
    isNewArrival: false,
    specifications: [
      { label: 'Stone', value: 'Hand-Cut Natural Black Onyx' },
      { label: 'Face Width', value: '15mm x 15mm' },
      { label: 'Weight', value: '14.2 grams' }
    ],
    careInstructions: 'Protect stone from blunt impacts against granite/concrete surfaces.',
    warranty: '2-Year Warranty against stone detachment.',
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 'ren-008',
    slug: 'byzantine-mesh-heavy-cuff',
    name: 'Byzantine Mesh Sculpted Cuff',
    category: 'bracelets',
    description: 'An intricate interlocking byzantine weave forged from cold-rolled steel strands, capped by knurled screw-lock terminals.',
    highlights: [
      'Intricate Byzantine woven steel links',
      'Substantial heft with tactile luxury feel',
      'Flexible curvature engineered to adjust comfortably to wrist size'
    ],
    price: 2150,
    compareAtPrice: 2700,
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611591475155-426c0438d4c9?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-008-g', name: 'Champagne Gold Finish', sku: 'REN-BRC-008-GLD', stockQuantity: 14, attributes: { Color: 'Gold' } },
      { id: 'var-008-s', name: 'Smoked Gunmetal Finish', sku: 'REN-BRC-008-GUN', stockQuantity: 9, attributes: { Color: 'Gunmetal' } }
    ],
    stockQuantity: 23,
    isPublished: true,
    isFeatured: false,
    isNewArrival: false,
    specifications: [
      { label: 'Thickness', value: '6mm' },
      { label: 'Circumference', value: '185mm (adjustable open cuff)' }
    ],
    careInstructions: 'Wipe with damp cloth and dry thoroughly.',
    warranty: '2-Year Structural Warranty.',
    createdAt: '2026-01-24T10:00:00Z'
  },
  {
    id: 'ren-009',
    slug: 'sovereign-steel-minimalist-watch',
    name: 'The Sovereign Steel Minimalist 39mm',
    category: 'watches',
    description: 'Understated refinement in a slim 39mm profile. Features sunburst charcoal dial, slender baton hands, and a double-milled integrated steel bracelet.',
    highlights: [
      'Ultra-thin 8.5mm profile slips smoothly under tailored cuffs',
      'Scratch-proof sapphire glass with anti-reflective coating',
      'Reliable Japanese quartz movement with 3-year battery life',
      'Butterfly deployment clasp with micro-adjustment'
    ],
    price: 5200,
    compareAtPrice: 6200,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-009-1', name: 'Charcoal Sunburst / Silver Steel', sku: 'REN-WTC-009-SLV', stockQuantity: 11, attributes: { Dial: 'Charcoal', Bracelet: 'Silver Steel' } },
      { id: 'var-009-2', name: 'Charcoal Sunburst / Two-Tone Gold', sku: 'REN-WTC-009-TTG', priceModifier: 500, stockQuantity: 7, attributes: { Dial: 'Charcoal', Bracelet: 'Two-Tone' } }
    ],
    stockQuantity: 18,
    isPublished: true,
    isFeatured: true,
    isNewArrival: false,
    specifications: [
      { label: 'Case Diameter', value: '39mm' },
      { label: 'Case Thickness', value: '8.5mm' },
      { label: 'Lug-to-Lug', value: '45mm' },
      { label: 'Glass', value: 'Synthetic Sapphire' },
      { label: 'Water Resistance', value: '3 ATM' }
    ],
    careInstructions: 'Battery replacement available via RENSTONE concierge.',
    warranty: '2-Year Movement Guarantee.',
    createdAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 'ren-010',
    slug: 'celestial-compass-pendant',
    name: 'Celestial Compass Talisman',
    category: 'pendants',
    description: 'An 8-point compass star etched with micro-grooves and centered with a faceted synthetic black diamond. Crafted for those who navigate life with purpose.',
    highlights: [
      'Detailed 8-point celestial compass geometry',
      'Set with a brilliant black cubic zirconia center',
      'Paired with a durable 2.4mm wheat chain'
    ],
    price: 2650,
    compareAtPrice: 3400,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-010-1', name: 'Champagne Gold / 22" Chain', sku: 'REN-PEN-010-GLD-22', stockQuantity: 13, attributes: { Finish: 'Gold', Length: '22"' } },
      { id: 'var-010-2', name: 'Champagne Gold / 24" Chain', sku: 'REN-PEN-010-GLD-24', stockQuantity: 8, attributes: { Finish: 'Gold', Length: '24"' } }
    ],
    stockQuantity: 21,
    isPublished: true,
    isFeatured: false,
    isNewArrival: true,
    specifications: [
      { label: 'Diameter', value: '25mm' },
      { label: 'Weight', value: '16g with chain' },
      { label: 'Chain Type', value: 'Round Wheat Link' }
    ],
    careInstructions: 'Store in dry jewelry pouch.',
    warranty: '2-Year Craftsmanship Guarantee.',
    createdAt: '2026-01-28T10:00:00Z'
  },
  {
    id: 'ren-011',
    slug: 'damascus-steel-textured-band',
    name: 'Damascus Steel Wave Texture Band',
    category: 'rings',
    description: 'Forged with distinct swirling wave striations reminiscent of ancient folded metallurgy. Etched with acid-wash depth and completed with a satin gold comfort-fit lining.',
    highlights: [
      'Swirling organic woodgrain pattern unique to every ring',
      'Rounded interior profile prevents pinching',
      'Engineered for maximum tensile durability'
    ],
    price: 1650,
    compareAtPrice: 2100,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-011-8', name: 'US 8', sku: 'REN-RNG-011-08', stockQuantity: 7, attributes: { Size: 'US 8' } },
      { id: 'var-011-9', name: 'US 9', sku: 'REN-RNG-011-09', stockQuantity: 16, attributes: { Size: 'US 9' } },
      { id: 'var-011-10', name: 'US 10', sku: 'REN-RNG-011-10', stockQuantity: 15, attributes: { Size: 'US 10' } },
      { id: 'var-011-11', name: 'US 11', sku: 'REN-RNG-011-11', stockQuantity: 9, attributes: { Size: 'US 11' } }
    ],
    stockQuantity: 47,
    isPublished: true,
    isFeatured: false,
    isNewArrival: false,
    specifications: [
      { label: 'Band Width', value: '8mm' },
      { label: 'Profile', value: 'Beveled Edge' },
      { label: 'Core', value: 'Surgical Grade 316L with Damascus Pattern' }
    ],
    careInstructions: 'Safe for daily wash and contact with skin lotions.',
    warranty: 'Lifetime color warranty.',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'ren-012',
    slug: '3mm-diamond-cut-franco-chain',
    name: '3mm Diamond-Cut Franco Chain',
    category: 'chains',
    description: 'Known for its dense, squared V-link architecture, the Franco chain resists kinks and lays gracefully. Diamond-beveled on all four corners for 360-degree glint.',
    highlights: [
      'Dense 4-sided V-weave that never kinks',
      'Clean modern alternative to traditional curb chains',
      'Can be worn solo or paired with any RENSTONE talisman'
    ],
    price: 1950,
    compareAtPrice: 2450,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85'
    ],
    variants: [
      { id: 'var-012-20', name: '20" / Champagne Gold', sku: 'REN-CHN-012-20', stockQuantity: 12, attributes: { Length: '20"', Color: 'Gold' } },
      { id: 'var-012-22', name: '22" / Champagne Gold', sku: 'REN-CHN-012-22', stockQuantity: 18, attributes: { Length: '22"', Color: 'Gold' } }
    ],
    stockQuantity: 30,
    isPublished: true,
    isFeatured: false,
    isNewArrival: true,
    specifications: [
      { label: 'Width', value: '3.0mm' },
      { label: 'Structure', value: 'Quad-Cut Franco Link' },
      { label: 'Clasp', value: 'Heavy Duty Lobster Claw' }
    ],
    careInstructions: 'Wipe down periodically with soft cotton cloth.',
    warranty: '2-Year Link Integrity Warranty.',
    createdAt: '2026-02-05T10:00:00Z'
  }
];
