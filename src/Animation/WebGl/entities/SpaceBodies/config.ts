import { BodiesPosition } from "./type";

/**
 ** x === width * x
 ** y === height - y
 ** scale === body.scale * scale
 ** speed === 1 * speed
 */
export const spacePlanetsConfig: BodiesPosition[] = [
  {
    x: 0.2,
    y: 600,
    scale: 0.3,
    speed: 1,
  },

  {
    x: 0.3,
    y: 750,
    scale: 0.5,
    speed: 1.5,
  },

  {
    x: 0.9,
    y: 500,
    scale: 0.75,
    speed: 1,
  },

  {
    x: 0.3,
    y: 1000,
    scale: 1,
    speed: 1,
  },

  {
    x: 0.7,
    y: 750,
    scale: 0.3,
    speed: 1.15,
  },
];

export const spaceMeteorsConfig: BodiesPosition[] = [
  {
    x: 0.1,
    y: 200,
    scale: 0.35,
    speed: 1,
  },

  {
    x: 0.85,
    y: 350,
    scale: 0.35,
    speed: 1.3,
  },

  {
    x: 0.12,
    y: 500,
    scale: 0.2,
    speed: 1.3,
  },
  {
    x: 0.05,
    y: 600,
    scale: 0.25,
    speed: 2,
  },

  {
    x: 0.9,
    y: 1100,
    scale: 0.2,
    speed: 1.7,
  },
  {
    x: 0.95,
    y: 1450,
    scale: 0.25,
    speed: 2.5,
  },

  {
    x: 0.15,
    y: 1200,
    scale: 0.15,
    speed: 1.5,
  },
  {
    x: 0.07,
    y: 1800,
    scale: 0.25,
    speed: 2.4,
  },

  {
    x: 0.8,
    y: 1250,
    scale: 0.35,
    speed: 1.3,
  },
  {
    x: 0.7,
    y: 1400,
    scale: 0.3,
    speed: 1.85,
  },
];
