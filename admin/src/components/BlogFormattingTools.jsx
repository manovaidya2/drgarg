import React, { useRef } from "react";
import {
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser,
  Link2,
  Pencil,
  Unlink,
  Highlighter,
} from "lucide-react";

export default function BlogFormattingTools({ editor, openImageLink }) {
  const selection = useRef(null);
  const remember = () => {
    selection.current = editor.state.selection;
  };
  const restore = () => {
    const chain = editor.chain().focus();
    if (selection.current)
      chain.setTextSelection({
        from: selection.current.from,
        to: selection.current.to,
      });
    return chain;
  };
  const button = (id, title, Icon, action, active, disabled = false) => (
    <button
      key={id}
      id={`editor-${id}`}
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={action}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded border disabled:opacity-40 ${active ? "border-emerald-700 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700"}`}
    >
      {React.createElement(Icon, { size: 17 })}
    </button>
  );
  const image = editor.isActive("image");
  const linked = Boolean(editor.getAttributes("image").linkHref);
  const color = (value, fallback) =>
    /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
  return (
    <>
      {button(
        "toggleUnderline",
        "Underline",
        Underline,
        () => editor.chain().focus().toggleUnderline().run(),
        editor.isActive("underline"),
      )}
      {button(
        "toggleStrike",
        "Strikethrough",
        Strikethrough,
        () => editor.chain().focus().toggleStrike().run(),
        editor.isActive("strike"),
      )}
      {[
        ["left", AlignLeft],
        ["center", AlignCenter],
        ["right", AlignRight],
        ["justify", AlignJustify],
      ].map(([align, Icon]) =>
        button(
          `align-${align}`,
          `Align ${align}`,
          Icon,
          () => editor.chain().focus().setTextAlign(align).run(),
          editor.isActive({ textAlign: align }),
        ),
      )}
      <select
        id="editor-font-size"
        aria-label="Font size"
        title="Font size"
        className="h-9 rounded border border-slate-200 bg-white px-2 text-sm"
        value={editor.getAttributes("textStyle").fontSize || ""}
        onPointerDown={remember}
        onFocus={remember}
        onChange={(event) =>
          event.target.value
            ? restore().setFontSize(event.target.value).run()
            : restore().unsetFontSize().run()
        }
      >
        <option value="">Font size</option>
        {[12, 14, 16, 18, 20, 24, 28, 32, 40, 48].map((size) => (
          <option key={size} value={`${size}px`}>
            {size} px
          </option>
        ))}
      </select>
      <input
        id="editor-text-color"
        type="color"
        title="Text color"
        aria-label="Text color"
        className="h-9 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1"
        value={color(editor.getAttributes("textStyle").color, "#000000")}
        onPointerDown={remember}
        onFocus={remember}
        onChange={(event) => restore().setColor(event.target.value).run()}
      />
      <input
        id="editor-highlight-color"
        type="color"
        title="Highlight color"
        aria-label="Highlight color"
        className="h-9 w-10 cursor-pointer rounded border border-slate-200 bg-white p-1"
        value={color(editor.getAttributes("highlight").color, "#ffff00")}
        onPointerDown={remember}
        onFocus={remember}
        onChange={(event) =>
          restore().setHighlight({ color: event.target.value }).run()
        }
      />
      {button(
        "highlight",
        "Toggle highlight",
        Highlighter,
        () =>
          editor
            .chain()
            .focus()
            .toggleHighlight({
              color: editor.getAttributes("highlight").color || "#ffff00",
            })
            .run(),
        editor.isActive("highlight"),
      )}
      {button("clear", "Clear formatting", Eraser, () =>
        editor
          .chain()
          .focus()
          .unsetAllMarks()
          .clearNodes()
          .unsetTextAlign()
          .run(),
      )}
      <div
        className="flex w-full flex-wrap items-center gap-1 border-t border-slate-200 pt-2"
        role="group"
        aria-label="Image link tools"
      >
        <span className="mr-2 text-sm text-slate-600">Image links</span>
        {button(
          "image-link",
          "Add image link",
          Link2,
          openImageLink,
          false,
          !image || linked,
        )}
        {button(
          "image-link-edit",
          "Edit image link",
          Pencil,
          openImageLink,
          false,
          !image || !linked,
        )}
        {button(
          "image-unlink",
          "Remove image link",
          Unlink,
          () =>
            editor
              .chain()
              .focus()
              .updateAttributes("image", {
                linkHref: null,
                linkTarget: null,
                linkRel: null,
              })
              .run(),
          false,
          !image || !linked,
        )}
      </div>
    </>
  );
}
