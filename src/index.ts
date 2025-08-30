import { env } from "./config/env";
import app from "./app";
import conndectDb from "./db/mongo";

conndectDb(() => {
  app.listen(env.PORT, () => console.log(`server running on port ${env.PORT}`));
});
