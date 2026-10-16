import assert from "node:assert/strict";

export async function checkFormatting(page) {
  await page.locator("#blog-content p").first().evaluate(element => {
    const node = element.firstChild;
    const range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 8);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    element.dispatchEvent(new Event("selectionchange", { bubbles: true }));
  });
  for (const [command, tag] of [["toggleBold", "strong"], ["toggleItalic", "em"], ["toggleUnderline", "u"], ["toggleStrike", "s"]]) {
    await page.locator(`#editor-${command}`).click();
    assert.equal(await page.locator(`#blog-content ${tag}`).first().innerText(), "Clinical");
  }
  for (const align of ["center", "right", "justify", "left"]) {
    await page.locator(`#editor-align-${align}`).click();
    assert.equal(await page.locator("#blog-content p").first().evaluate(el => el.style.textAlign), align);
  }
  await page.locator("#editor-font-size").selectOption("24px");
  const setColor = async (id, value) => {
    await page.locator(id).focus();
    await page.locator(id).evaluate((element, color) => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(element, color);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    }, value);
  };
  await setColor("#editor-text-color", "#dc2626");
  await setColor("#editor-highlight-color", "#fef08a");
  assert.equal(await page.locator("#blog-content mark").innerText(), "Clinical");
  await page.locator("#editor-clear").click();
  assert.equal(await page.locator("#blog-content u, #blog-content s, #blog-content mark").count(), 0);
  await page.locator("#editor-toggleUnderline").click();
  await page.locator("#editor-font-size").selectOption("24px");
  await setColor("#editor-text-color", "#dc2626");
  await setColor("#editor-highlight-color", "#fef08a");
  await page.locator("#editor-align-center").click();
}

export async function checkImages(page) {
  await page.locator("#blog-content img").first().click();
  await page.locator("#inline-image-width").fill("240");
  await page.locator("#inline-image-height").fill("120");
  assert.equal(await page.locator("#blog-content img").first().getAttribute("width"), "240");
  assert.equal(await page.locator("#blog-content img").first().getAttribute("height"), "120");
  await page.locator("#inline-image-auto-height").check();
  assert.equal(await page.locator("#blog-content img").first().getAttribute("height"), null);
  await page.locator("#inline-image-size").fill("320");
  assert.equal(await page.locator("#blog-content img").first().getAttribute("width"), "320");
  await page.locator("#inline-image-reset").click();
  assert.equal(await page.locator("#blog-content img").first().getAttribute("width"), null);
  await page.locator("#inline-image-width").fill("240");
  await page.locator("#inline-image-height").fill("120");
  await page.locator("#editor-image-link").click();
  await page.locator("#link-url").fill("https://example.com/image");
  await page.locator("#link-new-tab").check();
  await page.locator("#apply-link").click();
  await page.locator("#editor-image-link-edit").click();
  assert.equal(await page.locator("#link-url").inputValue(), "https://example.com/image");
  await page.locator("#close-link-dialog").click();
  await page.locator("#editor-image-unlink").click();
  assert.equal(await page.locator('#blog-content a:has(img)').count(), 0);
  await page.locator("#editor-image-link").click();
  await page.locator("#link-url").fill("https://example.com/image");
  await page.locator("#apply-link").click();
}
