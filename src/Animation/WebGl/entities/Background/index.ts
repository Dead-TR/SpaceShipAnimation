import { Application } from "pixi.js-legacy";

import { LIMBO_GENERAL_ANIMATION_SPEED } from "../../config";
import { GameObject } from "../GameObject";
import BG from "../../assets/bigBG.webp";

export class Background extends GameObject {
  constructor(app: Application) {
    super(BG, app, (sprite) => {
      sprite.anchor.set(0.5, 1);
      this.restart();
      sprite.zIndex = 0;
    });
  }

  private update = () => {
    if (!this.sprite || this.sprite.y >= this.sprite.height) {
      if (this.sprite) this.sprite.y = this.sprite.height;
      return true;
    }
    this.sprite.y += 5 * LIMBO_GENERAL_ANIMATION_SPEED;
  };
  private restart = () => {
    if (!this.sprite) return;
    const { width, height } = this.app.screen;
    this.sprite.position.set(width / 2, height);
  };

  move = {
    restart: this.restart,
    update: this.update,
  };
}
