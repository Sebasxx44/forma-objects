import { useCallback } from "react";
import { useDialog } from "@/composables/useDialog";
import { ProductArtTA } from "@/components/ProductArtTA";
import { ArrowTA, CloseTA } from "@/components/IconsTA";
import { formatPrice } from "@/content";
import type { Product } from "@/types";

export const ProductDialogTA = ({ product, onClose, onAdd }: { product: Product | null; onClose: () => void; onAdd: (id: string) => void }) => {
  const close = useCallback(onClose, [onClose]);
  const dialogRef = useDialog(Boolean(product), close);
  return (
    <dialog ref={dialogRef} className="product-dialog" aria-label={product?.name ?? "Product details"} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {product && <div className="product-detail">
        <button className="icon-button dialog-close" onClick={close} aria-label="Close product details"><CloseTA /></button>
        <div className="detail-image" style={{ backgroundColor: product.background }}><ProductArtTA product={product} /></div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category} / THE EVERYDAY COLLECTION</p><h2>{product.name}</h2><p className="detail-price">{formatPrice(product.price)}</p>
          <p>{product.description}</p>
          <dl><div><dt>Finish</dt><dd>{product.colorName}</dd></div><div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div><div><dt>Materials</dt><dd>{product.material}</dd></div></dl>
          <button className="button button-dark" onClick={() => { onAdd(product.id); close(); }}>Add to bag <ArrowTA /></button>
          <p className="detail-note">Concept collection. Shopping and checkout are a demo.</p>
        </div>
      </div>}
    </dialog>
  );
};
