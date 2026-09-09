import { test, expect } from "@playwright/test";
test("shopping, filtering, persistence, quick view, keyboard and checkout", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pieces with",
  );
  await page
    .getByRole("link", { name: "Shop the collection", exact: true })
    .click();
  await expect(page).toHaveURL(/shop/);
  await page.getByRole("button", { name: "Candles", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Search pieces").fill("amber");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Sort by").selectOption("high");
  await expect(page).toHaveURL(/sort=high/);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(21);
  await page
    .getByRole("button", { name: "Quick view", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Increase quantity" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add to cart", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Quick view", exact: true }).first(),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open cart, 2 items" }).click();
  await expect(page.locator(".cart-summary .total")).toContainText("$51.50");
  await page.getByRole("button", { name: "Increase quantity" }).click();
  await expect(page.locator(".cart-summary .total")).toContainText("$77.25");
  await page.getByRole("button", { name: "Decrease quantity" }).click();
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Open cart, 2 items" }),
  ).toBeVisible();
  await page
    .locator(".product-card")
    .first()
    .getByRole("button", { name: /to wishlist/ })
    .click();
  await page.goto("/wishlist");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .locator(".product-card")
    .getByRole("button", { name: /from wishlist/ })
    .click();
  await expect(
    page.getByText("Your wishlist is waiting for something special."),
  ).toBeVisible();
  await page.goto("/product/cable-roll-neck-sweater");
  await page.getByText("Materials", { exact: true }).click();
  await expect(page.getByText(/exact composition/)).toBeVisible();
  await page
    .getByRole("button", { name: "Inquire on WhatsApp", exact: true })
    .click();
  await expect(page.locator(".toast-region")).toContainText("not connected");
  await page.goto("/cart");
  await page.getByRole("link", { name: "Continue to checkout" }).click();
  await expect(
    page.getByText("Checkout preview", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/No payment will be collected/)).toBeVisible();
  await page.goto("/cart");
  await page.getByRole("button", { name: /Remove Cable/ }).click();
  await expect(
    page.getByText("Your cart is feeling a little empty."),
  ).toBeVisible();
  await page.goto("/product/missing");
  await expect(
    page.getByRole("heading", { name: /wandered off/ }),
  ).toBeVisible();
  await page.goto("/missing-page");
  await expect(
    page.getByRole("heading", { name: /wandered off/ }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("demo auth validation, session, search, newsletter, and editorial routes", async ({
  page,
}) => {
  await page.goto("/register");
  await page.getByLabel("First name", { exact: true }).fill("Demo");
  await page.getByLabel("Last name", { exact: true }).fill("Tester");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("DemoPass123");
  await page
    .getByLabel("Confirm password", { exact: true })
    .fill("Different123");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Create demo account" }).click();
  await expect(page.getByRole("alert")).toContainText("do not match");
  await page
    .getByLabel("Confirm password", { exact: true })
    .fill("DemoPass123");
  await page.getByRole("button", { name: "Create demo account" }).click();
  await expect(
    page.getByRole("heading", { name: "Hello, Demo." }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hello, Demo." }),
  ).toBeVisible();
  const saved = await page.evaluate(() => JSON.stringify(localStorage));
  expect(saved).not.toContain("DemoPass123");
  await page.getByRole("button", { name: "Logout", exact: true }).click();
  await page.goto("/login");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("DemoPass123");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByRole("button", { name: "Login to demo" }).click();
  await expect(page).toHaveURL(/account/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hello, demo." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Search products" }).click();
  await page.getByRole("searchbox").fill("nothingmatches");
  await expect(page.getByText(/No pieces found/)).toBeVisible();
  await page.getByRole("searchbox").fill("panda");
  await expect(page.locator(".search-results>a")).toHaveCount(2);
  await page.keyboard.press("Escape");
  await page.goto("/");
  await page
    .getByLabel("Your email address", { exact: true })
    .fill("demo@example.com");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(
    page.getByText(
      "Saved on this device. Email delivery is not connected yet.",
    ),
  ).toBeVisible();
  await page.goto("/journal/the-art-of-slow-living");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A softer space. A slower pace.",
  );
});
test("all requested viewport widths and mobile cart fit without horizontal overflow", async ({
  page,
}, testInfo) => {
  test.setTimeout(180000);
  const failures = [];
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/shop",
      "/product/panda-bag",
      "/cart",
      "/wishlist",
      "/login",
      "/register",
    ]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.locator("h1").waitFor();
      const size = await page.evaluate(() => ({
        body: document.documentElement.scrollWidth,
        screen: innerWidth,
      }));
      if (size.body > size.screen)
        failures.push(`${width} ${route}: ${size.body}`);
    }
    if (width <= 430) {
      await page.goto("/product/panda-bag");
      await page
        .getByRole("button", { name: "Add to cart", exact: true })
        .click();
      await page.getByRole("button", { name: /Open cart/ }).click();
      const box = await page.getByRole("dialog").boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.width).toBeLessThanOrEqual(width + 0.1);
      expect(box.height).toBeLessThanOrEqual(900);
      await expect(
        page.getByRole("link", { name: "Continue to checkout" }),
      ).toBeInViewport();
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
    }
  }
  expect(failures).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator("img").evaluateAll((images) =>
    images.forEach((i) => {
      i.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    [...document.images].every((i) => i.complete),
  );
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-desktop.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-hero.png`,
  });
  await page.setViewportSize({ width: 375, height: 850 });
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-mobile.png`,
    fullPage: true,
  });
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.src),
    );
  expect(broken).toEqual([]);
});
test("small-screen long cart, focus containment, outside close, filters and all asset URLs", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/shop");
  for (let i = 0; i < 6; i++)
    await page
      .locator(".product-card")
      .nth(i)
      .getByRole("button", { name: /to cart/ })
      .click();
  await page.getByRole("button", { name: "Open cart, 6 items" }).click();
  await expect(
    page.getByRole("link", { name: "Continue to checkout" }),
  ).toBeInViewport();
  const scrolls = await page
    .locator(".cart-items")
    .evaluate((el) => el.scrollHeight > el.clientHeight);
  expect(scrolls).toBeTruthy();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => document.activeElement.closest("dialog") !== null,
      ),
    ).toBeTruthy();
  }
  await page.screenshot({ path: "test-results/cart-320.png" });
  await page.keyboard.press("Escape");
  await page.getByLabel(/Up to/).fill("20");
  await expect(
    page.getByRole("heading", { name: /No pieces found/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all pieces" }).click();
  await expect(page.locator(".product-card")).toHaveCount(21);
  await page.goto("/shop?sale=true");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.goto("/shop?new=true");
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("button", { name: "Quick view" }).first().click();
  await page.mouse.click(2, 2);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/shop");
  await page.locator("img").evaluateAll((images) =>
    images.forEach((i) => {
      i.loading = "eager";
    }),
  );
  await page.waitForFunction(() =>
    [...document.images].every((i) => i.complete),
  );
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.filter((i) => !i.naturalWidth).map((i) => i.src),
      ),
  ).toEqual([]);
});
