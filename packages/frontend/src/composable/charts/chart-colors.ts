import { currentTheme } from '@/common/utils/color-theme';
import { computed } from 'vue';

/**
 * Reads every chart-relevant CSS custom property from `document.documentElement`
 * in a single `getComputedStyle` call and returns the full palette with sensible
 * fallbacks. Charts destructure only the keys they need.
 *
 * The chart chrome and series colours come from the Bklit UI chart tokens
 * (`--chart-1..5`, `--chart-grid`, `--chart-label`, `--chart-crosshair`,
 * `--chart-positive`/`--chart-negative`) defined in `styles/global.css`; `primary`
 * is the first series colour, `appIncome`/`appExpense` the positive/negative pair.
 */
export function getChartColors() {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    grid: read('--chart-grid', 'rgb(229, 229, 229)'),
    text: read('--chart-label', 'rgb(115, 115, 115)'),
    crosshair: read('--chart-crosshair', 'rgb(115, 115, 115)'),
    foreground: read('--foreground', 'rgb(250, 250, 250)'),
    primary: read('--chart-1', 'rgb(97, 95, 255)'),
    secondary: read('--chart-2', 'rgb(253, 199, 0)'),
    card: read('--card', 'rgb(24, 24, 27)'),
    appIncome: read('--chart-positive', 'rgb(0, 188, 125)'),
    appExpense: read('--chart-negative', 'rgb(251, 44, 54)'),
    appSavings: read('--app-savings-color', 'rgb(59, 130, 246)'),
    successText: read('--success-text', 'rgb(46, 204, 113)'),
    destructiveText: read('--destructive-text', 'rgb(239, 68, 68)'),
    warningText: read('--warning-text', 'rgb(243, 156, 18)'),
  };
}

/** Same palette, re-read whenever the theme flips. */
export function useChartColors() {
  return computed(() => {
    void currentTheme.value;
    return getChartColors();
  });
}
