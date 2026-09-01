import { sum } from "../supplementary-snippets/exploring-node-js/math-utils.js";

test("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
});