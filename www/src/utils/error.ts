import process from "process";

process.on("uncaughtException", (ex) => {
  console.error(ex);
  process.exit(1);
});
