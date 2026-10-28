import { useEffect, useState } from "react";
import { useDialog } from "@/composables/useDialog";
import { ProductArtTA } from "@/components/ProductArtTA";
import { ArrowTA, CloseTA } from "@/components/IconsTA";
import { formatPrice } from "@/content";
import type { CartState } from "@/types";

export const CartDrawerTA = ({ cart, open, onClose }: { cart: CartState; open: boolean; onClose: () => void }) => {
  const dialogRef = useDialog(open, onClose);
  const [complete, setComplete] = useState(false);
  useEffect(() => { if (open) setComplete(false); }, [open]);
  return (
    <dialog ref={dialogRef} className="cart-dialog" aria-labelledby="bag-title" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="cart-inner">
        <header className="cart-header"><h2 id="bag-title">Your bag <span>({cart.selection.count})</span></h2><button className="icon-button" onClick={onClose} aria-label="Close shopping bag"><CloseTA /></button></header>
        {complete ? <div className="empty-bag"><div className="success-mark">✓</div><p className="eyebrow">DEMO ORDER COMPLETE</p><h3>A little more<br />thoughtfully chosen.</h3><p>Your concept order has been completed. No payment was taken and no personal information was collected.</p><button className="button button-dark" onClick={onClose}>Keep exploring <ArrowTA /></button></div>
          : cart.selection.items.length === 0 ? <div className="empty-bag"><span className="empty-object">◒</span><h3>Make room for<br />something lovely.</h3><p>Your bag is empty. Find an object that feels like you.</p><button className="button button-dark" onClick={() => { onClose(); document.querySelector("#collection")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }}>Explore the collection <ArrowTA /></button></div>
          : <>
            <p className="cart-notice">Good things, thoughtfully chosen.</p>
            <div className="cart-items">{cart.selection.items.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
              <div className="cart-item-image" style={{ backgroundColor: product.background }}><ProductArtTA product={product} /></div>
              <div className="cart-item-copy"><h3>{product.name}</h3><p>{product.colorName}</p><strong>{formatPrice(product.price * quantity)}</strong>
                <div className="quantity-controls"><button aria-label={`Decrease quantity of ${product.name}`} onClick={() => cart.actions.changeQuantity(product.id, quantity - 1)}>−</button><span aria-label="Quantity">{quantity}</span><button aria-label={`Increase quantity of ${product.name}`} disabled={quantity >= 20} onClick={() => cart.actions.changeQuantity(product.id, quantity + 1)}>+</button></div>
              </div><button className="remove-item" onClick={() => cart.actions.changeQuantity(product.id, 0)} aria-label={`Remove ${product.name}`}>Remove</button>
            </article>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(cart.totals.subtotal)}</strong></div><p>Demo store · no shipping, taxes, or payment charged.</p><button className="button button-dark" onClick={() => { cart.actions.clear(); setComplete(true); }}>Complete demo order <ArrowTA /></button><button className="continue-link" onClick={onClose}>Continue exploring</button></div>
          </>}
      </div>
    </dialog>
  );
};
