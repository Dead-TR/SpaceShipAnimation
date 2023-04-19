import { Tween } from "@tweenjs/tween.js";
import { Sprite, Ticker } from "pixi.js-legacy";

export interface TweenState {
  tween: Tween<Sprite>;
  ticker: Ticker;
}
