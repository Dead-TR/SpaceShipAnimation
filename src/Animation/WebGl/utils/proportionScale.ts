import { Sprite } from "pixi.js-legacy";
import { maxScreenWidth } from "./config";

export const proportionScale = (sprite: Sprite, width: number) => {
  const scale = Math.min(width / maxScreenWidth, 1);
  sprite.scale.set(scale);
};
