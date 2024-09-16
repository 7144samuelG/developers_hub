"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

type projecValues = {
  websitelinkoftheproject?: string;
  githublink: string;
  nameofproject: string;
  decriptionofproject: string;
  coverimageurl: Id<"_storage">;
  challengeamitosolve: string;
  xhandle: string;
  discordhandle: string;
  telegramhandle: string;
  youtubelinkoftheproject: string;
  category: string;
};
const formSchema = z.object({
  nameofproject: z.string().min(10, {
    message: "project must be at least 10 characters.",
  }),
  problemaimtosolve: z.string().min(50, {
    message: "project problem must be atleast 50 characters length",
  }),
  githublink: z.string(),
  projectwebsite: z.string(),
  videolink: z.string(),
  projectDescription: z.string().min(300, {
    message: "project description must be atleast 300 characters length",
  }),
  telegramhandle: z.string(),
  discordhandle: z.string(),
  twitterhandle: z.string(),
  technologyfield: z.enum(
    [
      "blockchain",
      "ai",
      "machine learning",
      "data science",
      "mobile development",
    ],
    {
      required_error: "You need to select atleast one field.",
    }
  ),
  coverimage: z
    .string()
    .refine((files) => files?.length >= 1, { message: "Image is required." }),
  // To not allow files other than images

  // To not allow files larger than 5MB
});
const ProjectForm = () => {
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);
  const router = useRouter();

  //const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const createproject = useMutation(api.project.createnewproject);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameofproject: "",
      problemaimtosolve: "",
      githublink: "",
      projectwebsite: "",
      videolink: "",
      projectDescription: "",
      telegramhandle: "",
      discordhandle: "",
      twitterhandle: "",
      coverimage: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // setFile(URL.createObjectURL(image))
    console.log("ghbv6788889");
    try {
      setLoading(true);
      console.log("jhgfdxsadfg", values);

      

      if (values.coverimage) {
        const projectsvalues: projecValues = {
          websitelinkoftheproject: values.projectwebsite,
          githublink: values.githublink,
          nameofproject: values.nameofproject,
          decriptionofproject: values.projectDescription,
          coverimageurl: values.coverimage as Id<"_storage">,
          challengeamitosolve: values.problemaimtosolve,
          xhandle: values.twitterhandle,
          discordhandle: values.discordhandle,
          telegramhandle: values.telegramhandle,
          youtubelinkoftheproject: values.videolink,
          category: values.technologyfield,
        };

        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": values.coverimage!.type },
          body: values.coverimage,
        });
        console.log("upload", result);
        if (!result.ok) {
          throw new Error("upload failed");
        }
        const { storageId } = await result.json();
        projectsvalues.coverimageurl=storageId;


        const response = await createproject({
          websitelinkoftheproject: values.projectwebsite,
          githublink: values.githublink,
          nameofproject: values.nameofproject,
          decriptionofproject: values.projectDescription,
          coverimageurl: projectsvalues.coverimageurl,
          challengeamitosolve: values.problemaimtosolve,
          xhandle: values.twitterhandle,
          discordhandle: values.discordhandle,
          telegramhandle: values.telegramhandle,
          youtubelinkoftheproject: values.videolink,
          category: values.technologyfield,
        });
        console.log(response, "res");
        toast.success("project created");
        router.push(`/home`);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-[1300px] mx-auto mt-[70px]">
      <Button variant="link" onClick={() => router.push("/home")}>
        HomePage
      </Button>
      <h1 className="text-center text-4xl">Create a new Project</h1>
      <div className="pb-10">
        <Form {...form}>
          <form
            className="w-1/2 mx-auto border p-3 rounded-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nameofproject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name of project <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="devshub" required {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="problemaimtosolve"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Problem the project aim to solve{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="...." {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverimage"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormControl>
                    <Input
                      placeholder="@devshub"
                      type="file"
                      {...field}
                      required
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologyfield"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Category...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="blockchain" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Blockchain
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ai" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Artificial Intelligence
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="machine learning" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Machine Learning
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="data science" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Data Science
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mobile development" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Mobile Development
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githublink"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>
                    Github link of project code{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@devshub"
                      type="url"
                      {...field}
                      required
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectwebsite"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>website of project if (any)</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="url" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videolink"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>
                    A Youtube Link for the project{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="..." type="url" {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description of the project{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="...." {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className="my-3 underline">contacts </h2>
            <FormField
              control={form.control}
              name="telegramhandle"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>
                    Your telegram handle <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discordhandle"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>
                    Your discord handle <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitterhandle"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel>
                    Your x(twitter) handle{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end my-3 ">
              <Button disabled={loading}>Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
