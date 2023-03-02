import { palette } from "@looma/tokens";
import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles } from "~/styles/sprinkles.css";

export const root = style({
  width: `100%`,
  fontSize: `12px`,
  display: `block`,
  color: palette.gray[600],
});

export const input = style({
  fontSize: `12px`,
  border: "1px solid black",
  display: `block`,
  color: palette.gray[600],
});

export const error = style([
  root,
  {
    color: palette.red[600],
  },
]);
