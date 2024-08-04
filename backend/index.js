const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
