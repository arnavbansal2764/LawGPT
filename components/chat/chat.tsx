'use client';
import { db } from "@/firebase";
import { useSession } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./message";
import { useEffect, useRef } from "react";

type Props = {
    chatId:string;
}
function Chat({ chatId }: Props) {
    const { session } = useSession();
    const messageEndRef = useRef<null | HTMLDivElement>(null);
  
    const [messages] = useCollection(
      session &&
        query(
          collection(
            db,
            `users/${session?.user?.username!}/chats/${chatId}/messages`
          ),
          orderBy("createdAt", "asc")
        )
    );
  
    useEffect(() => {
      messageEndRef.current?.scrollIntoView();
    }, [messages]);
  
    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {messages?.empty && (
          <>
            <p className="mt-10 text-center text-white">
              Type a prompt in below to get started
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 mx-auto mt-5 text-white animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </>
        )}

        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()} />
          
        ))}
        <div ref={messageEndRef} />
      </div>
    );
  }
 
export default Chat;