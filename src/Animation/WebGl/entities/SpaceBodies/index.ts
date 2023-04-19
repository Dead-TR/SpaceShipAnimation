import { Application, Sprite } from "pixi.js-legacy";

import { spaceMeteorsConfig, spacePlanetsConfig } from "./config";
import { LIMBO_GENERAL_ANIMATION_SPEED } from "../../config";
import { GameObject } from "../GameObject";

import { createPositionFromConfig } from "./utils";
import { BodiesPosition } from "./type";

import P0 from "../../assets/meteor_0.webp";
import P1 from "../../assets/meteor_2.webp";

import P2 from "../../assets/planet1.webp";
import P3 from "../../assets/planet2.webp";
import P4 from "../../assets/planet4.webp";
import P5 from "../../assets/planet5.webp";
import P6 from "../../assets/planet6.webp";

import M0 from "../../assets/meteor_1.webp";
import M1 from "../../assets/asteroid.webp";
import M2 from "../../assets/asteroid1.webp";
import M3 from "../../assets/asteroid2.webp";
import M4 from "../../assets/asteroid4.webp";
import M5 from "../../assets/asteroid5.webp";

const planetsImgs = [P0, P1, P4, P6, P3];
const meteorsImgs = [M0, M1, M3, M2, M0, M4, M5, M1, M3, M2];

export class SpaceBodies {
  private app: Application;
  private planets: GameObject[];
  private meteors: GameObject[];

  constructor(app: Application) {
    this.app = app;

    this.planets = planetsImgs.map((img) => new GameObject(img, app));
    this.meteors = meteorsImgs.map((img) => new GameObject(img, app));
  }

  create = async () => {
    const planetsCreated = await Promise.all([
      ...this.planets.map((obj) => obj.create()),
      ...this.meteors.map((obj) => obj.create()),
    ]);

    this.restart();
    return planetsCreated;
  };

  destroy() {
    this.planets.forEach((obj) => obj.destroy());
  }

  private update = () => {
    const move = (object: GameObject, i: number, config: BodiesPosition[]) => {
      const { speed = 1 } = config[i];
      if (object.sprite)
        object.sprite.y += 5 * speed * LIMBO_GENERAL_ANIMATION_SPEED;
    };

    this.planets.forEach((obj, i) => move(obj, i, spacePlanetsConfig));
    this.meteors.forEach((obj, i) => move(obj, i, spaceMeteorsConfig));
  };
  private restart = () => {
    const { width, height } = this.app.screen;
    this.meteors.forEach((meteor, index) => {
      createPositionFromConfig(
        meteor.sprite as Sprite,
        index,
        spaceMeteorsConfig,
        {
          width,
          height,
        },
      );
    });

    this.planets.forEach((planet, index) => {
      createPositionFromConfig(
        planet.sprite as Sprite,
        index,
        spacePlanetsConfig,
        {
          width,
          height,
        },
      );
    });
  };

  move = {
    update: this.update,
    restart: this.restart,
  };
}
