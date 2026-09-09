import test from "node:test";
import assert from "node:assert/strict";
import { cartTotal, sanitizeCart, clampQuantity } from "../src/utils/cart.js";
import { createWhatsAppLink } from "../src/utils/whatsapp.js";
test("cart totals use cents for multi-product quantities", () => {
  assert.equal(
    cartTotal([
      { price: 25.75, quantity: 3 },
      { price: 0.1, quantity: 3 },
    ]),
    77.55,
  );
});
test("persisted cart rejects stale products and duplicates and clamps malformed quantities", () => {
  assert.deepEqual(
    sanitizeCart(
      [
        null,
        { id: "missing", quantity: 1 },
        { id: "a", quantity: -4 },
        { id: "a", quantity: 3 },
        { id: "b", quantity: 500 },
      ],
      [{ id: "a" }, { id: "b" }],
    ),
    [
      { id: "a", quantity: 1 },
      { id: "b", quantity: 99 },
    ],
  );
  assert.deepEqual(sanitizeCart({}, []), []);
  assert.equal(clampQuantity("invalid"), 1);
});
test("WhatsApp refuses unconfigured destinations and safely encodes product messages", () => {
  assert.equal(createWhatsAppLink("YOUR_WHATSAPP_NUMBER"), null);
  assert.equal(createWhatsAppLink("+1 555 555 5555"), null);
  const message = "Hi CozyNest\nProduct: Wool & Panda Bag\nPrice: $25.75";
  const link = createWhatsAppLink("15555555555", message);
  assert.equal(new URL(link).searchParams.get("text"), message);
  assert.equal(new URL(link).pathname, "/15555555555");
});
