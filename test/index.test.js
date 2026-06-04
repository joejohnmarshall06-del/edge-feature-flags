import test from "node:test";
import assert from "node:assert/strict";
import { FlagEngine } from "../src/index.js";
test("targeted user receives flag", () => {
  const engine = new FlagEngine([{ key: "new-ui", enabled: true, targets: ["u1"] }]);
  assert.equal(engine.evaluate("new-ui", { id: "u1" }).enabled, true);
});
test("disabled flag is off", () => {
  const engine = new FlagEngine([{ key: "x", enabled: false, rollout: 100 }]);
  assert.equal(engine.evaluate("x", { id: "u1" }).enabled, false);
});
