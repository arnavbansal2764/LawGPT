'use client';
import { db } from "@/firebase";
import { useSession } from "@clerk/nextjs";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const NewChat = () => {
    const router = useRouter();
    const { session } = useSession();
    
    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db,'users',session?.user?.username!,"chats"),{
                messages: [],
                userId : session?.user?.username,
                createdAt : serverTimestamp()
            }
        );
        router.push(`/chat/${doc.id}`)
    }
    return (  
        <div onClick={createNewChat} className="border-gray-700 border chatRow">
            <PlusIcon className="h-4 w-4"/>
            <p>New chat</p>
        </div>
    );
}
 
export default NewChat;