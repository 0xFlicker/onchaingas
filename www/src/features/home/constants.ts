import { Color, Euler, Vector3 } from "three";

export const GRID_COLOR = new Color("#006600");
export const NEON_BLUE = new Color("#00ffff");
export const TUNNEL_POSITION_DESKTOP = new Vector3(0, -2.5, -20);
export const TUNNEL_ROTATION = new Euler(0, 0, 0).setFromVector3(
  new Vector3(0, 0, 0).sub(new Vector3(Math.PI / 18, 0, 0))
);
export const MAX_PAGE = 4;
export const MARGIN_PERCENT = 0.15;
export const ANIMATION_PART = 1 / 16;
