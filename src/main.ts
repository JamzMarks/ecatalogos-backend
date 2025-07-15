import express from "express";
import productsRouter from "./routes/product.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { swaggerDocument } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", productsRouter);

app.get("/health", (req, res) => {
  res.send("Health Check!");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log("Api running on port:", port);
});
