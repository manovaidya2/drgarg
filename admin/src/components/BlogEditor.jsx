import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { TableKit } from "@tiptap/extension-table";
import { Node } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo2,
  Redo2,
  Link2,
  Unlink,
  ImagePlus,
  Save,
  Eye,
  Upload,
  History,
  RotateCcw,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import api from "../api/axiosInstance";
import BlogMediaPicker from "./BlogMediaPicker";
import BlogFormattingTools from "./BlogFormattingTools";
import BlogImageControls from "./BlogImageControls";
import { liveBlogUrl } from "../../../shared/blogSeo.mjs";
import toast from "react-hot-toast";

const initial = {
  title: "",
  slug: "",
  category: "",
  content: "",
  shortDescription: "",
  image: "",
  imageAlt: "",
  primaryKeyword: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  authorName: "Dr. Ankush Garg",
  authorProfileUrl: "https://drankushgarg.in/about",
  authorCredentials: "",
  publishedDate: "",
  reviewedDate: "",
  medicalDisclaimer: "",
  schemaEnabled: true,
  noIndex: false,
  noFollow: false,
  status: "draft",
  faq: [],
  revision: 0,
};
const fields = [
  ["title", "blog-title", "Title"],
  ["slug", "blog-slug", "Slug"],
  ["category", "blog-category", "Category"],
  ["shortDescription", "blog-excerpt", "Excerpt"],
  ["primaryKeyword", "seo-primary-keyword", "Primary keyword"],
  ["metaTitle", "seo-meta-title", "Meta title"],
  ["metaDescription", "seo-meta-description", "Meta description"],
  ["metaKeywords", "seo-keywords", "Keywords"],
  ["canonicalUrl", "seo-canonical", "Canonical URL"],
  ["authorName", "article-author", "Author"],
  ["authorProfileUrl", "article-author-url", "Author profile URL"],
  ["authorCredentials", "article-credentials", "Credentials"],
  ["publishedDate", "article-published-date", "Published date", "date"],
  ["reviewedDate", "article-reviewed-date", "Reviewed date", "date"],
  ["medicalDisclaimer", "medical-disclaimer", "Medical disclaimer"],
  ["ogTitle", "og-title", "Open Graph title"],
  ["ogDescription", "og-description", "Open Graph description"],
  ["twitterTitle", "twitter-title", "Twitter title"],
  ["twitterDescription", "twitter-description", "Twitter description"],
];
const PersistentImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null },
      height: { default: null },
      linkHref: { default: null, rendered: false },
      linkTarget: { default: null, rendered: false },
      linkRel: { default: null, rendered: false },
      mediaId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-media-id"),
        renderHTML: (attributes) =>
          attributes.mediaId ? { "data-media-id": attributes.mediaId } : {},
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        priority: 60,
        getAttrs: (element) => {
          const image =
            element.children.length === 1 && element.firstElementChild;
          if (!image || image.tagName !== "IMG") return false;
          return {
            src: image.getAttribute("src"),
            alt: image.getAttribute("alt"),
            title: image.getAttribute("title"),
            width: image.getAttribute("width"),
            height: image.getAttribute("height"),
            mediaId: image.getAttribute("data-media-id"),
            linkHref: element.getAttribute("href"),
            linkTarget: element.getAttribute("target"),
            linkRel: element.getAttribute("rel"),
          };
        },
      },
      { tag: "img[src]" },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const width = Number(node.attrs.width),
      height = Number(node.attrs.height);
    if (width > 0 && height > 0)
      HTMLAttributes.style = `aspect-ratio: ${width} / ${height}; height: auto`;
    const image = ["img", HTMLAttributes];
    return node.attrs.linkHref
      ? [
          "a",
          {
            href: node.attrs.linkHref,
            target: node.attrs.linkTarget,
            rel:
              node.attrs.linkTarget === "_blank"
                ? `${node.attrs.linkRel || ""} noopener noreferrer`.trim()
                : node.attrs.linkRel,
          },
          image,
        ]
      : image;
  },
});
const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  addAttributes: () => ({
    src: { default: "" },
    title: { default: "Video" },
    width: { default: "100%" },
    height: { default: "450" },
    allowfullscreen: { default: true },
  }),
  parseHTML: () => [{ tag: "iframe" }],
  renderHTML: ({ HTMLAttributes }) => ["iframe", HTMLAttributes],
});
const Tool = ({ id, title, icon: Icon, onClick, active, disabled }) => (
  <button
    id={id}
    type="button"
    title={title}
    aria-label={title}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    className={`grid h-9 w-9 place-items-center rounded border disabled:opacity-40 ${active ? "border-emerald-700 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-700"}`}
  >
    <Icon size={17} />
  </button>
);

