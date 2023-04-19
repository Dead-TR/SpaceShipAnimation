import {
  LIMBO_DESKTOP_HEIGHT_PROPORTION,
  LIMBO_MOBILE_HEIGHT_PROPORTION,
} from "../config";

export const getProportion = () =>
  window.innerWidth <= 750
    ? LIMBO_MOBILE_HEIGHT_PROPORTION
    : LIMBO_DESKTOP_HEIGHT_PROPORTION;
