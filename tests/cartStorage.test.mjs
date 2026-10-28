import { test } from "node:test";
import assert from "node:assert/strict";
import { parseStoredCart } from "forma-objects/cart-storage";

const ids = ["arco", "onda"];

test("recovers from unavailable, corrupt, or non-array storage", () => {
  for (const raw of [null, "{broken", "null", "123", '"cart"', '{"items":[]}']) {
    assert.deepEqual(parseStoredCart(raw, ids), []);
  }
});

test("discards untrusted product ids and invalid quantities", () => {
  const raw = JSON.stringify([null, 2, "arco", {}, { productId: "missing", quantity: 1 }, { productId: "arco", quantity: -1 }, { productId: "arco", quantity: 1.5 }, { productId: "onda", quantity: "2" }, { productId: "arco", quantity: 21 }]);
  assert.deepEqual(parseStoredCart(raw, ids), []);
});

test("merges duplicate ids, caps quantity, and drops supplied prices", () => {
  const raw = JSON.stringify([{ productId: "arco", quantity: 15, price: .01 }, { productId: "arco", quantity: 10 }, { productId: "onda", quantity: 2 }]);
  assert.deepEqual(parseStoredCart(raw, ids), [{ productId: "arco", quantity: 20 }, { productId: "onda", quantity: 2 }]);
});
