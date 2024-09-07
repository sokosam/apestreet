import express from "express";
import session from "express-session";
import isAuthenticated from "./auth/auth";
import getPool from "./database";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import userStockRoutes from "./routes/userStocksRoute";
import createStockWatchlist from "./utils/createStockWatchlist";
import createUserbase from "./utils/createUserbase";
import env from "./utils/validEnv";
import redisStore from "./redis_session.db";
import cors from "cors";

declare module "express-session" {
  interface SessionData {
    user_id: string;
    username: string;
    email: string;
  }
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PATCH", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true,
  })
);

app.use(
  session({
    store: redisStore,
    secret: env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 3 },
  })
);

// NOT FOR PRODUCTION:
// Development database creation:
createStockWatchlist();
createUserbase();

const client = getPool(env.DB_URI);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/userStocks", isAuthenticated, userStockRoutes);

app.listen(env.PORT, () => {
  console.log("Server is running on port " + env.PORT);
});

app.use(errorHandler);
