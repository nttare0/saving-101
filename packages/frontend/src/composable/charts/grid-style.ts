import type { BaseType, Selection } from 'd3';

let maskSequence = 0;

const SVG_NS = 'http://www.w3.org/2000/svg';
/** Share of the plot width over which the rows fade in at each edge. */
const EDGE_FADE = 0.12;

/**
 * Bklit UI grid rows: 1px dashed (4,4) lines in the grid colour that fade out towards the
 * left and right edges of the plot. Call it on the `<g>` an axis generator has just rendered
 * its tick lines into (`axisLeft(...).tickSize(-innerWidth)`).
 *
 * The fade is an SVG mask in the grid group's own user space; it is skipped for vertical
 * grid lines and for plots too narrow for the fade to read.
 */
export function styleGridRows<Datum, Parent extends BaseType, ParentDatum>({
  grid,
  color,
}: {
  grid: Selection<SVGGElement, Datum, Parent, ParentDatum>;
  color: string;
}): void {
  const lines = grid.selectAll<SVGLineElement, unknown>('.tick line');
  lines.attr('stroke', color).attr('stroke-dasharray', '4,4');

  const firstLine = lines.node();
  const group = grid.node();
  const svg = group?.ownerSVGElement;
  if (!firstLine || !group || !svg) return;

  const x2 = Number(firstLine.getAttribute('x2') ?? 0);
  const width = Math.abs(x2);
  if (width < 120) return;
  const left = Math.min(0, x2);

  const id = `chart-grid-fade-${(maskSequence += 1)}`;
  const defs = svg.querySelector('defs') ?? svg.insertBefore(document.createElementNS(SVG_NS, 'defs'), svg.firstChild);

  const gradient = document.createElementNS(SVG_NS, 'linearGradient');
  gradient.setAttribute('id', `${id}-gradient`);
  gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
  gradient.setAttribute('x1', String(left));
  gradient.setAttribute('x2', String(left + width));
  for (const [offset, opacity] of [
    [0, 0],
    [EDGE_FADE, 1],
    [1 - EDGE_FADE, 1],
    [1, 0],
  ] as const) {
    const stop = document.createElementNS(SVG_NS, 'stop');
    stop.setAttribute('offset', String(offset));
    stop.setAttribute('stop-color', 'white');
    stop.setAttribute('stop-opacity', String(opacity));
    gradient.appendChild(stop);
  }

  // Horizontal lines have a zero-height bounding box, so the mask is sized in user space.
  const mask = document.createElementNS(SVG_NS, 'mask');
  mask.setAttribute('id', id);
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  mask.setAttribute('x', String(left));
  mask.setAttribute('y', '-10000');
  mask.setAttribute('width', String(width));
  mask.setAttribute('height', '20000');
  const cover = document.createElementNS(SVG_NS, 'rect');
  cover.setAttribute('x', String(left));
  cover.setAttribute('y', '-10000');
  cover.setAttribute('width', String(width));
  cover.setAttribute('height', '20000');
  cover.setAttribute('fill', `url(#${id}-gradient)`);
  mask.appendChild(cover);

  defs.append(gradient, mask);
  group.setAttribute('mask', `url(#${id})`);
}
