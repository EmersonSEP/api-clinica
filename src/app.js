//Requires:

const express = require("express");
const db = require("./database");
const handleError = require("./middlewares/handleError");
const authMiddleware = require("./middlewares/auth");
const jwtMiddleware = require("./middlewares/jwt");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");

//Instances:

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(jwtMiddleware.unless({ path: [
//{ url: "/login", methods: ['POST'] },
//{ url: "/psicologos", methods: ['POST'] }
//] }));
//app.use(authMiddleware);

db.hasConnection();

//Tcp Connection Port:
dotenv.config();
// const port = 4000;
const port = process.env.PORT || 4000;

//Uses:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(handleError);

app.use((req, res) => {
  res.status(404).json({ message: "URL não encontrada." });
});

//Server Connection:

app.listen(port, () => {
  console.log(`[OK] Servidor conectado!!! [Porta TCP: ${port}]`);
});

