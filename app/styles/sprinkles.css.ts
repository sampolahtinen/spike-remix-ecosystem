import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { spacing, palette, shadows } from "@looma/tokens";
import { transform } from "lodash";

const space = {
  auto: "auto",
  ...spacing,
};

const border = {
  none: `none`,
  default: `1px solid ${palette.gray[600]}`,
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    width: {
      10: `10%`,
      50: `50%`,
      100: `100%`,
    },
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    alignSelf: ["stretch", "flex-start", "center", "flex-end"],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    margin: space,
    border,
    borderBottom: border,
    boxShadow: shadows,
    // etc.
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    mb: ["marginBottom"],
    mt: ["marginTop"],
    ml: ["marginLeft"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

const colors = {
  "gray-100": palette.gray[100],
  "gray-200": palette.gray[200],
  "gray-300": palette.gray[300],
  "green-100": palette.green[100],
  "green-200": palette.green[200],
  "green-300": palette.green[300],
  "red-100": palette.red[100],
  "red-200": palette.red[200],
  "red-300": palette.red[300],
};

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: colors,
    background: colors,
    // etc.
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
