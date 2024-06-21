import { db } from "@/firebase";
import { useSession } from "@clerk/nextjs";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id: string
}
const ChatRow = ({ id }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { session } = useSession();
    const [active, setActive] = useState(false);
    const [messages] = useCollection(

        collection(db, 'users', session?.user?.username!, 'chats', id, 'messages')

    );
    useEffect(() => {
        if (!pathname) {
            return;
        }
        setActive(pathname.includes(id));
    }, [pathname]);

    const removeChat = async() => {
        await deleteDoc(doc(db,'users', session?.user?.username!, 'chats',id));
        router.replace('/chat');
    }
    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncate">{messages?.docs[messages?.docs.length - 1]?.data().text || "New chat"}</p>
            <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700" />        </Link>
    );
}

export default ChatRow;