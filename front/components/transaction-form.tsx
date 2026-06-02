"use client";
import { doPix } from "@/services/transaction.service";
import { useState } from "react";

export function TransactionForm() {
  const [originAccountId, setOriginAccountId] = useState("");
  const [targetAccountId, setTargetAccountId] = useState("");
  const [amount, setAmount] = useState("");

  async function handleDoPix () {
    const transaction = { from: Number(originAccountId), target: Number(targetAccountId), amount: Number(amount) }

    const track = await doPix(transaction)
    console.log(track)
  }

  return (
    <div className="w-full flex flex-row gap-4">
      <div className="flex flex-col gap-1 w-[140px]">
        <label className="text-sm font-normal text-slate-400">
          Conta Origem
        </label>
        <input
          className="w-full text-center p-4 text-white text-base border border-slate-800 rounded-sm"
          placeholder="Id"
          onChange={(e) => setOriginAccountId(e.target.value)}
          value={originAccountId}
        />
      </div>
      <div className="flex flex-col gap-1 w-[140px]">
        <label className="text-sm font-normal text-slate-400">
          Conta Destino
        </label>
        <input
          className="w-full text-center p-4 text-white text-base border border-slate-800 rounded-sm"
          placeholder="Id"
          onChange={(e) => setTargetAccountId(e.target.value)}
          value={targetAccountId}
        />
      </div>    
      <div className="flex flex-col gap-1 w-[140px]">
        <label className="text-sm font-normal text-slate-400">
          Valor
        </label>
        <input
          className="w-full text-center p-4 text-white text-base border border-slate-800 rounded-sm"
          placeholder="Valor"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>
      <button onClick={handleDoPix} className="px-4 h-16 mt-5 w-fit bg-slate-950 items-center justify-center rounded-sm cursor-pointer">Enviar</button>
    </div>
  );
}
