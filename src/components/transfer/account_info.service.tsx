export interface Account_InfoModel {
  Account_Number?: number;
  Full_Name?: string;
}

export interface getAccount_InfoResponseBody {
  message_code: number;
  message: string;
  account_info: Account_InfoModel;
}

export default async function getAccount_Info(Account_Number: string) {
  const response = await fetch(
    `${process.env.REACT_APP_baseUrl}/api/v1/account/${Account_Number}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
  return await response
    .json()
    .then((data: getAccount_InfoResponseBody) => data);
}
