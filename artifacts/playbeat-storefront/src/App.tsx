import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight,
  CreditCard, Gift, Gamepad2, Globe2, Heart, Headphones, LockKeyhole, Menu,
  Minus, Monitor, Plus, Search, ShieldCheck, ShoppingBag, SlidersHorizontal,
  Sparkles, Star, Trash2, Zap,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { catalog, categories, formatPKR, type Product } from './catalog';

type CartLine = { id: string; quantity: number };
const CART_KEY = 'playbeat-cart-v1';
const WISHLIST_KEY = 'playbeat-wishlist-v1';

function readStored<T,>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function Storefront() {
  const [cart, setCart] = useState<CartLine[]>(() => readStored(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStored(WISHLIST_KEY, []));
  const [location, setLocation] = useLocation();
  const [searchText, setSearchText] = useState('');
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (id: string) => setCart((old) => {
    const found = old.find((line) => line.id === id);
    return found ? old.map((line) => line.id === id ? { ...line, quantity: line.quantity + 1 } : line) : [...old, { id, quantity: 1 }];
  });
  const setQuantity = (id: string, quantity: number) => setCart((old) => quantity < 1 ? old.filter((line) => line.id !== id) : old.map((line) => line.id === id ? { ...line, quantity } : line));
  const removeFromCart = (id: string) => setCart((old) => old.filter((line) => line.id !== id));
  const toggleWishlist = (id: string) => setWishlist((old) => old.includes(id) ? old.filter((item) => item !== id) : [...old, id]);
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchText.trim();
    setLocation(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <div className="app-shell">
      <div className="utility">
        <span><Zap size={12} /> <b>Digital products</b> · indicative delivery</span>
        <span><CreditCard size={12} /> <b>PKR pricing</b> · catalog preview</span>
        <span><Headphones size={12} /> Product details shown clearly</span>
      </div>
      <header className="site-header">
        <div className="wrap">
          <div className="header-main">
            <button className="mobile-menu" aria-label="Browse products" data-testid="button-mobile-menu" onClick={() => setLocation('/products')}><Menu size={20} /></button>
            <Link href="/" className="brand" data-testid="link-brand-home">
              <span className="brand-mark">PB</span>
              <span className="brand-name">playbeat<small>DIGITAL</small></span>
            </Link>
            <form className="search-box" onSubmit={submitSearch} role="search">
              <Search size={16} />
              <input aria-label="Search catalog" data-testid="input-search" placeholder="Search subscriptions, gift cards, software..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            </form>
            <div className="header-actions">
              <Link href="/products?wishlist=1" className="header-action" data-testid="link-wishlist"><Heart size={17} /><span>Saved</span>{wishlist.length > 0 && <b className="action-count">{wishlist.length}</b>}</Link>
              <Link href="/cart" className="header-action" data-testid="link-cart"><ShoppingBag size={17} /><span>Cart</span>{cartCount > 0 && <b className="action-count">{cartCount}</b>}</Link>
            </div>
          </div>
          <nav className="nav-row" aria-label="Main navigation">
            <Link href="/" className={location === '/' ? 'active' : ''} data-testid="link-nav-home">Home</Link>
            {categories.filter((category) => catalog.some((product) => product.category === category.name)).slice(0, 8).map((category) => (
              <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`} data-testid={`link-category-${slugify(category.name)}`}>{category.title}</Link>
            ))}
            <Link href="/products" data-testid="link-all-products">All products <ArrowUpRight size={11} /></Link>
          </nav>
        </div>
      </header>
      <main className="wrap">
        <Switch>
          <Route path="/" component={() => <Home addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/products" component={() => <ProductsPage wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
          <Route path="/product/:slug" component={() => <ProductPage addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route path="/cart" component={() => <CartPage cart={cart} setQuantity={setQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" component={() => <CheckoutPage cart={cart} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link href="/" className={location === '/' ? 'active' : ''} data-testid="mobile-home"><Monitor size={16} />Home</Link>
        <Link href="/products" data-testid="mobile-products"><Search size={16} />Browse</Link>
        <Link href="/products?wishlist=1" data-testid="mobile-wishlist"><Heart size={16} />Saved</Link>
        <Link href="/cart" data-testid="mobile-cart"><ShoppingBag size={16} />Cart{cartCount > 0 ? ` · ${cartCount}` : ''}</Link>
      </nav>
    </div>
  );
}

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function Home({ addToCart, wishlist, toggleWishlist }: { addToCart: (id: string) => void; wishlist: string[]; toggleWishlist: (id: string) => void }) {
  const [, setLocation] = useLocation();
  const goCategory = (category: string) => setLocation(`/products?category=${encodeURIComponent(category)}`);
  return <>
    <section className="hero" data-testid="section-home-hero">
      <div className="hero-copy">
        <div className="eyebrow">The considered digital shop</div>
        <h1>Everything digital.<br /><span>One clear place.</span></h1>
        <p>Subscriptions, creative tools, gift cards and smart devices — brought together with transparent PKR pricing and the details you need to choose well.</p>
        <div className="hero-buttons">
          <Link href="/products" className="btn btn-primary" data-testid="button-shop-now">Explore the collection <ArrowRight size={14} /></Link>
          <a href="#categories" className="btn btn-ghost" data-testid="link-explore-categories">Browse categories <ChevronDown size={14} /></a>
        </div>
        <div className="hero-note"><ShieldCheck size={14} /> Prices from the supplied catalog · payments not connected</div>
      </div>
      <div className="hero-art" aria-label="PlayBeat curated digital products artwork">
        <div className="hero-orbit" />
        <div className="hero-product"><div className="hero-product-logo">PB<small>DIGITAL PICKS</small></div></div>
        <div className="floating-chip chip-top"><span className="chip-dot" />Subscriptions, made clear</div>
        <div className="floating-chip chip-bottom">PKR <strong>·</strong> Digital &amp; devices</div>
      </div>
    </section>

    <section className="section" id="categories">
      <div className="section-head">
        <div><div className="section-kicker">Find your next essential</div><h2 className="section-title">Shop by category</h2><p className="section-sub">A wide world of services, thoughtfully sorted.</p></div>
        <Link href="/products" className="text-link" data-testid="link-category-view-all">All categories <ArrowRight size={13} /></Link>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => {
          const Icons = [Sparkles, Monitor, Gift, Gamepad2, Globe2, ShieldCheck, Monitor, Monitor, ArrowUpRight];
          const Icon = Icons[index] ?? Sparkles;
          const hasListings = catalog.some((product) => product.category === category.name);
          return <button className={`category-tile${hasListings ? '' : ' is-empty'}`} key={category.name} disabled={!hasListings} data-testid={`tile-category-${slugify(category.name)}`} onClick={() => goCategory(category.name)}>
            <Icon size={17} className="category-icon" />
            <div><strong>{category.title}</strong><span>{hasListings ? category.note : 'Listings coming soon'}</span></div>
          </button>;
        })}
      </div>
    </section>

    <section className="section">
      <div className="section-head">
        <div><div className="section-kicker">A good place to start</div><h2 className="section-title">Picked for you</h2><p className="section-sub">A handpicked edit from the supplied PlayBeat catalog.</p></div>
        <Link href="/products" className="text-link" data-testid="link-trending-all">View all products <ArrowRight size={13} /></Link>
      </div>
      <div className="product-grid">
        {['chatgpt-go-plan-1-year', 'netflix-1-month', 'capcut-pro', 'hcs350pro-smart-projector'].map((slug) => {
          const product = catalog.find((item) => item.slug === slug)!;
          return <ProductCard key={product.id} product={product} addToCart={addToCart} isSaved={wishlist.includes(product.id)} toggleWishlist={toggleWishlist} />;
        })}
      </div>
      <p className="disclaimer" style={{ marginTop: 13 }}>Prices reflect the supplied catalog. Confirm product terms and availability before ordering.</p>
    </section>

    <section className="section">
      <div className="banner-row">
        <article className="feature-banner">
          <div className="section-kicker">A bigger screen, a smaller footprint</div>
          <h3>Smart projectors, considered for your space.</h3>
          <p>Explore a featured HCS350PRO projector. Product specifications and delivery details can be confirmed before ordering.</p>
          <Link href="/product/hcs350pro-smart-projector" className="text-link" data-testid="link-projector-feature">View HCS350PRO <ArrowRight size={13} /></Link>
          <div className="projector-art" aria-hidden="true" />
        </article>
        <article className="gift-strip">
          <div className="section-kicker">Send a little play</div>
          <div className="gift-title">Gift cards, good choices.</div>
          <p>Find PlayStation and Xbox gift card listings, with region notes shown on each product.</p>
          <div className="gift-brands"><span>PlayStation</span><span>Xbox</span><span>Digital codes</span></div>
          <Link href="/products?category=Gift%20Cards" className="text-link" style={{ marginTop: 15 }} data-testid="link-gift-cards">Explore gift cards <ArrowRight size={13} /></Link>
        </article>
      </div>
    </section>

    <section className="section">
      <div className="section-head"><div><div className="section-kicker">Clarity at every step</div><h2 className="section-title">A shop built around the details</h2></div></div>
      <div className="trust-row">
        <TrustItem icon={<Check size={17} />} title="Clear product information" text="Plan, term and region notes where provided." />
        <TrustItem icon={<CreditCard size={17} />} title="PKR-first catalog" text="Prices presented in Pakistani rupees." />
        <TrustItem icon={<Headphones size={17} />} title="Product notes up front" text="Plan, model and region notes where the catalog provides them." />
        <TrustItem icon={<LockKeyhole size={17} />} title="No surprise checkout" text="Payment is not connected in this first release." />
      </div>
    </section>
    <div className="disclaimer" data-testid="status-price-disclaimer" style={{ padding: '0 0 36px' }}>PlayBeat Digital catalog preview. Prices reflect the supplied listings; product terms, availability and delivery details need confirmation. Checkout is not connected to a payment service.</div>
  </>;
}

function TrustItem({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="trust-item"><div className="trust-icon">{icon}</div><div><strong>{title}</strong><span>{text}</span></div></div>;
}

function ProductCard({ product, addToCart, isSaved, toggleWishlist }: { product: Product; addToCart: (id: string) => void; isSaved: boolean; toggleWishlist: (id: string) => void }) {
  const [, setLocation] = useLocation();
  return <article className="product-card" data-testid={`card-product-${product.id}`}>
    <div className="product-art" role="link" tabIndex={0} aria-label={`View ${product.name}`} data-testid={`link-product-${product.id}`} onClick={() => setLocation(`/product/${product.slug}`)} onKeyDown={(event) => event.key === 'Enter' && setLocation(`/product/${product.slug}`)}>
      <span className="art-meta">{product.category}</span>
      <div className={`art-logo ${artClass(product)}`}>{product.artwork}</div>
      {product.badge && <span className="product-badge">{product.badge}</span>}
    </div>
    <button className={`wishlist ${isSaved ? 'is-saved' : ''}`} aria-label={isSaved ? 'Remove from saved' : 'Save product'} data-testid={`button-wishlist-${product.id}`} onClick={() => toggleWishlist(product.id)}><Heart size={14} fill={isSaved ? 'currentColor' : 'none'} /></button>
    <div className="product-info">
      <div className="product-brand">{product.brand}</div>
      <div className="product-name" role="link" tabIndex={0} data-testid={`text-product-name-${product.id}`} onClick={() => setLocation(`/product/${product.slug}`)} onKeyDown={(event) => event.key === 'Enter' && setLocation(`/product/${product.slug}`)}>{product.name}</div>
      {product.reviewCount > 0 && <div className="rating-row"><Star size={11} fill="currentColor" /> {product.rating.toFixed(1)} <span>({product.reviewCount} catalog ratings)</span></div>}
      <div className="product-bottom">
        <div className="price" data-testid={`text-price-${product.id}`}>{formatPKR(product.pricePKR)}{product.originalPricePKR && <del>{formatPKR(product.originalPricePKR)}</del>}</div>
        <button className="add-icon" title="Add to cart" aria-label={`Add ${product.name} to cart`} data-testid={`button-add-${product.id}`} onClick={() => addToCart(product.id)}><Plus size={16} /></button>
      </div>
    </div>
  </article>;
}

function artClass(product: Product) {
  if (product.type === 'physical') return 'wide blue';
  if (product.category === 'Gift Cards') return 'gold';
  if (product.category === 'Streaming') return product.brand === 'Netflix' ? 'orange' : 'dark';
  if (product.category === 'AI & Productivity') return 'blue';
  if (product.category === 'VPN & Security') return 'dark';
  return '';
}

function ProductsPage({ wishlist, toggleWishlist, addToCart }: { wishlist: string[]; toggleWishlist: (id: string) => void; addToCart: (id: string) => void }) {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] ?? '');
  const initialCategory = params.get('category') ?? 'All';
  const query = params.get('q') ?? '';
  const onlyWishlist = params.get('wishlist') === '1';
  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState(query);
  useEffect(() => {
    const next = new URLSearchParams(location.split('?')[1] ?? '');
    setCategory(next.get('category') ?? 'All');
    setSearch(next.get('q') ?? '');
  }, [location]);
  const filtered = useMemo(() => {
    const lower = search.trim().toLowerCase();
    let list = catalog.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesType = type === 'All' || product.type === type.toLowerCase();
      const matchesQuery = !lower || [product.name, product.brand, product.category, product.shortDescription].join(' ').toLowerCase().includes(lower);
      const matchesWishlist = !onlyWishlist || wishlist.includes(product.id);
      return matchesCategory && matchesType && matchesQuery && matchesWishlist;
    });
    if (sort === 'price-low') list = [...list].sort((a, b) => a.pricePKR - b.pricePKR);
    if (sort === 'price-high') list = [...list].sort((a, b) => b.pricePKR - a.pricePKR);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, type, search, onlyWishlist, wishlist, sort]);

  const changeCategory = (value: string) => {
    setCategory(value);
    const next = new URLSearchParams(location.split('?')[1] ?? '');
    if (value === 'All') next.delete('category'); else next.set('category', value);
    setLocation(`/products${next.toString() ? `?${next.toString()}` : ''}`);
  };
  const resetFilters = () => { setCategory('All'); setType('All'); setSearch(''); setLocation('/products'); };
  return <>
    <div className="page-head">
      <div className="breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link><ChevronRight size={11} /> Browse</div>
      <h1 className="page-title">{onlyWishlist ? 'Your saved picks' : category === 'All' ? 'The collection' : category}</h1>
      <p className="page-lead">Browse the supplied catalog of digital subscriptions, services and smart devices.</p>
    </div>
    <div className="catalog-layout">
      <aside className="filter-panel">
        <div className="filter-title"><span><SlidersHorizontal size={13} style={{ verticalAlign: 'middle', marginRight: 7 }} /> Refine</span><button className="remove-btn" style={{ margin: 0 }} data-testid="button-clear-filters" onClick={resetFilters}>Clear</button></div>
        <div className="filter-group"><h4>Category</h4>
          <label className="filter-option"><input type="radio" name="category" checked={category === 'All'} onChange={() => changeCategory('All')} data-testid="filter-category-all" />All products</label>
          {categories.map((item) => <label className="filter-option" key={item.name}><input type="radio" name="category" checked={category === item.name} onChange={() => changeCategory(item.name)} data-testid={`filter-category-${slugify(item.name)}`} />{item.title}</label>)}
        </div>
        <div className="filter-group"><h4>Product type</h4>
          {['All', 'Digital', 'Physical', 'Service'].map((item) => <label className="filter-option" key={item}><input type="radio" name="type" checked={type === item} onChange={() => setType(item)} data-testid={`filter-type-${item.toLowerCase()}`} />{item}</label>)}
        </div>
      </aside>
      <div>
        <div className="catalog-toolbar">
          <div className="results-count" data-testid="text-results-count">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}{onlyWishlist ? ' saved' : ''}</div>
          <input className="inline-search" aria-label="Search products" placeholder="Search this collection..." value={search} data-testid="input-catalog-search" onChange={(event) => {
            const value = event.target.value; setSearch(value);
            const next = new URLSearchParams(location.split('?')[1] ?? '');
            value ? next.set('q', value) : next.delete('q');
            setLocation(`/products${next.toString() ? `?${next.toString()}` : ''}`);
          }} />
          <select className="sort-select" aria-label="Sort products" value={sort} data-testid="select-sort-products" onChange={(event) => setSort(event.target.value)}>
             <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option>
          </select>
        </div>
        {filtered.length > 0 ? <div className="catalog-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} isSaved={wishlist.includes(product.id)} toggleWishlist={toggleWishlist} />)}</div> :
          <div className="empty-state" data-testid="status-products-empty"><Search size={23} /><h3>No matches in this edit</h3><p>Try another search or clear a filter to see more of the catalog.</p><button className="btn btn-ghost" data-testid="button-reset-catalog" onClick={resetFilters}>Clear filters</button></div>}
        <p className="disclaimer" style={{ marginTop: 17 }}>Sample catalog pricing from the supplied list. Product terms and availability are not guaranteed; please confirm details before purchase.</p>
      </div>
    </div>
  </>;
}

function ProductPage({ addToCart, wishlist, toggleWishlist }: { addToCart: (id: string) => void; wishlist: string[]; toggleWishlist: (id: string) => void }) {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const product = catalog.find((item) => item.slug === params.slug);
  if (!product) return <NotFoundPage />;
  const saved = wishlist.includes(product.id);
  return <>
    <div className="page-head"><div className="breadcrumbs"><Link href="/" data-testid="link-detail-home">Home</Link><ChevronRight size={11} /><Link href={`/products?category=${encodeURIComponent(product.category)}`} data-testid="link-detail-category">{product.category}</Link><ChevronRight size={11} /><span>{product.name}</span></div></div>
    <div className="detail-grid">
      <div className="detail-art" data-testid={`img-product-art-${product.id}`}>
        <span className="art-meta">{product.category}</span>
        <div className={`art-logo ${artClass(product)}`}>{product.artwork}</div>
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
      <div className="detail-copy">
        <div className="detail-brand">{product.brand} · {product.type}</div>
        <h1 className="detail-name" data-testid="text-product-title">{product.name}</h1>
        {product.reviewCount > 0 && <div className="rating-row"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)} <span>· {product.reviewCount} catalog ratings</span></div>}
        <p className="detail-description">{product.shortDescription}</p>
        <div className="detail-price" data-testid="text-detail-price">{formatPKR(product.pricePKR)} {product.originalPricePKR && <del>{formatPKR(product.originalPricePKR)}</del>}</div>
        <div className="sample-note">Price from the supplied listing. Confirm the plan, region, delivery and availability before ordering.</div>
        <div className="detail-actions">
          <button className="btn btn-primary" data-testid="button-detail-add-cart" onClick={() => { addToCart(product.id); setLocation('/cart'); }}>Add to cart <ShoppingBag size={14} /></button>
          <button className="btn btn-ghost" data-testid="button-detail-wishlist" onClick={() => toggleWishlist(product.id)}><Heart size={14} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save'}</button>
        </div>
        <div className="spec-list">
          {product.features.map((feature, index) => <div className="spec-row" key={feature} data-testid={`text-feature-${product.id}-${index}`}><Check size={13} />{feature}</div>)}
          {product.region && <div className="spec-row"><Globe2 size={13} />{product.region}</div>}
          <div className="spec-row"><Zap size={13} />{product.deliveryEstimate}</div>
        </div>
        <div className="product-meta"><span>Category: {product.category}</span><span>Currency: PKR</span></div>
      </div>
    </div>
  </>;
}

function CartPage({ cart, setQuantity, removeFromCart }: { cart: CartLine[]; setQuantity: (id: string, quantity: number) => void; removeFromCart: (id: string) => void }) {
  const lines = cart.map((line) => ({ ...line, product: catalog.find((product) => product.id === line.id) })).filter((line): line is CartLine & { product: Product } => Boolean(line.product));
  const total = lines.reduce((sum, line) => sum + line.product.pricePKR * line.quantity, 0);
  return <>
    <div className="page-head"><div className="breadcrumbs"><Link href="/" data-testid="link-cart-home">Home</Link><ChevronRight size={11} /> Cart</div><h1 className="page-title">Your cart</h1><p className="page-lead">Review your picks before the payment boundary.</p></div>
    {lines.length === 0 ? <div className="empty-state" data-testid="status-cart-empty"><ShoppingBag size={25} /><h3>Your cart has room to play</h3><p>Explore the catalog and add something that suits you. Saved products are kept separately.</p><Link href="/products" className="btn btn-primary" data-testid="button-cart-browse">Browse the collection <ArrowRight size={14} /></Link></div> :
      <div className="cart-layout">
        <div className="cart-list">{lines.map(({ product, quantity }) => <article className="cart-line" key={product.id} data-testid={`row-cart-${product.id}`}>
          <Link href={`/product/${product.slug}`} className="cart-thumb" data-testid={`link-cart-product-${product.id}`}><div className={`art-logo ${artClass(product)}`}>{product.artwork}</div></Link>
          <div><Link href={`/product/${product.slug}`} data-testid={`text-cart-name-${product.id}`}><h3>{product.name}</h3></Link><p>{product.brand} · {product.category}</p>
            <div className="qty-controls"><button aria-label="Decrease quantity" data-testid={`button-quantity-minus-${product.id}`} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={12} /></button><span data-testid={`text-quantity-${product.id}`}>{quantity}</span><button aria-label="Increase quantity" data-testid={`button-quantity-plus-${product.id}`} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={12} /></button></div>
          </div>
          <div className="cart-price">{formatPKR(product.pricePKR * quantity)}<br /><button className="remove-btn" aria-label={`Remove ${product.name}`} data-testid={`button-remove-${product.id}`} onClick={() => removeFromCart(product.id)}><Trash2 size={14} /></button></div>
        </article>)}</div>
        <aside className="summary-card">
          <h3>Order summary</h3><div className="summary-line"><span>Items ({lines.reduce((sum, line) => sum + line.quantity, 0)})</span><span>{formatPKR(total)}</span></div>
          <div className="summary-line"><span>Delivery &amp; fees</span><span>Confirmed later</span></div>
          <div className="summary-line total"><span>Listed subtotal</span><span data-testid="text-cart-total">{formatPKR(total)}</span></div>
          <p className="disclaimer">Subtotal uses listed catalog prices. Delivery details and final terms have not been confirmed.</p>
          <Link href="/checkout" className="btn btn-primary" data-testid="button-proceed-checkout">Continue to checkout <ArrowRight size={14} /></Link>
          <Link href="/products" className="text-link" style={{ justifyContent: 'center', width: '100%', marginTop: 14 }} data-testid="link-continue-shopping"><ArrowLeft size={13} /> Keep browsing</Link>
        </aside>
      </div>}
  </>;
}

function CheckoutPage({ cart }: { cart: CartLine[] }) {
  const [, setLocation] = useLocation();
  const total = cart.reduce((sum, line) => {
    const product = catalog.find((item) => item.id === line.id);
    return sum + (product?.pricePKR ?? 0) * line.quantity;
  }, 0);
  return <>
    <div className="page-head"><div className="breadcrumbs"><Link href="/" data-testid="link-checkout-home">Home</Link><ChevronRight size={11} /><Link href="/cart" data-testid="link-checkout-cart">Cart</Link><ChevronRight size={11} /> Checkout</div><h1 className="page-title">Checkout</h1><p className="page-lead">A clear boundary before payment.</p></div>
    <section className="checkout-box" data-testid="status-payment-boundary">
      <div className="checkout-icon"><LockKeyhole size={25} /></div>
      <div className="section-kicker">First release · payments not connected</div>
      <h2>Payment is not available yet.</h2>
      <p>This storefront can save your cart on this device, but it cannot accept orders or payments. No transaction has been started, and your cart total is not a payment request.</p>
      <div className="boundary-alert"><strong>Before you go further:</strong> PlayBeat Digital checkout and payment processing are not connected in this first milestone. Prices are catalog listings; product details, delivery, availability and final charges have not been confirmed.</div>
      <div className="checkout-total"><span>Listed cart subtotal · PKR</span><strong>{formatPKR(total)}</strong></div>
      <button className="btn btn-ghost" style={{ marginTop: 22 }} data-testid="button-return-cart" onClick={() => setLocation('/cart')}><ArrowLeft size={14} /> Return to your cart</button>
    </section>
  </>;
}

function NotFoundPage() {
  return <div className="empty-state" style={{ margin: '65px auto', maxWidth: 520 }} data-testid="status-not-found"><Monitor size={24} /><h3>This page is not in the collection</h3><p>That address may have changed. Head back to browse the current catalog.</p><Link href="/products" className="btn btn-primary" data-testid="button-not-found-browse">Browse products <ArrowRight size={14} /></Link></div>;
}

function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-main">
        <div className="footer-about"><Link href="/" className="brand" data-testid="link-footer-home"><span className="brand-mark">PB</span><span className="brand-name">playbeat<small>DIGITAL</small></span></Link><p>A considered destination for digital subscriptions, useful software, gift cards and smart devices. Prices in PKR.</p></div>
        <div className="footer-col"><h4>Explore</h4><Link href="/products" data-testid="link-footer-products">All products</Link><Link href="/products?category=AI%20%26%20Productivity" data-testid="link-footer-ai">AI &amp; productivity</Link><Link href="/products?category=Streaming" data-testid="link-footer-streaming">Streaming</Link><Link href="/products?category=Gift%20Cards" data-testid="link-footer-gifts">Gift cards</Link></div>
        <div className="footer-col"><h4>More to discover</h4><Link href="/products?category=Gaming" data-testid="link-footer-gaming">Gaming</Link><Link href="/products?category=VPN%20%26%20Security" data-testid="link-footer-security">VPN &amp; security</Link><Link href="/products?category=Smart%20Projectors" data-testid="link-footer-projectors">Smart projectors</Link><span className="footer-coming-soon">Business web services · coming soon</span></div>
        <div className="footer-col"><h4>Store notes</h4><Link href="/" data-testid="link-footer-currency">PKR catalog pricing</Link><Link href="/cart" data-testid="link-footer-cart">Your cart</Link><Link href="/checkout" data-testid="link-footer-checkout">Checkout status</Link><Link href="/products" data-testid="link-footer-details">Browse product details</Link></div>
      </div>
      <div className="footer-bottom"><span>© PlayBeat Digital · Storefront preview</span><span className="footer-currency">PKR &nbsp;·&nbsp; Payments not connected</span></div>
    </div>
  </footer>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Storefront /></WouterRouter>;
}

export default App;