export default function BlogEditor({ postId }) {
  const [form, setForm] = useState(initial),
    [id, setId] = useState(postId),
    [loading, setLoading] = useState(Boolean(postId)),
    [busy, setBusy] = useState(false);
  const [error, setError] = useState(""),
    [result, setResult] = useState(null),
    [validation, setValidation] = useState(null);
  const [mediaTarget, setMediaTarget] = useState(null),
    [link, setLink] = useState(null),
    [revisions, setRevisions] = useState(null),
    [previewUrl, setPreviewUrl] = useState("");
  const selection = useRef(null),
    slugEdited = useRef(Boolean(postId)),
    navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          HTMLAttributes: { target: null, rel: null },
        },
      }),
      PersistentImage.configure({ allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      FontSize,
      Color,
      Highlight.configure({ multicolor: true }),
      TableKit,
      VideoEmbed,
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    editorProps: {
      handleDOMEvents: {
        click: (view, event) => {
          const anchor = event.target.closest?.("a");
          if (!anchor || !view.dom.contains(anchor)) return false;
          event.preventDefault();
          return true;
        },
      },
      handleClickOn: (view, _position, node, nodePosition, event) => {
        if (node.type.name !== "image") return false;
        event.preventDefault();
        view.dispatch(
          view.state.tr.setSelection(
            NodeSelection.create(view.state.doc, nodePosition),
          ),
        );
        return true;
      },
      attributes: {
        id: "blog-content",
        "data-testid": "blog-content",
        "aria-label": "Article body",
        class: "cms-article-editor",
      },
      handlePaste: (view, event) => {
        if (
          !/class=["']?Mso|urn:schemas-microsoft/i.test(
            event.clipboardData?.getData("text/html") || "",
          )
        )
          return false;
        event.preventDefault();
        view.dispatch(
          view.state.tr.insertText(event.clipboardData.getData("text/plain")),
        );
        return true;
      },
    },
  });
  const hydrateForm = (data) => {
    const next = {
      ...initial,
      ...data,
      publishedDate: data.publishedDate?.slice(0, 10) || "",
      reviewedDate: data.reviewedDate?.slice(0, 10) || "",
      faq: data.faq || [],
    };
    setForm(next);
    editor?.commands.setContent(next.content || "", { emitUpdate: false });
    setId(data.id || data._id);
  };
  useEffect(() => {
    if (!editor) return;
    let alive = true;
    if (!postId) {
      setLoading(false);
      return;
    }
    api
      .get(`/blogs/cms/${postId}`, { timeout: 120000 })
      .then(({ data }) => {
        if (alive) hydrateForm(data);
      })
      .catch((err) => {
        if (alive)
          setError(err.response?.data?.message || "Blog could not be loaded.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [postId, editor]);
  const change = (field, value) => {
    if (field === "slug") slugEdited.current = true;
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "slug" &&
      (!current.canonicalUrl ||
        current.canonicalUrl === liveBlogUrl(current.slug))
        ? { canonicalUrl: liveBlogUrl(value.trim().toLowerCase()) }
        : {}),
      ...(field === "title" && !id && !slugEdited.current
        ? {
            slug: value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, ""),
          }
        : {}),
    }));
  };
  const persist = async (status) => {
    const body = {
      ...Object.fromEntries(
        Object.keys(initial).map((key) => [key, form[key]]),
      ),
      imageMediaId: form.imageMediaId,
      content: editor?.getHTML() || form.content,
      status,
      published: status === "published",
    };
    const response = id
      ? await api.patch(`/blogs/cms/${id}`, body, { timeout: 120000 })
      : await api.post(
          "/blogs",
          { ...body, status: "draft", published: false },
          { timeout: 120000 },
        );
    const data = response.data;
    setPreviewUrl("");
    hydrateForm(data.blog);
    setValidation(data.validation);
    setResult(data);
    return data;
  };
  const act = async (action) => {
    if (busy) return;
    const previewWindow =
      action === "preview" ? window.open("about:blank", "_blank") : null;
    if (previewWindow) previewWindow.opener = null;
    setBusy(true);
    setError("");
    try {
      if (action === "update") {
        await persist("published");
        toast.success("Published blog updated successfully.");
      } else {
        const saved = await persist("draft");
        if (action === "publish") {
          const { data } = await api.post(
            `/blogs/cms/${saved.post_id}/publish`,
            { revision: saved.blog.revision },
            { timeout: 120000 },
          );
          hydrateForm(data.blog);
          setResult(data);
          setValidation(data.validation);
          toast.success("Blog published successfully.");
        }
        if (action === "preview") {
          const { data } = await api.post(
            `/blogs/cms/${saved.post_id}/preview`,
            {},
            { timeout: 120000 },
          );
          setValidation(data.validation);
          const url = new URL(data.preview_url);
          const previewHref = import.meta.env.DEV
            ? `${new URL(api.defaults.baseURL, window.location.origin).origin}${url.pathname}${url.search}`
            : url.href;
          setPreviewUrl(previewHref);
          if (previewWindow && !previewWindow.closed) {
            previewWindow.location.replace(previewHref);
            toast.success("Preview opened successfully.");
          } else {
            toast.success("Preview ready. Select Open Preview to view it.");
          }
        }
        if (action === "draft") toast.success("Draft saved successfully.");
      }
    } catch (err) {
      previewWindow?.close();
      const message =
        err.response?.data?.message ||
        (action === "preview"
          ? "Preview could not be opened."
          : "Blog could not be saved.");
      setError(message);
      toast.error(message);
      if (err.response?.data?.validation)
        setValidation(err.response.data.validation);
    } finally {
      setBusy(false);
    }
  };
  const openLink = () => {
    if (!editor) return;
    if (editor.isActive("link"))
      editor.chain().focus().extendMarkRange("link").run();
    const { from, to } = editor.state.selection,
      attrs = editor.getAttributes("link");
    setLink({
      from,
      to,
      text: editor.state.doc.textBetween(from, to, " "),
      href: attrs.href || "",
      newTab: attrs.target === "_blank",
      rel: attrs.rel || "",
    });
  };
  const insertLink = () => {
    try {
      const url = new URL(link.href, "https://drankushgarg.in");
      if (
        !link.href.trim() ||
        !["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ||
        (!link.image && !link.text.trim())
      )
        throw new Error();
      if (link.image) {
        editor
          .chain()
          .focus()
          .setNodeSelection(link.from)
          .updateAttributes("image", {
            linkHref: url.href,
            linkTarget: link.newTab ? "_blank" : null,
            linkRel: link.rel || null,
          })
          .run();
        setLink(null);
        return;
      }
      editor
        .chain()
        .focus()
        .insertContentAt(
          { from: link.from, to: link.to },
          {
            type: "text",
            text: link.text,
            marks: [
              {
                type: "link",
                attrs: {
                  href: url.href,
                  target: link.newTab ? "_blank" : null,
                  rel: link.rel || null,
                },
              },
            ],
          },
        )
        .run();
      setLink(null);
    } catch {
      setError("A link needs anchor text and a valid URL.");
    }
  };
  const selectMedia = (item) => {
    if (mediaTarget === "inline") {
      const chain = editor.chain().focus();
      if (selection.current !== null) chain.setTextSelection(selection.current);
      chain
        .setImage({
          src: item.url,
          alt: item.alt,
          title: item.caption || "",
          mediaId: item._id,
        })
        .run();
    } else if (mediaTarget === "image")
      setForm((prev) => ({
        ...prev,
        image: item.url,
        imageAlt: item.alt,
        imageMediaId: item._id,
      }));
    else change(mediaTarget, item.url);
    setMediaTarget(null);
  };
  const history = async () => {
    try {
      const { data } = await api.get(`/blogs/cms/${id}/revisions`);
      setRevisions(data.revisions);
    } catch (err) {
      setError(err.response?.data?.message || "History could not be loaded.");
    }
  };
  const rollback = async (revisionId) => {
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post(
        `/blogs/cms/${id}/rollback/${revisionId}`,
        { revision: form.revision },
      );
      hydrateForm(data.blog);
      setResult(data);
      setValidation(data.validation);
      await history();
    } catch (err) {
      setError(err.response?.data?.message || "Rollback failed.");
    } finally {
      setBusy(false);
    }
  };
  const verifyLive = async () => {
    setBusy(true);
    setError("");
    try {
      const { data } = await api.post(`/blogs/cms/${id}/verify`);
      setResult((current) => ({
        ...(current || { status: form.liveStatus, post_id: id, blog: form }),
        verification: { ...data.verification, message: data.message },
      }));
    } catch (err) {
      setError(
        [
          err.response?.data?.message || "Live verification failed.",
          ...(err.response?.data?.verification?.errors || []),
        ].join(" "),
      );
    } finally {
      setBusy(false);
    }
  };
  if (loading) return <p role="status">Loading blog...</p>;
  return (
    <section className="mx-auto max-w-6xl">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">
            {id ? "Edit Blog" : "New Blog"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {form.liveStatus || "draft"}
            {form.hasDraft ? " / unpublished changes" : ""}
          </p>
        </div>
        <button
          id="back-to-blogs"
          type="button"
          onClick={() => navigate("/blog-list")}
          className="cms-button"
        >
          Back to Blogs
        </button>
      </header>
      {error && (
        <p
          className="mb-4 border-l-4 border-red-600 bg-red-50 p-3 text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}
      {result && (
        <div
          role="status"
          className="mb-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-sm"
        >
          <p>
            Saved {result.status}. Post {result.post_id}, revision{" "}
            {result.blog.revision}.
          </p>
          {result.live_url && (
            <a
              id="live-blog-url"
              href={result.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all underline"
            >
              {result.live_url}
            </a>
          )}
          <p>{result.verification?.message}</p>
        </div>
      )}
      <button
        id="normalize-blog-content"
        type="button"
        className="cms-button mb-3"
        onClick={async () => {
          try {
            const { data } = await api.post("/blogs/cms/normalize", {
              content: editor.getHTML(),
            });
            editor.commands.setContent(data.content);
          } catch (err) {
            setError(
              err.response?.data?.message ||
                "Formatting could not be normalized.",
            );
          }
        }}
      >
        Normalize Formatting
      </button>
      {id && form.liveStatus === "published" && (
        <button
          id="verify-live-blog"
          type="button"
          disabled={busy}
          onClick={verifyLive}
          className="cms-button mb-3 ml-2"
        >
          Verify Live URL
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          act("draft");
        }}
      >
        <div className="grid gap-4 border-b border-slate-200 pb-5 md:grid-cols-2">
          {fields.map(([name, fieldId, label, type]) => (
            <label
              key={name}
              htmlFor={fieldId}
              className="min-w-0 text-sm font-medium text-slate-700"
            >
              {label}
              {[
                "shortDescription",
                "metaDescription",
                "medicalDisclaimer",
                "ogDescription",
                "twitterDescription",
              ].includes(name) ? (
                <textarea
                  id={fieldId}
                  name={name}
                  value={form[name] || ""}
                  onChange={(e) => change(name, e.target.value)}
                  className="cms-input"
                  rows={3}
                />
              ) : (
                <input
                  id={fieldId}
                  name={name}
                  type={type || "text"}
                  value={form[name] || ""}
                  onChange={(e) => {
                    change(name, e.target.value);
                  }}
                  className="cms-input"
                />
              )}
            </label>
          ))}
        </div>
        <div className="grid gap-4 border-b border-slate-200 py-5 md:grid-cols-3">
          {[
            ["image", "featured-image", "Featured image"],
            ["ogImage", "og-image", "Open Graph image"],
            ["twitterImage", "twitter-image", "Twitter image"],
          ].map(([name, fieldId, label]) => (
            <div key={name} className="min-w-0">
              <label htmlFor={fieldId} className="text-sm font-medium">
                {label}
                <input
                  id={fieldId}
                  value={form[name] || ""}
                  onChange={(e) => change(name, e.target.value)}
                  className="cms-input"
                />
              </label>
              <button
                id={`${fieldId}-select`}
                type="button"
                onClick={() => setMediaTarget(name)}
                className="cms-button mt-2"
              >
                <ImagePlus size={16} />
                Select / Upload
              </button>
              {form[name] && (
                <img
                  src={form[name]}
                  alt={form.imageAlt || ""}
                  className="mt-3 h-32 w-full object-contain"
                />
              )}
            </div>
          ))}
          <label className="text-sm font-medium">
            Featured image alt
            <input
              id="featured-image-alt"
              value={form.imageAlt || ""}
              onChange={(e) => change("imageAlt", e.target.value)}
              className="cms-input"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-5 py-4">
          <label className="text-sm">
            Robots
            <select
              id="seo-robots"
              value={`${form.noIndex ? "noindex" : "index"},${form.noFollow ? "nofollow" : "follow"}`}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  noIndex: e.target.value.startsWith("noindex"),
                  noFollow: e.target.value.endsWith("nofollow"),
                }))
              }
              className="cms-input"
            >
              <option>index,follow</option>
              <option>index,nofollow</option>
              <option>noindex,follow</option>
              <option>noindex,nofollow</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              id="schema-enabled"
              type="checkbox"
              checked={form.schemaEnabled !== false}
              onChange={(e) => change("schemaEnabled", e.target.checked)}
            />
            Structured data
          </label>
        </div>
        <div className="my-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
            <select
              id="editor-block-style"
              aria-label="Paragraph style"
              className="h-9 rounded border border-slate-200 bg-white px-2 text-sm"
              onChange={(e) =>
                e.target.value === "p"
                  ? editor.chain().focus().setParagraph().run()
                  : editor
                      .chain()
                      .focus()
                      .setHeading({ level: Number(e.target.value) })
                      .run()
              }
              value={
                [2, 3, 4].find((level) =>
                  editor.isActive("heading", { level }),
                ) || "p"
              }
            >
              <option value="p">Paragraph</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
              <option value="4">H4</option>
            </select>
            {[
              [Bold, "bold", "Bold", "toggleBold"],
              [Italic, "italic", "Italic", "toggleItalic"],
              [List, "bulletList", "Bullet list", "toggleBulletList"],
              [
                ListOrdered,
                "orderedList",
                "Numbered list",
                "toggleOrderedList",
              ],
              [Quote, "blockquote", "Blockquote", "toggleBlockquote"],
              [Minus, null, "Separator", "setHorizontalRule"],
              [Undo2, null, "Undo", "undo"],
              [Redo2, null, "Redo", "redo"],
            ].map(([Icon, mark, title, command]) => (
              <Tool
                key={command}
                id={`editor-${command}`}
                icon={Icon}
                title={title}
                active={mark ? editor?.isActive(mark) : undefined}
                onClick={() => editor?.chain().focus()[command]().run()}
              />
            ))}
            <Tool
              id="editor-link"
              icon={Link2}
              title="Insert or edit link"
              onClick={openLink}
            />
            <Tool
              id="editor-unlink"
              icon={Unlink}
              title="Remove link"
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run()
              }
            />
            <Tool
              id="editor-image"
              icon={ImagePlus}
              title="Insert inline image"
              onClick={() => {
                selection.current = editor.state.selection.from;
                setMediaTarget("inline");
              }}
            />
            <BlogFormattingTools
              editor={editor}
              openImageLink={() => {
                const attrs = editor.getAttributes("image");
                setLink({
                  image: true,
                  from: editor.state.selection.from,
                  text: "",
                  href: attrs.linkHref || "",
                  newTab: attrs.linkTarget === "_blank",
                  rel: (attrs.linkRel || "")
                    .split(/\s+/)
                    .filter((value) =>
                      ["nofollow", "sponsored"].includes(value),
                    )
                    .join(" "),
                });
              }}
            />
          </div>
          <BlogImageControls editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <section className="border-t border-slate-200 py-4">
          <header className="flex items-center justify-between">
            <h2 className="font-semibold">FAQs</h2>
            <button
              id="add-faq"
              type="button"
              onClick={() =>
                change("faq", [...form.faq, { question: "", answer: "" }])
              }
              className="cms-button"
            >
              <Plus size={16} />
              Add FAQ
            </button>
          </header>
          {form.faq.map((faq, index) => (
            <div
              key={faq._id || index}
              className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                id={`faq-question-${index}`}
                aria-label={`FAQ question ${index + 1}`}
                value={faq.question}
                onChange={(e) =>
                  change(
                    "faq",
                    form.faq.map((item, i) =>
                      i === index
                        ? { ...item, question: e.target.value }
                        : item,
                    ),
                  )
                }
                className="cms-input"
              />
              <textarea
                id={`faq-answer-${index}`}
                aria-label={`FAQ answer ${index + 1}`}
                value={faq.answer}
                onChange={(e) =>
                  change(
                    "faq",
                    form.faq.map((item, i) =>
                      i === index ? { ...item, answer: e.target.value } : item,
                    ),
                  )
                }
                className="cms-input"
              />
              <Tool
                id={`remove-faq-${index}`}
                icon={Trash2}
                title="Remove FAQ"
                onClick={() =>
                  change(
                    "faq",
                    form.faq.filter((_, i) => i !== index),
                  )
                }
              />
            </div>
          ))}
        </section>
        {validation && (
          <section
            id="blog-validation"
            className="border-t border-slate-200 py-4 text-sm"
          >
            <h2 className="mb-2 font-semibold">Validation</h2>
            {validation.errors?.map((item) => (
              <p key={item} className="text-red-700">
                {item}
              </p>
            ))}
            {validation.warnings?.map((item) => (
              <p key={item} className="text-amber-800">
                {item}
              </p>
            ))}
            <p className="mt-2 text-slate-500">
              {validation.info?.wordCount || 0} words;{" "}
              {validation.info?.internalLinks || 0} internal links;{" "}
              {validation.info?.imageCount || 0} inline images
            </p>
          </section>
        )}
        {previewUrl && (
          <a
            id="open-blog-preview"
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="my-3 block break-all text-emerald-800 underline"
          >
            Open Preview
          </a>
        )}
        <footer className="sticky bottom-0 flex flex-wrap gap-2 border-t border-slate-200 bg-white/95 py-3">
          <button
            id="save-draft"
            type="submit"
            disabled={busy}
            className="cms-button"
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            id="preview-blog"
            type="button"
            disabled={busy}
            onClick={() => act("preview")}
            className="cms-button"
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            id={
              form.liveStatus === "published" ? "update-blog" : "publish-blog"
            }
            type="button"
            disabled={busy}
            onClick={() =>
              act(form.liveStatus === "published" ? "update" : "publish")
            }
            className="cms-button bg-emerald-700 text-white"
          >
            <Upload size={16} />
            {form.liveStatus === "published"
              ? "Update Published Blog"
              : "Publish"}
          </button>
          {id && (
            <button
              id="blog-history"
              type="button"
              onClick={history}
              className="cms-button"
            >
              <History size={16} />
              Revisions
            </button>
          )}
          {busy && (
            <span role="status" className="p-2 text-sm">
              Saving...
            </span>
          )}
        </footer>
      </form>
      {mediaTarget && (
        <BlogMediaPicker
          onClose={() => setMediaTarget(null)}
          onSelect={selectMedia}
        />
      )}
      {link && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-3"
          role="dialog"
          aria-modal="true"
          aria-labelledby="link-heading"
        >
          <section className="w-full max-w-lg rounded-lg bg-white p-5">
            <header className="mb-4 flex justify-between">
              <h2 id="link-heading" className="font-semibold">
                {link.image ? "Image link" : "Text link"}
              </h2>
              <Tool
                id="close-link-dialog"
                icon={X}
                title="Close link"
                onClick={() => setLink(null)}
              />
            </header>
            {!link.image && (
              <label>
                Anchor text
                <input
                  id="link-anchor"
                  value={link.text}
                  onChange={(e) => setLink({ ...link, text: e.target.value })}
                  className="cms-input"
                />
              </label>
            )}
            <label>
              URL
              <input
                id="link-url"
                value={link.href}
                onChange={(e) => setLink({ ...link, href: e.target.value })}
                className="cms-input"
              />
            </label>
            <label className="my-3 flex gap-2">
              <input
                id="link-new-tab"
                type="checkbox"
                checked={link.newTab}
                onChange={(e) => setLink({ ...link, newTab: e.target.checked })}
              />
              New tab
            </label>
            <label>
              Relationship
              <select
                id="link-rel"
                value={link.rel}
                onChange={(e) => setLink({ ...link, rel: e.target.value })}
                className="cms-input"
              >
                <option value="">Normal reference</option>
                <option value="nofollow">nofollow</option>
                <option value="sponsored">sponsored</option>
                <option value="nofollow sponsored">nofollow sponsored</option>
              </select>
            </label>
            <button
              id="apply-link"
              type="button"
              onClick={insertLink}
              className="cms-button mt-4"
            >
              Apply Link
            </button>
          </section>
        </div>
      )}
      {revisions && (
        <section
          id="blog-revisions"
          className="mt-5 border-t border-slate-200 py-4"
        >
          <h2 className="mb-3 font-semibold">Revision History</h2>
          {revisions.map((revision) => (
            <div
              key={revision._id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 text-sm"
            >
              <span>
                Revision {revision.number} / {revision.action} /{" "}
                {revision.actorId} /{" "}
                {new Date(revision.createdAt).toLocaleString()}
              </span>
              <button
                id={`rollback-${revision.number}`}
                type="button"
                disabled={busy || revision.number === form.revision}
                onClick={() => rollback(revision._id)}
                className="cms-button"
              >
                <RotateCcw size={16} />
                Rollback
              </button>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
