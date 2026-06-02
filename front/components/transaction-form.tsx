"use client";
import { useState } from "react";

export function TransactionForm() {
  const [originAccountId, setOriginAccountId] = useState("");
  const [targetAccountId, setTargetAccountId] = useState("");

  return (
    <div className="w-full flex flex-row gap-4">
      <div className="flex flex-col gap-1 w-[140px]">
        <label className="text-sm font-normal text-slate-400">
          Conta Origem
        </label>
        <input
          className="w-full text-center p-4 text-white text-base border border-slate-800 rounded-sm"
          placeholder="ID"
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
          placeholder="ID"
          onChange={(e) => setTargetAccountId(e.target.value)}
          value={targetAccountId}
        />
      </div>
    </div>
  );
}
