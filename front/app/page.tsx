import { TransactionForm } from "@/components/transaction-form";

export default async function Home() {
  // const account = await getAccount(1);

  return (
    <main className="p-4 rounded-md bg-slate-900 m-auto w-[550px]">
      <TransactionForm />
    </main>
  );
}
