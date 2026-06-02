let accounts = [
  { id: 1, owner: "luis", amount: 10000 },
  { id: 2, owner: "leticia", amount: 0 },
];

const StatusCodes = {
  PENDING: 0,
  PROCESSING: 1,
  COMPLETE: 2,
  ERROR: 3,
};
// { id: adadadadad, status:0, from:1, target:2, amount: 200 }
let transactions = [];

export { accounts, StatusCodes, transactions };
