const baseURL = "http://localhost:3001";

export async function getAccount(id: number) {
  const response = await fetch(`${baseURL}/account/${id}`, {
    cache: "no-store",
  });

  return (await response.json()) as {
    id: number;
    owner: string;
    amount: number;
  };
}

export async function doPix(req: {
  from: number;
  target: number;
  amount: number;
}) {
  const response = await fetch(`${baseURL}/pix`, {
    cache: "no-store",
    method: "POST",
    body: JSON.stringify(req),
  });

  return (await response.json()) as {
    transactionId: string;
  };
}
