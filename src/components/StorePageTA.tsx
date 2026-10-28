import { lazy, Suspense, useCallback, useState } from "react";
import { ActionHeaderTA } from "@/components/ActionHeaderTA";
import { ArrowTA, BagTA } from "@/components/IconsTA";
import { ProductArtTA } from "@/components/ProductArtTA";
import { ProductDialogTA } from "@/components/ProductDialogTA";
import { CartDrawerTA } from "@/components/CartDrawerTA";
import { useCart } from "@/composables/useCart";
import { categories, formatPrice, products } from "@/content";
import type { Category, Product } from "@/types";

const LampSceneTA = lazy(() => import("@/components/LampSceneTA").then((module) => ({ default: module.LampSceneTA })));

export const StorePageTA = () => {
  // State
  const cart = useCart();
  const [filter, setFilter] = useState<Category>("All objects");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [notification, setNotification] = useState("");

  // Actions
  const closeProduct = useCallback(() => setSelected(null), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const addProduct = (id: string) => {
    cart.actions.add(id); setCartOpen(true);
  };
  const visibleProducts = filter === "All objects" ? products : products.filter((product) => product.category === filter);

  return (
    <>
      <a className="skip-link" href="#collection">Skip to collection</a>
      <div className="announcement"><span>A considered home. A slower kind of living.</span><span>INDEPENDENT DESIGN — EST. 2026</span></div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Forma Objects home">forma<span>®</span></a>
        <nav aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>The collection <span>↗</span></a><a href="#philosophy" onClick={() => setMenuOpen(false)}>Our philosophy</a><a href="#journal" onClick={() => setMenuOpen(false)}>Notes on living</a>
        </nav>
        <div className="header-actions"><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${cart.selection.count} items`}><BagTA /><span>Bag</span><span className="bag-count">{cart.selection.count}</span></button><button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? "Close" : "Menu"}</button></div>
      </header>
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> LESS, BUT MORE MEANINGFUL.</p>
            <h1 id="hero-title">Objects for<br /><em>slower</em> living<span className="title-period">.</span></h1>
            <div className="hero-description"><span className="tiny-star">✳</span><p>Thoughtful forms. Honest materials.<br />Everyday objects that make a house feel like you.</p></div>
            <a className="button button-dark hero-cta" href="#collection">Find your everyday extraordinary <ArrowTA /></a>
            <div className="hero-footnote"><span>SCULPTURAL BY NATURE.<br />FUNCTIONAL BY DESIGN.</span><span className="hero-number">(01—06)</span></div>
          </div>
          <Suspense fallback={<div className="hero-object"><ProductArtTA product={products[0]} className="scene-fallback" /></div>}><LampSceneTA /></Suspense>
        </section>
        <div className="collection-strip"><span>Made to stay, not to follow trends.</span><span>LIGHTING <i>✳</i> FURNITURE <i>✳</i> EVERYDAY OBJECTS</span><a href="#collection">Discover FORMA <ArrowTA diagonal /></a></div>
        <section className="collection section-wrap" id="collection" aria-labelledby="collection-title">
          <ActionHeaderTA id="collection-title" eyebrow="01 / THE CONSIDERED COLLECTION" title="Good things. Everyday."><p>A few things, chosen well.<br />Find the piece that feels like home.</p></ActionHeaderTA>
          <div className="collection-toolbar"><div className="category-filters" aria-label="Filter collection">{categories.map((category) => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{category === "All objects" && <sup>06</sup>}</button>)}</div><span className="results-count">{visibleProducts.length} OBJECTS</span></div>
          <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}>
            <button className="product-image" style={{ backgroundColor: product.background }} onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
              {product.badge && <span className="product-badge">{product.badge}</span>}<ProductArtTA product={product} /><span className="quick-view">Discover object <ArrowTA /></span>
            </button>
            <div className="product-meta"><div><button className="product-title" onClick={() => setSelected(product)}>{product.name}</button><p>{product.category} <span>·</span> {product.colorName}</p></div><div className="product-price"><span>{formatPrice(product.price)}</span><button onClick={() => addProduct(product.id)} aria-label={`Add ${product.name} to bag`}>+</button></div></div>
          </article>)}</div>
        </section>
        <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
          <div className="philosophy-art"><span className="philosophy-index">A STUDY IN STILLNESS / FORMA JOURNAL</span><div className="art-window"><span /><span /><span /><span /></div><div className="still-life"><ProductArtTA product={products[2]} /><ProductArtTA product={products[5]} /></div><span className="philosophy-art-label">Less noise.<br />More meaning.</span></div>
          <div className="philosophy-copy"><p className="eyebrow">02 / A DIFFERENT KIND OF MORE</p><h2 id="philosophy-title">A home is<br />a feeling.<br /><em>Make it yours.</em></h2><p>We believe the objects we surround ourselves with should do more than fill a space. They should bring a little calm, a little joy, a little you.</p><p>FORMA is a concept collection of thoughtful pieces for everyday life. Fewer things. Better choices. Room for what matters.</p><a className="text-link" href="#journal">A note on considered living <ArrowTA diagonal /></a></div>
        </section>
        <section className="journal section-wrap" id="journal" aria-labelledby="journal-title"><ActionHeaderTA id="journal-title" eyebrow="03 / NOTES ON LIVING" title="Room for a little inspiration." /><div className="journal-grid">
          <article><span className="journal-number">01</span><div><p className="eyebrow">THE ART OF LESS</p><h3>Choose what you love.<br />Let it take its time.</h3><p>Start with one piece that makes you pause. Build slowly around it, letting texture, light, and the way you use a room guide every new addition.</p></div></article>
          <article><span className="journal-number">02</span><div><p className="eyebrow">LIGHT, LAYERED</p><h3>A softer way<br />to end the day.</h3><p>Trade the overhead light for a warm table lamp. Small pools of light bring depth to a room, and make even the most ordinary evening feel a little special.</p></div></article>
          <article><span className="journal-number">03</span><div><p className="eyebrow">MATERIAL MATTERS</p><h3>Beauty you<br />can feel.</h3><p>A rough ceramic edge. The grain of oak. The soft curve of a shade. Combine materials you want to touch, and a space starts to come alive.</p></div></article>
        </div></section>
        <section className="newsletter" aria-labelledby="newsletter-title"><span className="newsletter-star">✳</span><div><p className="eyebrow">A LITTLE INSPIRATION, OCCASIONALLY.</p><h2 id="newsletter-title">Good things take time.<br /><em>Stay a little closer.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); setNotification("Demo signup complete. Your email has not been sent or saved."); }}><label htmlFor="newsletter-email">{subscribed ? "You're on the (concept) list." : "Your email address"}</label><div className="email-field"><input id="newsletter-email" type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setSubscribed(false); }} placeholder="you@example.com" required aria-describedby="newsletter-note" /><button type="submit" aria-label="Join the concept newsletter"><ArrowTA /></button></div><p id="newsletter-note">Demo signup only. No emails are collected or sent.</p><p className="sr-only" role="status">{notification}</p></form></section>
      </main>
      <footer className="site-footer"><div className="footer-top"><a className="wordmark" href="#home">forma<span>®</span></a><p>Objects for living.<br />Space for being.</p><a href="#collection">Explore the collection <ArrowTA diagonal /></a><a href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© 2026 FORMA Objects — A concept by Sebaz.</span><span>Portfolio demo · No real transactions.</span><a href="https://github.com/Sebasxx44" target="_blank" rel="noreferrer">Designed & built with intention ↗</a></div></footer>
      <ProductDialogTA product={selected} onClose={closeProduct} onAdd={addProduct} />
      <CartDrawerTA cart={cart} open={cartOpen} onClose={closeCart} />
    </>
  );
};
