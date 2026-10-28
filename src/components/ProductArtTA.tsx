import { useId } from "react";
import type { Product } from "@/types";

export const ProductArtTA = ({ product, className = "" }: { product: Product; className?: string }) => {
  const id = useId().replace(/:/g, "");
  const gradient = `${id}-body`;
  const shadow = `${id}-shadow`;
  return (
    <svg className={`product-art ${className}`} viewBox="0 0 440 440" role="img" aria-label={`${product.name} in ${product.colorName}`}>
      <defs>
        <linearGradient id={gradient} x1="0" x2="1"><stop stopColor={product.color} /><stop offset=".45" stopColor={product.color} /><stop offset="1" stopColor="#16110b" stopOpacity=".5" /></linearGradient>
        <radialGradient id={shadow}><stop stopColor="#26170c" stopOpacity=".2" /><stop offset="1" stopColor="#26170c" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}-shine`} x1="0" x2="1"><stop stopColor="#fff" stopOpacity=".25" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".15" /></linearGradient>
      </defs>
      <ellipse cx="225" cy="362" rx="143" ry="28" fill={`url(#${shadow})`} />
      {product.shape === "lamp" && <g>
        <ellipse cx="222" cy="343" rx="64" ry="15" fill={`url(#${gradient})`} />
        <path d="M209 207h25l5 133c-12 10-23 10-36 0Z" fill={`url(#${gradient})`} />
        <ellipse cx="222" cy="215" rx="113" ry="19" fill="#622b1f" />
        <path d="M109 211c0-145 225-145 226 0Z" fill={product.color} />
        <path d="M109 211c0-145 225-145 226 0Z" fill={`url(#${id}-shine)`} />
        <ellipse cx="222" cy="210" rx="113" ry="15" fill={product.color} />
        <path d="M179 127c-24 12-40 30-49 56" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="3" strokeLinecap="round" />
      </g>}
      {product.shape === "chair" && <g transform="translate(3 2)">
        <path d="m128 278-17 77h16l30-77m139-5 25 78h-16l-31-76" fill="#805534" />
        <path d="m148 259-5 77h13l15-76m114 1 7 75h13l-5-78" fill="#70472c" />
        <path d="M124 161q0-35 40-35h104q32 0 30 34l-7 107H130Z" fill={`url(#${gradient})`} />
        <path d="M112 253q0-17 24-17h151q28 0 33 20l2 23q-3 20-29 23H139q-30-4-30-22Z" fill={product.color} />
        <path d="M129 244q75 21 175-2" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="2" />
        <path d="m103 206 17-2 11 60-19 4m186-66 17 2 8 59-19 2" fill="#8d6141" />
        <path d="M127 149h154" stroke="#fff" strokeOpacity=".13" strokeWidth="2" />
      </g>}
      {product.shape === "vase" && <g>
        <path d="M190 125h60l-6 54c75 56 82 115 42 151-30 25-105 25-135-3-40-37-26-99 46-148Z" fill={`url(#${gradient})`} />
        <ellipse cx="220" cy="126" rx="30" ry="7" fill="#a69176" />
        <ellipse cx="220" cy="127" rx="22" ry="3" fill="#796951" />
        <path d="M175 223c-26 40-20 68-6 88" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="4" strokeLinecap="round" />
        <path d="M220 127c-9-42 8-71 31-93m-30 60c-23-10-36-25-37-43m42 24c22-4 34-14 40-28" fill="none" stroke="#74745a" strokeWidth="3" />
        <ellipse cx="188" cy="55" rx="18" ry="6" transform="rotate(45 188 55)" fill="#737b5d" /><ellipse cx="259" cy="51" rx="20" ry="7" transform="rotate(-35 259 51)" fill="#737b5d" />
      </g>}
      {product.shape === "pendant" && <g>
        <path d="M220 0v142" stroke="#464135" strokeWidth="3" /><rect x="207" y="137" width="26" height="30" rx="9" fill={product.color} />
        <path d="M87 251c11-91 253-96 270 0Z" fill={`url(#${gradient})`} />
        <ellipse cx="222" cy="251" rx="135" ry="21" fill="#7a6138" />
        <ellipse cx="222" cy="254" rx="121" ry="12" fill="#f3e1b7" />
        <ellipse cx="222" cy="258" rx="19" ry="8" fill="#fff4d7" />
      </g>}
      {product.shape === "table" && <g>
        <path d="m145 209 12 133h24l7-133m58 0 9 133h24l16-133" fill={`url(#${gradient})`} />
        <path d="M127 192h185v27c-49 37-133 37-185 0Z" fill={`url(#${gradient})`} />
        <ellipse cx="220" cy="191" rx="93" ry="36" fill={product.color} />
        <ellipse cx="220" cy="191" rx="81" ry="28" fill="none" stroke="#fff" strokeOpacity=".08" />
        <path d="M150 183q70-22 137 2M158 194q60-18 124 4m-111 9q49-13 95 0" stroke="#40220f" strokeOpacity=".2" fill="none" />
      </g>}
      {product.shape === "bowl" && <g>
        <path d="M89 235c9 150 254 150 265 0Z" fill={`url(#${gradient})`} />
        <ellipse cx="221" cy="235" rx="133" ry="39" fill={product.color} />
        <ellipse cx="221" cy="234" rx="119" ry="29" fill="#784130" />
        <path d="M109 235q111 40 225 0" fill="none" stroke="#d47f60" strokeWidth="4" />
        <ellipse cx="189" cy="224" rx="23" ry="20" fill="#b18d40" /><ellipse cx="231" cy="230" rx="23" ry="20" fill="#cead63" /><ellipse cx="257" cy="212" rx="23" ry="20" fill="#9e9d4d" />
        <path d="m186 209 4-9m67 0 4-9" stroke="#4b5535" strokeWidth="3" />
      </g>}
    </svg>
  );
};
