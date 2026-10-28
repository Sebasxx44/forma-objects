# FORMA Objects

Tienda conceptual de objetos de diseño, creada para el portfolio de Sebastián Sánchez. React, TypeScript, Vite y Three.js; escena 3D procedural propia, catálogo filtrable, detalle de productos y carrito persistente.

```sh
npm install
npm run dev
npm run build
```

`npm run typecheck` verifica el tipado. `npm test` comprueba la recuperación y validación del carrito. `npm run build` verifica TypeScript y genera `dist/`, listo para Vercel.

Los productos, precios y materiales son ilustrativos. El checkout es una simulación explícita: no realiza cobros, no envía pedidos y no recoge datos personales. La suscripción es una demostración local que no almacena el correo.

La escena utiliza geometría procedural original y los productos se ilustran con SVG originales. Las fuentes DM Sans e Instrument Serif se sirven desde Google Fonts. La vista 3D respeta `prefers-reduced-motion`, reduce actividad fuera de pantalla y dispone de un fallback SVG si WebGL no está disponible.
