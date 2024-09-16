"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { UseCurrentUser } from "@/features/auth/api/use-current-user";
import { useMutation } from "convex/react";
import { Textarea } from "flowbite-react";
import { Loader, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export function AddComment() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const addcomment = useMutation(api.project.addcomment);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const projectid = params.projectid as Id<"projects">;
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   setIsOpen(true)
    try {
      setLoading(true);
  
      await addcomment({
        id: projectid,
        comment: comment,
      });
      setComment("")
    
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
      setIsOpen(false)
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
       
          <MessageCircle className="cursor-pointer"/>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
        </DialogHeader>
        <form className="space-y-2.5" onSubmit={handlesubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-cente gap-4">
              
              <Textarea
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            comment
          </Button>
        </form>
        
      </DialogContent>
    </Dialog>
  );
}
