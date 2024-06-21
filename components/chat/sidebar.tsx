'use client';
import { UserButton, useSession } from "@clerk/nextjs";
import NewChat from "./newchat";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "./chatrow";
import { usePathname } from "next/navigation";

const SideBar = () => {
    const { session } = useSession();
    
    const [chats, loading, error] = useCollection(
        session && query( collection(db, 'users', session.user?.username!, "chats"),orderBy("createdAt","asc"))
    );
    console.log(chats);
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-20 h-20", // Custom width and height
            userButtonPopoverCard: "bg-blue-100",
            userButtonPopoverActionButton: "text-black", // Custom text color for action buttons
        },
    };
    return (
        <div className="p-2 flex flex-col h-screen ">
            <div className="flex-1">
                <div>
                    <NewChat />
                    <div>
                        {/* modelselection */}
                    </div>
                    {chats?.docs.map(chat => (

                        <ChatRow key={chat.id} id={chat.id}/>
                    ))}
                </div>
            </div>
            <div className="mx-auto pb-10 hover:opacity-50">
                <UserButton appearance={userButtonAppearance} />
            </div>
        </div>
    );
}

export default SideBar;