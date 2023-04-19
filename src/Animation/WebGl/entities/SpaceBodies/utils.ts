import { Sprite } from "pixi.js-legacy";

import { proportionScale } from "../../utils";
import { BodiesPosition } from "./type";

export const createPositionFromConfig = (
  body: Sprite,
  index: number,
  config: BodiesPosition[],
  sizes: { width: number; height: number },
) => {
  const { height, width } = sizes;
  proportionScale(body, width);
  body.anchor.set(0.5);
  const { x = -body.width, y = -body.height, scale = 1 } = config[index] || {};

  body.position.set(width * x, height - y);
  body.scale.set(body.scale.x * scale);
};
