import { Application, Ticker } from "pixi.js-legacy";

import { Background, Moon, Ship, SpaceBodies } from "./entities";
import { getProportion } from "./utils";
import { LimboEntities } from "./type";

export class LimboAnimation {
  private app?: Application;
  private parent: HTMLDivElement;

  private entities?: LimboEntities;

  constructor(parent: HTMLDivElement) {
    this.parent = parent;

    this.init();
  }

  private init() {
    this.resize();
  }

  private resize() {
    this.create();
  }

  private removeCanvas = () => {
    const { parent } = this;
    [...parent.children].forEach((node) => node?.remove());
  };

  private createCanvas = () => {
    const { parent } = this;
    const canvas = document.createElement("canvas");
    this.removeCanvas();
    parent.appendChild(canvas);
    return canvas;
  };

  private isBoom = false;
  async create() {
    const canvas = this.createCanvas();

    this.app = new Application({
      view: canvas,
      width: 1220,
      height: 1220 * getProportion(),
      backgroundAlpha: 0,
    });
    this.app.stage.sortableChildren = true;

    const background = new Background(this.app);
    const moon = new Moon(this.app);
    const ship = new Ship(this.app);
    const spaceBodies = new SpaceBodies(this.app);

    const ticker = new Ticker();
    ticker.autoStart = false;
    ticker.add(() => {
      this.isBoom = false;
      const isStop = background.move.update();

      if (isStop) {
        this.isBoom = true;

        ticker.stop();
        ship.boom(() => {
          this.restart();
        });

        return;
      }
      spaceBodies.move.update();
      moon.move.update();
      ship.move.update();
    });

    const loading = await Promise.all([
      background.create(),
      moon.create(),
      ship.create(),
      spaceBodies.create(),
    ]);

    this.entities = {
      background,
      moon,
      ship,
      spaceBodies,
      ticker,
    };

    this.parent.style.opacity = "1";
  }

  private restart = () => {
    if (!this.entities) return;
    const { spaceBodies, moon, background, ship, ticker } = this.entities;

    ticker.stop();
    spaceBodies.move.restart();
    moon.move.restart();
    background.move.restart();
    ship.move.restart();
  };

  animate = () => {
    const { ticker } = this.entities || {};
    if (!ticker) return;
    if (ticker.started || this.isBoom) this.restart();

    ticker.start();
  };

  private destroyApp() {
    this.parent.style.opacity = "0";
    this.entities?.ticker.stop();

    Object.values(this.entities || {}).forEach(
      (value: LimboEntities[keyof LimboEntities]) => {
        value.destroy();
      },
    );
    this.app?.destroy(true);
    this.removeCanvas();

    delete this.app;
    delete this.entities;
  }

  destroy() {
    this.destroyApp();
  }
}
