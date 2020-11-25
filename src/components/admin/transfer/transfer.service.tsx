export interface postAdminTransactionResponse {
  message_code?: number;
  message?: string;
}

export default async function postAdminTransaction(
  Destination: string,
  Transaction_Value: number
) {
  const response = await fetch(`${process.env.REACT_APP_baseUrl}/api/v1/admin/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      Destination,
      Transaction_Value,
    }),
  });
  return await response
    .json()
    .then((data: postAdminTransactionResponse) => data);
}
