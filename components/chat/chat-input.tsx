'use client';
import { db } from "@/firebase";
import { useSession } from "@clerk/nextjs";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import ModelSelection from "./model-selection";
type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { session } = useSession();
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  const [loading, setIsLoading] = useState(true);
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) {
      toast.error("Please provide a prompt.");
      return;
    }
      

    if (!session || !session.user || !session.user.username) {
      console.error("Session or user information is missing.");
      return;
    }

    const message: Message = {
      text: prompt,
      createdAt: serverTimestamp(),
      user: {
        _id: session.user.username,
        name: session.user.fullName,
        avatar: session.user.imageUrl || `https://ui-avatars.com/api/?name=${session.user.username}`,
      }
    };

    try {
      if (!chatId) {
        throw new Error("chatId is undefined");
      }

      await addDoc(
        collection(db, "users", session.user.username, 'chats', chatId, 'messages'),
        message
      );
    } catch (e) {
      console.error("An error occurred:", e);
      return;
    }

    const notification = toast.loading(`Working on it...`);

    try {
      const response = await fetch(`/api/askQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, chatId, model, session }),
      })
        .then(() => {
          toast.success(`Responded!`, {
            id: notification,

          });
          setPrompt("");
          setIsLoading(true);
        })

    } catch (error: any) {
      console.error("Failed to fetch the answer:", error);
      toast.error(`Failed to get a response.`, {
        id: notification,
      });
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!session}
          className={`bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 ${!loading && "animate-pulse"
            }`}
        />
        {loading ? (
          <button
            type="submit"
            disabled={!prompt || !session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 -rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!session}
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-spin"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
        )}
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
