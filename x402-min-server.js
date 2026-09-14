// x402-min-server.js - minimal real x402 gateway (health=200, invoice=402)
// ASCII, runnable:  node x402-min-server.js  then:
//   curl localhost:8090/health        -> 200
//   curl -X POST localhost:8090/invoke -> 402 full invoice
// No token / repo / wallet required to RUN it. It only becomes money when
// a real reviewer pays the invoice with a real wallet -- that last step
// (payTo signature) is outside this file's reach and never entered.
var http = require("http");

function invoice(input) {
  return {
    schemeVersion: "x402",
    network: (input && input.chain_set && input.chain_set[0]) || "solana",
    asset: "USDC",
    payTo: "DrdbCG8Mk3wGuLafneUWGThGiFM1Sii81MDf14YKETWS",
    maxAmountRequired: "10000",
    fee: 2500,
    gasUnits: (input && input.gas_units_est) || 31000,
    paidPreview: false
  };
}

var srv = http.createServer(function (req, res) {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "x402-min", time: Date.now() }));
    return;
  }
  if (req.url === "/invoke" && req.method === "POST") {
    var body = "";
    req.on("data", function (c) { body += c; });
    req.on("end", function () {
      var input = {};
      try { input = JSON.parse(body).input || {}; } catch (e) {}
      var inv = invoice(input);
      res.writeHead(402, {
        "Content-Type": "application/x-402-invoice+json",
        "x-experimental": "x402=yes",
        "x-invoice-network": inv.network,
        "x-invoice-asset": inv.asset,
        "x-invoice-payTo": inv.payTo,
        "x-invoice-maxAmountRequired": inv.maxAmountRequired
      });
      res.end(JSON.stringify(inv, null, 2));
    });
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

srv.listen(8090, function () {
  console.log("x402-min live on 8090; /health=200, /invoke=402 full invoice");
});
