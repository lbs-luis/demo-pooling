import { accounts, StatusCodes, transactions } from "./database.js";

function moveToProcessing() {
  const transaction = transactions.find(
    (t) => t.status === StatusCodes.PENDING,
  );
  if (transaction) {
    transaction.status = StatusCodes.PROCESSING;
    console.log(
      `[LOG]:[STATUS]: transactionId: ${transaction.id} status: PROCESSING`,
    );
  }
}

function moveToComplete() {
  const transaction = transactions.find(
    (t) => t.status === StatusCodes.PROCESSING,
  );
  if (transaction) {
    transaction.status = StatusCodes.COMPLETE;
    console.log(
      `[LOG]:[STATUS]: transactionId: ${transaction.id} status: COMPLETE`,
    );

    const originAccount = accounts.find(
      (account) => account.id === Number(transaction.from),
    );
    const targetAccount = accounts.find(
      (account) => account.id === Number(transaction.target),
    );

    originAccount.amount -= transaction.amount;
    targetAccount.amount += transaction.amount;
  }
  const delay = Math.random() < 0.5 ? 3000 : 6000;
  setTimeout(moveToComplete, delay);
}

export function startWorkers() {
  setInterval(moveToProcessing, 5000);
  setTimeout(moveToComplete, 3000);
}
