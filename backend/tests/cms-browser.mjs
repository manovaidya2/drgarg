import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import net from "node:net";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import sharp from "sharp";
import { createEnvironment, testPassword } from "./environment.mjs";
import { checkFormatting, checkImages } from "./editor-controls.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const env = await createEnvironment();
const port = await new Promise((resolve) => {
  const server = net.createServer();
  server.listen(0, "127.0.0.1", () => {
    const value = server.address().port;
    server.close(() => resolve(value));
  });
});
const vite = spawn(
  process.execPath,
  [
    path.join(root, "admin/node_modules/vite/bin/vite.js"),
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    cwd: path.join(root, "admin"),
    env: { ...process.env, VITE_API_URL: env.origin },
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let viteOutput = "";
vite.stdout.on("data", (chunk) => {
  viteOutput += chunk;
});
vite.stderr.on("data", (chunk) => {
  viteOutput += chunk;
});
let browser;
try {
  for (let i = 0; i < 200; i++) {
    if (vite.exitCode !== null) throw new Error(viteOutput);
    try {
      await fetch(`http://127.0.0.1:${port}`);
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  await env.login();
  const created = await env.request("/api/blogs", {
    method: "POST",
    data: {
      title: "Autism vs ADHD acceptance fixture",
      slug: "autism-vs-adhd-differences-children",
      content:
        "<p>## Assessment</p><p>Clinical statement unchanged. Read autism and ADHD for context.</p>",
      metaTitle: "Exact acceptance title",
      metaDescription: "Exact acceptance description",
      authorName: "Dr. Ankush Garg",
      medicalDisclaimer: "Educational information only.",
    },
  });
  assert.equal(created.status, 201);
  const id = created.json.post_id;
  browser = await chromium.launch();
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    let current = await env.request(`/api/blogs/cms/${id}`);
    if (current.json.liveStatus === "published") {
      assert.equal((await env.request(`/api/blogs/cms/${id}/unpublish`, { method: "POST", data: {} })).status, 200);
      current = await env.request(`/api/blogs/cms/${id}`);
    }
    const reset = await env.request(`/api/blogs/cms/${id}`, {
      method: "PATCH",
      data: {
        revision: current.json.revision,
        status: "draft",
        content:
          "<h2>Assessment</h2><p>Clinical statement unchanged. Read autism and ADHD for context.</p>",
        image: "",
        imageAlt: "",
      },
    });
    assert.equal(reset.status, 200);
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (/hydration|did not match|server html/i.test(message.text()))
        errors.push(message.text());
    });
    await page.goto(`http://127.0.0.1:${port}`);
    await page.locator('input[type="text"]').first().fill("fixture-editor");
    await page.locator('input[type="password"]').fill(testPassword);
    await page.getByRole("button", { name: "Sign In", exact: true }).click();
    await page.waitForURL("**/blog-list");
    assert.equal(
      await page
        .getByRole("link", { name: "Appointments", exact: true })
        .count(),
      0,
    );
    await page
      .locator("#blog-search")
      .fill("autism-vs-adhd-differences-children");
    await page.getByTestId(`edit-blog-${id}`).click();
    await page
      .locator("#blog-content h2")
      .waitFor()
      .catch(async (error) => {
        throw new Error(
          `${error.message}; browser errors: ${errors.join("; ")}; body: ${(await page.locator("body").innerText()).slice(0, 1500)}`,
        );
      });
    assert.equal(
      await page.locator("#blog-slug").inputValue(),
      "autism-vs-adhd-differences-children",
    );
    await page.locator("#article-published-date").fill("2026-10-01");
    await page.locator("#blog-slug").fill("autism-vs-adhd-edited");
    assert.equal(await page.locator("#seo-canonical").inputValue(), "https://drankushgarg.in/blog/autism-vs-adhd-edited");
    await page.locator("#blog-slug").fill("autism-vs-adhd-differences-children");
    await page.locator("#blog-content").evaluate((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode()))
        if (node.textContent.includes("autism and ADHD")) break;
      const from = node.textContent.indexOf("autism and ADHD");
      const range = document.createRange();
      range.setStart(node, from);
      range.setEnd(node, from + "autism and ADHD".length);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      element.dispatchEvent(new Event("selectionchange", { bubbles: true }));
    });
    await page.locator("#editor-link").click();
    assert.equal(
      await page.locator("#link-anchor").inputValue(),
      "autism and ADHD",
    );
    await page.locator("#link-url").fill("/autism-adhd");
    await page.locator("#apply-link").click();
    assert.equal(
      await page.locator("#blog-content a").innerText(),
      "autism and ADHD",
    );
    assert.equal(
      await page.locator("#blog-content p").first().innerText(),
      "Clinical statement unchanged. Read autism and ADHD for context.",
    );
    await checkFormatting(page);
    await page.locator("#featured-image-select").click();
    await page.locator("#media-alt").fill("Acceptance image");
    const uploaded = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/media") &&
        response.request().method() === "POST",
    );
    await page.locator("#blog-media-upload").setInputFiles({
      name: "fixture.png",
      mimeType: "image/png",
      buffer: await sharp({
        create: { width: 24, height: 16, channels: 3, background: "#047857" },
      })
        .png()
        .toBuffer(),
    });
    const uploadResponse = await uploaded;
    assert.equal(uploadResponse.status(), 201, await uploadResponse.text());
    await page.locator("#featured-image-alt").waitFor();
    await page.waitForFunction(() =>
      document.querySelector("#featured-image").value.includes("/uploads/"),
    );
    for (let i = 0; i < 3; i++) {
      await page.locator("#blog-content").click();
      await page.locator("#blog-content").press("Control+End");
      await page.locator("#editor-image").click();
      await page.locator("#media-alt").fill(`Inline image ${i + 1}`);
      await page.locator('[data-testid^="media-select-"]').first().click();
    }
    assert.equal(await page.locator("#blog-content img").count(), 3);
    await checkImages(page);
    await page.locator("#save-draft").click();
    await page.getByText("Draft saved successfully.", { exact: true }).waitFor();
    await page.getByRole("status").filter({ hasText: "Post" }).waitFor();
    const saved = await env.request(`/api/blogs/cms/${id}`);
    assert.match(saved.json.content, /autism and ADHD/, saved.json.content);
    assert.match(saved.json.content, /href="https:\/\/drankushgarg.in\/autism-adhd"/, saved.json.content);
    const popup = page.waitForEvent("popup");
    await page.locator("#preview-blog").click();
    await page.locator("#open-blog-preview").waitFor();
    await page.getByText("Preview opened successfully.", { exact: true }).waitFor();
    const preview = await popup;
    await preview.waitForURL("**/blog/**");
    preview.on("pageerror", (error) => errors.push(error.message));
    preview.on("console", (message) => {
      if (/hydration|did not match|server html/i.test(message.text()))
        errors.push(message.text());
    });
    assert.equal(preview.url(), await page.locator("#open-blog-preview").getAttribute("href"));
    await preview.waitForLoadState("domcontentloaded");
    const response = await context.request.get(preview.url());
    assert.equal(response.status(), 200);
    assert.match(response.headers()["x-robots-tag"], /noindex/);
    await preview.locator("h1").waitFor({ timeout: 10000 }).catch(async (error) => {
      throw new Error(`${error.message}; errors=${errors.join('; ')}; preview=${(await preview.locator('body').innerText()).slice(0, 1500)}`);
    });
    assert.equal(await preview.locator("h1").count(), 1);
    assert.equal(await preview.title(), "Exact acceptance title");
    assert.equal(await preview.locator('meta[name="description"]').count(), 1);
    assert.equal(await preview.locator('link[rel="canonical"]').count(), 1);
    assert.equal(
      await preview.locator(".blog-content a").filter({ hasText: "autism and ADHD" }).getAttribute("href"),
      "https://drankushgarg.in/autism-adhd",
    );
    assert.equal(await preview.locator(".blog-content img").count(), 3);
    const resized = preview.locator('.blog-content a:has(img) img');
    assert.equal(await resized.getAttribute("width"), "240");
    assert.equal(await resized.getAttribute("height"), "120");
    await resized.waitFor({ state: "visible" });
    const bounds = await resized.boundingBox();
    assert.ok(bounds.width <= 240 && bounds.width > 0);
    assert.ok(Math.abs(bounds.width / bounds.height - 2) < 0.05);
    assert.equal(await preview.locator(".blog-content u").innerText(), "Clinical");
    assert.equal(await preview.locator(".blog-content mark").innerText(), "Clinical");
    await page.reload();
    await page.locator('#blog-content a:has(img) img').waitFor();
    assert.equal(await page.locator('#blog-content a:has(img) img').getAttribute("width"), "240");
    await page.locator('#blog-content a:has(img) img').click();
    await page.locator("#inline-image-height").waitFor({ timeout: 5000 }).catch(async (error) => {
      throw new Error(`${error.message}; url=${page.url()}; body=${(await page.locator('body').innerText()).slice(0, 1500)}; errors=${errors.join('; ')}`);
    });
    assert.equal(await page.locator("#inline-image-height").inputValue(), "120");
    await preview.waitForTimeout(400);
    assert.equal(
      await preview.locator('meta[name="robots"]').getAttribute("content"),
      "noindex,follow",
    );
    const schema = await preview
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    assert.ok(
      schema.some((json) =>
        JSON.parse(json)["@graph"]?.some(
          (node) => node["@type"] === "BlogPosting",
        ),
      ),
    );
    await fs.mkdir(path.join(root, ".cache"), { recursive: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(root, `.cache/cms-editor-${viewport.width}.png`),
      fullPage: true,
    });
    await preview.screenshot({
      path: path.join(root, `.cache/cms-preview-${viewport.width}.png`),
      fullPage: true,
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
      "Editor must fit viewport",
    );
    assert.deepEqual(errors, []);
    await page.route("**/api/blogs/cms/*/preview", route => route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ message: "Preview service unavailable." }) }));
    const failedPopup = page.waitForEvent("popup");
    await page.locator("#preview-blog").click();
    const failedPreview = await failedPopup;
    await page.getByText("Preview service unavailable.", { exact: true }).last().waitFor();
    await page.waitForFunction(() => !document.querySelector('#preview-blog').disabled);
    assert.equal(failedPreview.isClosed(), true);
    await page.unroute("**/api/blogs/cms/*/preview");
    await page.evaluate(() => { window.originalOpen = window.open; window.open = () => null; });
    await page.locator("#preview-blog").click();
    await page.getByText("Preview ready. Select Open Preview to view it.", { exact: true }).waitFor();
    await page.locator("#open-blog-preview").waitFor();
    await page.evaluate(() => { window.open = window.originalOpen; delete window.originalOpen; });
    await page.locator("#publish-blog").click();
    await page.getByText("Blog published successfully.", { exact: true }).waitFor();
    await page.locator("#update-blog").click();
    await page.getByText("Published blog updated successfully.", { exact: true }).waitFor();
    await context.close();
    console.log(
      `Passed ${viewport.width}px editor, selected-anchor link, media upload, three inline images, exact preview, metadata and hydration checks.`,
    );
  }
} finally {
  await browser?.close();
  vite.kill();
  await new Promise((resolve) =>
    vite.exitCode !== null ? resolve() : vite.once("exit", resolve),
  );
  await env.cleanup();
}
