import axios, { AxiosRequestConfig } from "axios";
import { Sale, Request } from "./types";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

export const sendMessage = async (message: string) => {
  const req: Request = {
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };
  console.log(req);

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
      "X-Line-Retry-Key": uuidv4(),
    },
  };
  console.log(config);

  const res = await axios.post(
    "https://api.line.me/v2/bot/message/broadcast",
    req,
    config
  );

  return res.status;
};

export const createMessage = (sales: Sale[]) => {
  return sales
    .map((e, i) => {
      return `${e.shopName} ${e.salePeriod}`;
    })
    .join("\n");
};
