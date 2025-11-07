// src/binomial.js
const MOD = 1000000007n;

/**
 * fast exponentiation: a^e mod MOD (BigInt)
 */
function modPow(a, e, m = MOD) {
  a %= m;
  let r = 1n;
  while (e > 0n) {
    if (e & 1n) r = (r * a) % m;
    a = (a * a) % m;
    e >>= 1n;
  }
  return r;
}

/**
 * Fermat inverse: a^(MOD-2) mod MOD (MOD must be prime)
 */
function modInv(a, m = MOD) {
  a %= m;
  if (a === 0n) throw new Error("modular inverse of 0 doesn't exist");
  return modPow(a, m - 2n, m);
}

/**
 * Precompute factorials and inverse factorials up to maxN (inclusive).
 * Returns { fact, invfact } arrays of BigInt.
 */
export function precompute(maxN) {
  const fact = Array(maxN + 1);
  const invfact = Array(maxN + 1);

  fact[0] = 1n;
  for (let i = 1; i <= maxN; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  }

  invfact[maxN] = modInv(fact[maxN]);
  for (let i = maxN - 1; i >= 0; i--) {
    invfact[i] = (invfact[i + 1] * BigInt(i + 1)) % MOD;
  }

  return { fact, invfact };
}

/**
 * Compute C(n, r) mod MOD using precomputed fact & invfact.
 */
export function nCr(n, r, fact, invfact) {
  if (r < 0 || r > n) return 0n;
  return (((fact[n] * invfact[r]) % MOD) * invfact[n - r]) % MOD;
}

export { MOD, modPow, modInv };
