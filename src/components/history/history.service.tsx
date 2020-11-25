export interface getTransactionsPathVariable {
  Start: string;
  End: string;
}

export interface TransactionModel {
  Date: string;
  Source: string;
  Destination: string;
  Destination_Type: number;
  transaction_Value: number;
  Ending_Balance: number;
}

export interface getTransactionsResponseBody {
  message_code: number;
  message: string;
  Opening_Balance: number;
  transactions: TransactionModel[];
}

export default async function getTransactions({
  Start,
  End,
}: getTransactionsPathVariable) {
  const response = await fetch(`${process.env.REACT_APP_baseUrl}/api/v1/history/${Start}/${End}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  return await response
    .json()
    .then((data: getTransactionsResponseBody) => data);
}
