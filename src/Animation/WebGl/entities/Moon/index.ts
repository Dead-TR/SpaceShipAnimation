import { Application } from "pixi.js-legacy";
import { GameObject } from "../GameObject";

import { LIMBO_GENERAL_ANIMATION_SPEED } from "../../config";
import { proportionSpeed } from "../../utils";
import MoonImg from "../../assets/mStart.webp";

export class Moon extends GameObject {
  constructor(app: Application) {
    super(MoonImg, app, (moon, app) => {
      const { width } = app.screen;

      const scale = Math.min(width / moon.width, 1);
      moon.scale.set(scale * 0.85);

      moon.anchor.set(0.5, 1);
      this.restart();

      moon.zIndex = 100;
    });
  }

  private update = () => {
    if (!this.sprite) return;
    const { width } = this.app.screen;
    this.sprite.y +=
      15 * LIMBO_GENERAL_ANIMATION_SPEED * proportionSpeed(width);
  };

  private restart = () => {
    const { width, height } = this.app.screen;

    const positionX = width * 0.5,
      positionY = height;

    this.sprite?.position.set(positionX, positionY);
  };

  move = {
    update: this.update,
    restart: this.restart,
  };
}
