import express from "express";
import { v4 as uuid } from "uuid";
import { accounts, StatusCodes, transactions } from "./database.js";
import { startWorkers } from "./worker.js";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/status", (req, res) => {
  return res.send("api running on: 3000");
});

app.get("/account/:accountId", (req, res) => {
  const account = accounts.find(
    (account) => account.id === Number(req.params.accountId),
  );

  if (!account) {
    const error = "Error: Account not found";
    console.error(error);
    res.status(404).send(error);
  }

  return res.status(200).send(account);
});

function dtoParse(body, fields) {
  const isWrongBody = fields.filter((campo) => !body[campo]);
  return isWrongBody.length > 0;
}

app.post("/pix", (req, res) => {
  const isDtoWrong = dtoParse(req.body, ["from", "target", "amount"]);

  if (isDtoWrong) {
    return res.status(400).send("Error: Wrong body format");
  }

  const originAccount = accounts.find(
    (account) => account.id === Number(req.body.from),
  );

  const targetAccount = accounts.find(
    (account) => account.id === Number(req.body.target),
  );

  if (!originAccount || !targetAccount || originAccount === targetAccount)
    return res.status(400).send("Error: Account not found");

  if (req.body.amount > originAccount.amount)
    return res.status(400).send("Error: Insufficient funds");

  // { id: adadadadad, status:0, from:1, target:2, amount: 200 }
  const { from, target, amount } = req.body;
  const newTransaction = {
    id: uuid(),
    status: StatusCodes.PENDING,
    from,
    target,
    amount,
  };

  transactions.push(newTransaction);
  console.log(
    `[LOG]:[STATUS]: transactionId: ${newTransaction.id} status: PENDING`,
  );

  return res.status(200).send({ transactionId: newTransaction.id });
});

app.get("/transaction/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    return res.status(404).send("Error: Transaction not found"); // return
  }

  if (transaction.status === StatusCodes.PENDING)
    return res.status(200).send({
      transactionId: transaction.id,
      status: { code: StatusCodes.PENDING, desc: "PENDING" },
    });

  if (transaction.status === StatusCodes.COMPLETE)
    return res.status(200).send({
      transactionId: transaction.id,
      status: { code: StatusCodes.COMPLETE, desc: "COMPLETE" },
    });

  if (transaction.status === StatusCodes.ERROR)
    return res.status(200).send({
      transactionId: transaction.id,
      status: { code: StatusCodes.ERROR, desc: "ERROR" },
    });
});

app.listen(port, () => {
  console.log(`api running on: ${port}`);
  startWorkers();
});
