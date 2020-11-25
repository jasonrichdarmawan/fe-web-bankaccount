export interface RegisterModel {
  PIN: number | string;
  Full_Name: string;
  Birth_Date: string;
  ISO_4217: number | string;
  Address_3: string;
  Address_4: string;
  Address_1: string;
  Address_2: string;
  Zip_Code: number | string;
  ISO_3166_1: number | string;
}

export interface RegisterResponse {
  message_code?: number;
  message?: string;
  User_ID?: string;
  token?: string;
}

export default async function postRegister(state: RegisterModel) {
  const response = await fetch(`${process.env.REACT_APP_baseUrl}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
  return await response.json().then((data: RegisterResponse) => data);
}
