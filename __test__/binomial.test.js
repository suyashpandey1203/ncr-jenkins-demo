// __tests__/binomial.test.js
import { precompute, nCr, MOD, modInv, modPow } from "../src/binomial.js";

describe("binomial (nCr) mod 1e9+7", () => {
  test("small known values", () => {
    const { fact, invfact } = precompute(10);
    expect(nCr(5, 0, fact, invfact)).toBe(1n);
    expect(nCr(5, 1, fact, invfact)).toBe(5n);
    expect(nCr(5, 2, fact, invfact)).toBe(10n);
    expect(nCr(5, 3, fact, invfact)).toBe(10n);
    expect(nCr(5, 4, fact, invfact)).toBe(5n);
    expect(nCr(5, 5, fact, invfact)).toBe(1n);
  });

  test("out-of-range r", () => {
    const { fact, invfact } = precompute(10);
    expect(nCr(5, -1, fact, invfact)).toBe(0n);
    expect(nCr(5, 6, fact, invfact)).toBe(0n);
  });

  test("symmetry nCr(n,r) = nCr(n,n-r)", () => {
    const { fact, invfact } = precompute(50);
    const a = nCr(42, 17, fact, invfact);
    const b = nCr(42, 42 - 17, fact, invfact);
    expect(a).toBe(b);
  });

  test("larger n", () => {
    const N = 200000; // big but still quick
    const { fact, invfact } = precompute(N);
    // spot check: nC1 = n
    expect(nCr(123456, 1, fact, invfact)).toBe(123456n % MOD);
    // nC0 = 1
    expect(nCr(123456, 0, fact, invfact)).toBe(1n);
  });

  test("modPow & modInv basics", () => {
    // a^(MOD-1) = 1 (for a not divisible by MOD)
    const three = 3n;
    expect(modPow(three, MOD - 1n)).toBe(1n);
    // a * inv(a) = 1
    const inv = modInv(three);
    expect((three * inv) % MOD).toBe(1n);
  });
});
