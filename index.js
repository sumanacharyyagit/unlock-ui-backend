require("dotenv").config();
const app = require("./app.js");
const connectWithDB = require("./config/dbConfig.js");

const PORT = process.env.PORT;

connectWithDB(process.env.MONGODB_URI);

app.listen(PORT, (req, res) => {
  console.log(`App listening at http://localhost:${PORT}`);
});
