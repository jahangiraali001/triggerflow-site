const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.get('/api/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
