// bin/compute.js
import { precompute, nCr } from "../src/binomial.js";

function usage() {
  console.log("Usage: node bin/compute.js <n> <r>");
}

const [,, nStr, rStr] = process.argv;
if (!nStr || !rStr) {
  usage();
  process.exit(1);
}

const n = Number(nStr);
const r = Number(rStr);
if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0) {
  console.error("n and r must be non-negative integers");
  process.exit(1);
}

const { fact, invfact } = precompute(n); // precompute only up to n
const ans = nCr(n, r, fact, invfact);
console.log(String(ans)); // print as decimal
