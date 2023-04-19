import { Application, Sprite, Texture } from "pixi.js-legacy";

import { OnLoadCallBack } from "./type";

export class GameObject {
  protected app: Application;
  sprite?: Sprite;

  private textureLink: string;
  private onLoad?: OnLoadCallBack;

  constructor(textureLink: string, app: Application, onLoad?: OnLoadCallBack) {
    this.app = app;
    this.textureLink = textureLink;
    this.onLoad = onLoad;
  }

  async create() {
    try {
      const texture = await Texture.fromLoader(
        this.textureLink,
        this.textureLink,
      );
      const sprite = (this.sprite = new Sprite(texture));

      if (this.onLoad) this.onLoad(sprite, this.app);
      this.app.stage.addChild(sprite);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  destroy() {
    this.sprite?.destroy();
    delete this.sprite;
  }
}
