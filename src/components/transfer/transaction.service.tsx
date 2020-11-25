export interface postTransactionResponse {
  message_code?: number;
  message?: string;
  location?: string;
}

export interface transaction_progressResponse {
  message_code?: number;
  message?: string;
  progress?: {
    message_Code: number;
    acount_Number: null;
    progress_ID: null;
  };
}

export async function transaction_progress(location: string) {
  const response = await fetch(location, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  return response.json().then((data: transaction_progressResponse) => data);
}

export default async function postTransaction(
  Destination: string,
  Transaction_Value: number
) {
  const response = await fetch(`${process.env.REACT_APP_baseUrl}/api/v2/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      Destination_Type: 1,
      Destination,
      Transaction_Value,
    }),
  });
  return await response.json().then((data: postTransactionResponse) => data);
}
