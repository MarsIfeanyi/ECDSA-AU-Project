const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "021af22af23fd4c68cc913182045b3347cd6404d69e2560dc78ef1c1b5aed4b921": 100,
  "0360c377050af609bbe591627c99e01cb0e6d58943cce32b3a7910344e2877ab49": 50,
  "02e627fac427a22160b81f082851d94e3f82e3d1cd9b54aaaa1022d2777512ff9b": 75,
  "0x1": 200,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
