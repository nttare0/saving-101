// The Bklit UI chart hues (its "Primary" palette first, then steps from its Vivid, Ocean and
// Sunset palettes), as sRGB literals because consumers derive sibling shades with d3-color,
// which does not parse oklch(). All sit around Tailwind's ~500 lightness step, the common
// heuristic for a hue that stays legible on both a near-white and a near-black surface.
export const CATEGORICAL_SERIES_PALETTE: string[] = [
  'rgb(97, 95, 255)', // indigo-500   (--chart-1)
  'rgb(253, 199, 0)', // yellow-400   (--chart-2)
  'rgb(0, 188, 125)', // emerald-500
  'rgb(0, 184, 219)', // cyan-500
  'rgb(255, 32, 86)', // rose-500
  'rgb(255, 105, 0)', // orange-500
  'rgb(142, 81, 255)', // violet-500
  'rgb(124, 207, 0)', // lime-500
  'rgb(246, 51, 154)', // pink-500
  'rgb(103, 120, 124)', // mist-500    (--chart-4)
];

/** Muted slate for the folded tail of a series list, so "Others" never competes with a named series. */
export const OTHERS_SERIES_COLOR = 'rgb(166, 160, 155)';
