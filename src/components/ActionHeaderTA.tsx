import type { ReactNode } from "react";

export const ActionHeaderTA = ({ eyebrow, title, id, children }: { eyebrow: string; title: string; id: string; children?: ReactNode }) => (
  <div className="section-header">
    <div><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>
    {children}
  </div>
);
