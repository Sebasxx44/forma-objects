import { useState } from "react";
import { useLampScene } from "@/composables/useLampScene";
import { products } from "@/content";
import { ProductArtTA } from "@/components/ProductArtTA";
import { ArrowTA } from "@/components/IconsTA";

const finishes = [{ name: "Sienna", value: "#c45539" }, { name: "Chalk", value: "#e2d6bd" }, { name: "Olive", value: "#697355" }];

export const LampSceneTA = () => {
  const [finish, setFinish] = useState(finishes[0]);
  const { mountRef, available } = useLampScene(finish.value);
  return (
    <div className="hero-object">
      <div className="scene-top"><span>THE ARCO COLLECTION</span><span>01 / 06</span></div>
      <span className="scene-edition">A little<br />light goes<br /><em>a long way.</em></span>
      {!available && <ProductArtTA product={products[0]} className="scene-fallback" />}
      <div className={`scene-canvas ${available ? "is-ready" : ""}`} ref={mountRef} role="img" aria-label={`Interactive sculptural Arco lamp in ${finish.name}. Drag to rotate.`} />
      <div className="scene-bottom">
        <div className="scene-drag"><span><ArrowTA bidirectional className="native-symbol" /></span> DRAG TO EXPLORE</div>
        <div className="finish-selector" aria-label="Preview lamp finish">{finishes.map((option) => <button key={option.name} type="button" aria-label={`${option.name} finish`} aria-pressed={finish.name === option.name} onClick={() => setFinish(option)} style={{ backgroundColor: option.value }} />)}</div>
      </div>
      <span className="scene-vertical">GOOD DESIGN. EVERY DAY.</span>
    </div>
  );
};
