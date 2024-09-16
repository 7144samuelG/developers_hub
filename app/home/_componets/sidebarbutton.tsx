"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {  LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { IconType } from "react-icons/lib"


interface SideBarButtonProps{
    label:string;
    isActive?:boolean;
    icon:LucideIcon | IconType;
    link:string;
    
}
export const SideBarButton=({
    label,
    isActive,
    icon:Icon,
    link
}:SideBarButtonProps)=>{
    const router=useRouter();
    const handleRouting=(url:string)=>{
        router.push(`/home/${url}`)
    }
    return(
        <div className="flex flex-col items-center justify-end gap-y-0.5 cursor-pointer group:">
            <Button onClick={()=>handleRouting(link)} className={cn("size-9 p-2 group-hover:bg-accent/20",isActive && "bg-accent/20")}>
               <Icon className="size-15 text-white group-hover:scale-110 transition-all" />
            </Button>
            <span className="text-[11px] text-white group-hover:text-accent">
                {label}
            </span>
        </div>
    )
}