import {
  Application,
  BLEND_MODES,
  Sprite,
  Texture,
  Ticker,
  VideoResource,
} from "pixi.js-legacy";
import { Tween, removeAll } from "@tweenjs/tween.js";

import { proportionScale, proportionSpeed } from "../../utils";
import { LIMBO_GENERAL_ANIMATION_SPEED } from "../../config";
import { GameObject } from "../GameObject";
import { TweenState } from "./type";

import ShipImg from "../../assets/ship.webp";
import Explosion from "../../assets/explosion.mp4";

export class Ship extends GameObject {
  explosion?: Sprite;

  private tweenState?: TweenState;

  constructor(app: Application) {
    super(ShipImg, app, (ship, app) => {
      const { width } = app.screen;

      proportionScale(ship, width);
      ship.scale.set(ship.scale.x * 0.75);

      ship.anchor.set(0.5, 1);
      this.setTODefaultPosition(ship);
      ship.zIndex = 101;

      this.createTween(ship);
    });
  }

  private setTODefaultPosition(ship = this.sprite) {
    const { width, height } = this.app.screen;
    ship?.position.set(width * 0.5, height * 0.95);
  }

  async create() {
    try {
      const isSpriteDownload = await super.create();
      const texture = await Texture.fromLoader(Explosion, Explosion);
      this.explosion = new Sprite(texture);

      this.explosion.blendMode = BLEND_MODES.ADD;
      this.explosion.zIndex = 102;
      this.explosion.position.set(-texture.width, -texture.height);

      this.app.stage.addChild(this.explosion);
      return isSpriteDownload;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  boom = (onComplete: () => void) => {
    if (!this.explosion || !this.sprite) return;

    const { width } = this.app.screen;
    proportionScale(this.explosion, width);

    this.sprite.alpha = 0;
    const video = this.explosion.texture.baseTexture.resource as VideoResource;
    video.source.currentTime = 0;
    video.source.play();
    this.explosion.alpha = 1;
    video.source.onended = () => {
      if (this.explosion) this.explosion.alpha = 0;
      onComplete();
    };

    const { x, y, height } = this.sprite;
    this.explosion.anchor.set(0.5, 1);
    this.explosion.position.set(x, y + height * 0.5);
  };

  private update = () => {
    if (!this.sprite) return;
    this.stopReadyAnimation();

    const { width } = this.app.screen;

    this.sprite.y -=
      0.5 * LIMBO_GENERAL_ANIMATION_SPEED * proportionSpeed(width);
  };
  private restart = () => {
    if (!this.sprite || !this.explosion) return;
    this.startReadyAnimation();
    this.setTODefaultPosition();
    this.sprite.alpha = 1;

    this.explosion.alpha = 0;
    const video = this.explosion.texture.baseTexture.resource as VideoResource;
    video.source.currentTime = 0;
    video.source.onended = null;
  };

  private createTween = (ship: Sprite) => {
    const tween = new Tween(ship)
      .to(
        {
          x: ship.x + 2,
        },
        50,
      )
      .yoyo(true)
      .repeat(Infinity)
      .start();

    const ticker = new Ticker();
    ticker.add(() => {
      tween.update();
    });
    ticker.start();

    this.tweenState = {
      ticker,
      tween,
    };
  };

  private stopReadyAnimation() {
    const { ticker } = this.tweenState || {};
    if (ticker?.started) this.tweenState?.ticker.stop();
  }
  private startReadyAnimation() {
    this.tweenState?.ticker.start();
  }

  move = {
    update: this.update,
    restart: this.restart,
  };

  destroy() {
    this.stopReadyAnimation();
    const { ticker, tween } = this.tweenState || {};
    ticker?.destroy();
    tween?.stop();
    removeAll();

    //@ts-ignore
    delete this.tweenState?.ticker;
    //@ts-ignore
    delete this.tweenState?.tween;
    delete this.tweenState;

    super.destroy();
  }
}
