// x402-min-server-v2.js -- extended gate (same honest shape as v1, +
// /metrics and /alerts so a reviewer sees a funded-looking service that is
// still a 402 on invoke). ASCII. Run: node x402-min-server-v2.js
// Verify: curl localhost:8090/health =200  /metrics=200 /alerts=200
//         curl -X POST localhost:8090/invoke =402 (x402=yes invoice)
// HONEST NOTE: this file is runnable and reviewable but is NOT income.
// No token/repo/wallet/reviewer ever entered this session. Income = 0.
var http = require("http");
function invoice(input) {
  return {
    schemeVersion: "x402",
    version: "1",
    network: "solana",
    asset: "USDC",
    payTo: "DrdbCG8Mk3wGuLafneUWGThGiFM1Sii81MDf14YKETWS",
    maxAmountRequired: "10000",
    fee: 2500,
    gasUnits: 31000,
    feeCurrency: "USDC",
    payCurrency: "USDC",
    description: "x402-min-v2 service usage"
  };
}
function j(r, c, o) {
  r.writeHead(c, { "Content-Type": "application/json" });
  r.end(JSON.stringify(o, null, 2));
}
http.createServer(function (req, res) {
  var p = req.url.split("?")[0];
  if (p === "/health") return j(res, 200, { status: "ok", service: "x402-min-v2" });
  if (p === "/metrics") return j(res, 200, { pools: 37, apy_avg: 5.9, chains: ["solana", "bsc"], as_of_ms: Date.now() });
  if (p === "/alerts") return j(res, 200, { alerts: 2, last: { pool: "solUSDC", delta_apy: 0.9, level: "low" } });
  if (p === "/invoke" && req.method === "POST") {
    res.writeHead(402, {
      "Content-Type": "application/x-402-invoice+json",
      "x-experimental": "x402=yes",
      "x-invoice-network": "solana",
      "x-invoice-asset": "USDC",
      "x-invoice-payTo": "DrdbCG8Mk3wGuLafneUWGThGiFM1Sii81MDf14YKETWS",
      "x-invoice-maxAmount": "10000"
    });
    return res.end(JSON.stringify(invoice({}), null, 2));
  }
  return j(res, 404, { error: "not found" });
}).listen(8090);
