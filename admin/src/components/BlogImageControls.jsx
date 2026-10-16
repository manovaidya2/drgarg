import React from "react";
import { RotateCcw } from "lucide-react";

export default function BlogImageControls({ editor }) {
  if (!editor.isActive("image")) return null;
  const attrs = editor.getAttributes("image");
  const update = (next) => editor.commands.updateAttributes("image", next);
  const setHeight = (height) => {
    const node = editor.view.nodeDOM(editor.state.selection.from);
    const image = node?.matches?.("img") ? node : node?.querySelector?.("img");
    update({
      height,
      ...(height && !attrs.width
        ? {
            width: Math.round(
              image?.getBoundingClientRect().width ||
                image?.naturalWidth ||
                600,
            ),
          }
        : {}),
    });
  };
  const dimension = (value) =>
    value === ""
      ? null
      : Math.min(2400, Math.max(1, Math.round(Number(value)) || 1));
  return (
    <section
      aria-label="Selected image"
      className="grid gap-3 border-b border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="min-w-0 text-sm">
        Image width (px)
        <input
          id="inline-image-width"
          type="number"
          min="1"
          max="2400"
          placeholder="Original"
          className="cms-input"
          value={attrs.width || ""}
          onChange={(event) => update({ width: dimension(event.target.value) })}
        />
        <input
          id="inline-image-size"
          type="range"
          aria-label="Image width"
          min="40"
          max="1600"
          step="10"
          className="mt-2 w-full accent-emerald-700"
          value={Math.min(1600, Math.max(40, Number(attrs.width) || 600))}
          onChange={(event) => update({ width: Number(event.target.value) })}
        />
      </label>
      <label className="min-w-0 text-sm">
        Image height (px)
        <input
          id="inline-image-height"
          type="number"
          min="1"
          max="2400"
          placeholder="Auto"
          className="cms-input"
          value={attrs.height || ""}
          onChange={(event) => setHeight(dimension(event.target.value))}
        />
        <span className="mt-2 flex items-center gap-2">
          <input
            id="inline-image-auto-height"
            type="checkbox"
            checked={!attrs.height}
            onChange={(event) =>
              setHeight(
                event.target.checked
                  ? null
                  : Math.round(Number(attrs.width) || 600),
              )
            }
          />
          Auto height
        </span>
      </label>
      <label className="min-w-0 text-sm">
        Image alt
        <input
          id="inline-image-alt"
          className="cms-input"
          value={attrs.alt || ""}
          onChange={(event) => update({ alt: event.target.value })}
        />
      </label>
      <label className="min-w-0 text-sm">
        Image title
        <input
          id="inline-image-title"
          className="cms-input"
          value={attrs.title || ""}
          onChange={(event) => update({ title: event.target.value })}
        />
      </label>
      <button
        id="inline-image-reset"
        type="button"
        title="Reset image size"
        aria-label="Reset image size"
        className="grid h-9 w-9 place-items-center rounded border border-slate-200 bg-white"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => update({ width: null, height: null })}
      >
        <RotateCcw size={17} />
      </button>
    </section>
  );
}
