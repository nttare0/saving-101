/**
 * Surface classes shared by the chart tooltip and any popper-based tooltip that
 * shows chart-like data, so both stay on the same tokens.
 */
export const CHART_TOOLTIP_SURFACE_CLASS =
  'bg-card-tooltip text-card-tooltip-foreground border-card-tooltip-border rounded-xl border px-3.5 py-3 text-sm shadow-card-tooltip supports-[backdrop-filter]:bg-card-tooltip-glass supports-[backdrop-filter]:backdrop-blur-md';

/** Grow to fit content, never past the viewport. */
export const CHART_TOOLTIP_SIZING_CLASS = 'w-max max-w-[calc(100vw-16px)] min-w-40';
