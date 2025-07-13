import express, { Request, Response } from "express";
import productsRouter from './routes/product.routes'
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Health Check!");
});

app.listen(port, () => {
    console.log("Hello TypeScript Node!", port) 
})



