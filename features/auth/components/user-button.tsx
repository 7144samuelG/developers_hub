"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut, User } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { UseCurrentUser } from "../api/use-current-user";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const { data, isLoading } = UseCurrentUser();
  const { signOut } = useAuthActions();
  const router=useRouter();
  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }
  if (!data) {
    return null;
  }
  const { image, name,_id } = data;
  console.log("id",_id)
  const avatarfallback = name!.charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="text-white bg-sky-500">
            {avatarfallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem>
          <LogOut className="size-4 mr-2" onClick={() => signOut()} />
          logout
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <User className="size-4 mr-2 cursor-pointer" onClick={() =>{router.push(`/user/${_id}`)}} />
          profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
