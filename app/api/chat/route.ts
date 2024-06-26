import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { adminDb } from "@/firebaseAdmin";
import { useSession } from '@clerk/nextjs';

import admin from "firebase-admin";
import { stringify } from 'querystring';
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(message => message.role === 'user' || message.role === 'assistant')
    .map(message => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  // const {session} = useSession();
  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-1.5-pro' })
    .generateContentStream(buildGoogleGenAIPrompt(messages));
  const stream = GoogleGenerativeAIStream(geminiStream);
  // try{
  //   const message: MyMessage = {
  //     text: stream || "Gemini unable to answer that!",
  //     createdAt: admin.firestore.Timestamp.now(),
  //     user: {
  //       _id: "Gemini",
  //       name: "Gemini",
  //       avatar:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Google_Bard_logo.svg/1200px-Google_Bard_logo.svg.png",
  //     },
  //   };
  //   await adminDb
  //       .collection("users")
  //       .doc(session?.user?.username!)
  //       .collection("chats")
  //       .doc(chatId)
  //       .collection("messages")
  //       .add(message); 
  // }catch(e){
  //   console.log("Error adding to db",e);
  // }
  return new StreamingTextResponse(stream);
}