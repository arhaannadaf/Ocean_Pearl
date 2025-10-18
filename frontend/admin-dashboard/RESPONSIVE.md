What I changed

- Added responsive CSS helpers in `templates/base.html`:
  - `.chart-responsive`, `.chart-aspect-16-9`, `.chart-aspect-4-3` to keep charts sized correctly.
  - Small mobile media rules to reduce KPI font sizes and padding.
- Introduced `safePlotlyNewPlot(elId, data, layout, config)` in `templates/base.html`:
  - Calls `Plotly.newPlot` with `config.responsive = true` and attaches a `ResizeObserver` to call `Plotly.Plots.resize` when the container changes size.
- Updated all templates that render Plotly charts to:
  - Wrap chart target divs in `<div class="chart-responsive chart-aspect-..." id="..."></div>`.
  - Use `safePlotlyNewPlot(...)` instead of `Plotly.newPlot(...)`.
- Ensured tables use `.table-responsive` (already present) so wide tables scroll on narrow screens.

How to tweak

- To change a chart's aspect ratio, swap the `chart-aspect-16-9` class to `chart-aspect-4-3` (or add a custom class with a different `aspect-ratio`).
- If you want charts taller on mobile, add a small CSS rule targeting `.chart-responsive` at `max-width: 576px`.

Notes & next steps

- I did not change any Python code; only templates and a small doc were edited.
- I verified `app.py` compiles with Python syntax check.
- Next recommendations before deploying:
  - Run the Flask app locally and open key pages (dashboard, forecasting, peak hours, menu engineering) on mobile and desktop emulators.
  - If you use Chart.js or other charting libraries in the future, reuse `safePlotlyNewPlot` pattern or create a generic chart-resize helper.
  - For production, consider bundling/local assets or pinning Bootstrap/Plotly versions.
