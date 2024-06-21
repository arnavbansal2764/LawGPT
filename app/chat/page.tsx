
import { AcademicCapIcon, BoltIcon, BookOpenIcon, ExclamationTriangleIcon, ScaleIcon, SunIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

const ChatPage = () => {

    return (
        <div className="text-white flex flex-col items-center justify-center h-screen px-2">
            <h1 className="text-5xl font-bold mb-20">LawGPT</h1>
            <div className="flex space-x-3 text-center">
            <div>
    <div className="flex flex-col items-center justify-center mb-5">
        <AcademicCapIcon className="h-8 w-8"/>
        <h2>Examples</h2>
    </div>
    <div className="space-y-2">
        <p className="infoText">"Explain the concept of due process"</p>
        <p className="infoText">"What are the key differences between civil and criminal law?"</p>
        <p className="infoText">"What is the significance of the Miranda rights?"</p>
    </div>
</div>
<div>
    <div className="flex flex-col items-center justify-center mb-5">
        <BoltIcon className="h-8 w-8"/>
        <h2>Capabilities</h2>
    </div>
    <div className="space-y-2">
        <p className="infoText">"Provide detailed legal analysis"</p>
        <p className="infoText">"Summarize landmark Supreme Court cases"</p>
        <p className="infoText">"Assist with legal research and citations"</p>
    </div>
</div>
<div>
    <div className="flex flex-col items-center justify-center mb-5">
        <SunIcon className="h-8 w-8"/>
        <h2>Special Features</h2>
    </div>
    <div className="space-y-2">
        <p className="infoText">"Advanced natural language understanding tailored for legal texts"</p>
        <p className="infoText">"Access to a vast database of legal precedents and statutes"</p>
        <p className="infoText">"Interactive tools for creating legal documents"</p>
    </div>
</div>


            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(ChatPage), { ssr: false });