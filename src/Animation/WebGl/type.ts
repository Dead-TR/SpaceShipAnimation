import { Ticker } from "pixi.js-legacy";
import { Background, Moon, Ship, SpaceBodies } from "./entities";

export interface LimboEntities {
  background: Background;
  moon: Moon;
  ship: Ship;
  spaceBodies: SpaceBodies;
  ticker: Ticker
}
