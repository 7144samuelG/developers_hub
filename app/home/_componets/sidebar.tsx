"use client";

import {
  Home,
  MessageCircle,
  PlusCircleIcon,
  PlusIcon,
  Users,
  Workflow,
} from "lucide-react";
import { SideBarButton } from "./sidebarbutton";
import { usePathname } from "next/navigation";
import { UserButton } from "@/features/auth/components/user-button";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[100px] h-full bg-[#481349] flex flex-col items-center pb-4">
      <div className=" flex flex-col gap-y-4 items-center pt-10 flex-1">
        <SideBarButton
          label="Home"
          icon={Home}
          isActive={pathname.includes("/home")}
          link="/"
        />
        <SideBarButton label="Communities" link="/k" icon={Users}  />
        <SideBarButton label="Projects" link="projects" icon={Workflow} />
        <SideBarButton label="Articles" link="articles" icon={Home} />
        <SideBarButton label="Create Project" icon={PlusIcon} link="create-project"  isActive={pathname.includes("/home/create-project")} />
        <SideBarButton label="create-article" link="create-article" icon={PlusCircleIcon} />
      </div>
      <UserButton />
    </div>
  );
};
