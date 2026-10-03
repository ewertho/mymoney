import mongoose from "mongoose";
import { app } from "./app.ts";
import { env } from "./env.ts";

await mongoose.connect(env.MONGO_URI);

const server = app.listen(env.PORT, () => {
  console.log(`mymoney api em :${env.PORT}`);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    server.close(() => mongoose.disconnect().then(() => process.exit(0)));
  });
}
