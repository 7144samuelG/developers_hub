"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type projectValues = {
  nameofproject: string;
  decriptionofproject: string;
  githublink: string;
  coverimageurl: Id<"_storage"> | undefined;
  challengeamitosolve: string;
  xhandle: string;
  discordhandle: string;
  youtubelinkoftheproject: string;
  category: string;
};
const ProjectForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [vision, setVision] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [glink, setGlink] = useState("");
  const [vlink, setVlink] = useState("");
  const [dhandle, setDhandle] = useState("");
  const [xhandle, setXhandle] = useState("");
  const [cat, setCat] = useState("");

  const uploadurl = useMutation(api.upload.generateUploadUrl);
   const createproject=useMutation(api.project.createnewproject);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      vision,
      glink,
      vlink,
      dhandle,
      xhandle,
      cat,
      image,
    };
    try {
      const values: projectValues = {
        nameofproject: name,
        decriptionofproject: description,
        githublink: glink,
        coverimageurl: undefined,
        challengeamitosolve: vision,
        xhandle,
        discordhandle: dhandle,
        youtubelinkoftheproject: vlink,
        category: cat,
      };

      if (image) {
        const posturl = await uploadurl();
        const result = await fetch(posturl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!result.ok) {
          throw new Error("upload failed");
        }
        const { storageId } = await result.json();
        values.coverimageurl = storageId;


        


        const response =await createproject({
          nameofproject: values.nameofproject,
          decriptionofproject: values.decriptionofproject,
          githublink: values.githublink,
          coverimageurl: values.coverimageurl,
          challengeamitosolve: values.challengeamitosolve,
          xhandle: values.xhandle,
          discordhandle: values.discordhandle,
          youtubelinkoftheproject: values.youtubelinkoftheproject,
          category: values.category,
        })
        console.log(response,"bn")
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <div className="w-[1300px] mx-auto mt-[20px]">
      <Button variant="link" onClick={() => router.push("/home")}>
        HomePage
      </Button>
      <h1 className="text-center text-4xl">Create a new Project</h1>
      <div className="pb-10">
        <form
          action=""
          className="w-1/2 mx-auto border p-3 rounded-md"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col space-y-2">
            <Label htmlFor="" className="my-4">
              Name of the project
            </Label>
            <Input
              value={name}
              placeholder="name of the project"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Description of the project
            </Label>
            <Textarea
              value={description}
              placeholder="decription of the project"
              required
              minLength={300}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Vision of the project
            </Label>
            <Textarea
              value={vision}
              placeholder="decription of the vision of the project"
              required
              onChange={(e) => setVision(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Cover image of the project
            </Label>
            <input
              type="file"
              accept="image/*"
              placeholder="cover image of the project"
              required
              onChange={(e) => setImage(e.target.files![0])}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Github link of the project
            </Label>
            <Input
              value={glink}
              placeholder="Github link of the  project"
              required
              onChange={(e) => setGlink(e.target.value)}
            />
          </div>
          <div className="">
            <Label
              htmlFor=""
              className="block text-sm font-medium text-gray-700"
            >
              Category field
            </Label>
            <div className="mt-1">
              <select
                name="category"
                onChange={(e) => setCat(e.target.value)}
                id=""
                className="w-full border-gray-300 rounded-lg shadow-sm "
              >
                <option value="">please select category</option>
                <option value="blockchain">Blockcahin</option>
                <option value="machine learning">Machine learning</option>
                <option value="mobile development">Mobile Development</option>
                <option value="arttificial intelligece">
                  Artificial Intelligence
                </option>
                <option value="data science">Data Science</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              VideoLink link of the project
            </Label>
            <Input
              value={vlink}
              placeholder="video link of the  project"
              required
              onChange={(e) => setVlink(e.target.value)}
            />
          </div>
          <h1 className="">contacts</h1>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Your Discord handle
            </Label>
            <Input
              value={dhandle}
              type="url"
              placeholder="your discord account"
              required
              onChange={(e) => setDhandle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="" className="my-4">
              Your x(twitter) handle
            </Label>
            <Input
              value={xhandle}
              type="url"
              placeholder="your x(twitter) account"
              required
              onChange={(e) => setXhandle(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end my-3 ">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
