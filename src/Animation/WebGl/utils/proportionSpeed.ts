import { maxScreenWidth } from "./config";

export const proportionSpeed = (width: number) =>
  (width / maxScreenWidth) * 0.75;
