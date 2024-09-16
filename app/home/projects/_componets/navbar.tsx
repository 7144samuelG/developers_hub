"use client"
import { UserButton } from "@/features/auth/components/user-button";
import { MessageSquareDashed, Plus } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-10">
                <h1 className="">DevsHub</h1>
                <Link href="/home">Projects</Link>
                <Link href="">Articles</Link>
            </div>
            <div className="flex items-center space-x-10">
                <MessageSquareDashed/>
                <Plus/>
                <UserButton/>
            </div>
        </div>
     );
}
 
export default NavBar;