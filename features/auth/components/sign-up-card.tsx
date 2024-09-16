import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useState } from "react";
import {TriangleAlert} from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react";
interface SignUpCardProps{
  setState:(state:SignInFlow)=>void;
}
export const SignUpCard = ({setState}:SignUpCardProps) => {
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [confirmpassword,setConfrimPassword]=useState("");
   const [pending,setPending]=useState(false);
   const [error,setError]=useState("");
   const { signIn } = useAuthActions();
   const onPasswordSignUp=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(password!==confirmpassword){
      setError("password dont match");
      return;
    }
    setPending(true);
    signIn("password",{name,email,password,flow:"signUp"}).catch(()=>{
      setError("something went wrong");
    }).finally(()=>{
      setPending(false);
    })
   };
   const onProvider=(value:"github"|"google")=>{
    setPending(true);

    signIn(value).finally(()=>{
      setPending(false);
    })
  }
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to Continue</CardTitle>
        <CardDescription>
          use your email or any other service to continue
        </CardDescription>
      </CardHeader>
      {!!error &&(
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 ">
          <TriangleAlert className="size-4"/>
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 pb-0 px-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
        <Input
              disabled={pending}
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              placeholder="username"
              type="text"
              required
           
            />
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder="email"
              type="email"
              required
           
            />
          
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder="password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmpassword}
            onChange={(e) => {setConfrimPassword(e.target.value)}}
            placeholder="confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
    
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProvider("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5 mb-5" />
             continue with google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProvider("github")}
            variant="outline"
            size="lg"
            className="w-full relative "
          >
            <FaGithub className="size-5 absolute top-1 left-1" />
            continue with github
          </Button>
        </div>
        <div className="flex ">
          <p className="text-xs text-muted-foreground">
            Already have an account{" "}
            <span onClick={()=>setState("signIn")} className="text-sky-700 sign hover:underline cursor-pointer">
              sign in
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
