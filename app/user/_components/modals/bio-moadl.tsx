"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { GetUser } from "@/features/auth/api/get-user";
import { UseCurrentUserProfileById } from "@/features/auth/api/get-user-profile-by-id";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { ElementRef, useEffect, useRef, useState, useTransition } from "react";
import { FaGithub } from "react-icons/fa";

const BioModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const creatinguserprofile = useMutation(api.profile.createuserprofile);
  const [value, setValue] = useState("hello there" || "");
  const [username, setUsername] = useState("hello there" || "");
  const [glink, setGLink] = useState("");
  const [portifoliolink, setPortifolioLink] = useState("'");

  const params = useParams();
  //const{}=GetUser(params.profile)
  const id = params.profile as Id<"users">;
  const { data } = GetUser({ id });

  const { userdata } = UseCurrentUserProfileById({ id });
  const updateuserprofile = useMutation(api.profile.updateuserprofile);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    if (!username || username === "hello there") {
      if (data && data.name) {
        setUsername(data.name);
      } 
    }
    e.preventDefault();
    if (!userdata) {
      const response = await creatinguserprofile({
        username: username,
        bio: value,
        portifoliolink: portifoliolink,
        githublink: glink,
      });

      console.log("mut", response);
    } else if (!!userdata) {
      const { _id, username } = userdata;

      await updateuserprofile({
        id: _id,
        username: username,
        bio: value,
        portifoliolink: portifoliolink,
        githublink: glink,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="ml-auto w-full text-center "
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Label>Username</Label>
          <Input
            placeholder="your username"
            value={username}
            minLength={10}
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label>Your bio</Label>
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
            minLength={50}
            maxLength={300}
            required
          />

          <Label>Github Link</Label>
          <Input
            type="url"
            value={glink}
            onChange={(e) => setGLink(e.target.value)}
            className="border-none focus:border-none"
          />

          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
