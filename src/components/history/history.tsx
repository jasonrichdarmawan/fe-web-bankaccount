import React from "react";
import HistorySelect from "./historyselect.component";
import { TransactionModel } from "./history.service";
import Transactions from "./transactions.component";

export default function History() {
  const [isTransactionsShown, setIsTransactionsShown] = React.useState(false);

  const [transactions, setTransactions] = React.useState<TransactionModel[]>(
    []
  );

  return (
    <>
      {!isTransactionsShown ? (
        <HistorySelect
          setIsTransactionsShown={setIsTransactionsShown}
          setTransactions={setTransactions}
        />
      ) : (
        <Transactions transactions={transactions} />
      )}
    </>
  );
}
