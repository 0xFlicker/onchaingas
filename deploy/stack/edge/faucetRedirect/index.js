exports.handler = (_, __, callback) =>
  callback(null, {
    status: 301,
    statusDescription: "Moved Permanently",
    headers: { location: [{ key: "Location", value: "https://faucet.0xflick.xyz" }] }
  });
