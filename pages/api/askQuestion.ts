// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from "@/firebaseAdmin";
import query from "@/lib/queryApi";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  console.log("Received request:", req.body);

  if (!prompt) {
    res.status(400).json({ answer: "Please Provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat Id" });
    return;
  }

  try {
    // ChatGpt Query
    const response = await query(prompt, chatId, model);

    const message: Message = {
      text: response || "ChatGpt unable to answer that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png",
      },
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.username!)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    res.status(200).json({ answer: message.text });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ answer: "Internal server error" });
  }
}
