const express = require("express");
const bodyParser = require("body-parser");
const { isPrime, getMimeAndSize } = require("./utils");
const cors = require("cors"); // import cors


const app = express();
app.use(cors()); // enable CORS

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestLower = null;
  let isPrimeFound = false;

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) isPrimeFound = true;
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (/[a-z]/.test(item)) {
        if (!highestLower || item > highestLower) highestLower = item;
      }
    }
  });

  const fileInfo = getMimeAndSize(file_b64);

  const response = {
    is_success: true,
    user_id: "your_name_ddmmyyyy",
    email: "your_email@college.edu",
    roll_number: "CS2025001",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLower ? [highestLower] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileInfo.valid,
    file_mime_type: fileInfo.mime,
    file_size_kb: fileInfo.size
  };

  res.json(response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));