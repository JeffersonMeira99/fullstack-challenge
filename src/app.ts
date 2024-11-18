import express, { Application } from "express";
import bodyParser from "body-parser";
import { initializeDatabase } from "./config/db";
import cors from "cors"; // Importando o pacote CORS
import vehicleRoutes from "./routes/vehicle.routes";
import driverRoutes from "./routes/driver.routes";
import companyRoutes from "./routes/company.routes";

const app: Application = express();

initializeDatabase();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.json());

app.use("/api", vehicleRoutes);
app.use("/api", driverRoutes);
app.use("/api", companyRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
