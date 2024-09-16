"use client"
import { ProfileFlow } from "@/features/auth/types";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
    const [flow, setFlow] = useState<ProfileFlow>("Articles");
    const ProfileFlowNavigate = (newFlow: ProfileFlow) => {
      setFlow(newFlow);
    };
   console.log(flow)
    return (
      <div className="flex items-center space-x-10">
        <Link href="">Projects</Link>
        <h2
          onClick={() => setFlow("Articles")}
          className="cursor-pointer"
        >
          Articles
        </h2>
       
      </div>
    );
}
 
export default NavBar;