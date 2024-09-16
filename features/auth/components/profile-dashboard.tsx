"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ProfileFlow } from "../types";
import { cn } from "@/lib/utils";
import Projects from "./projects";
import Articles from "./articles";
import Communities from "./communites";

const ProfileDashBoard = () => {
  const [flow, setFlow] = useState<ProfileFlow>("Projects");
  console.log(flow)
  const ProfileFlowNavigate = useCallback((newFlow: ProfileFlow) => {
    setFlow(newFlow);
  }, []);
  return (
    <div className="">
      <div className={cn("", flow == "Projects"? "block":"hidden")}>
        <Projects />
      </div>
      <div className={cn("", flow == "Articles"? "block":"hidden")}>
        <Articles />
      </div>
      
    </div>
  );
};

export default ProfileDashBoard;
