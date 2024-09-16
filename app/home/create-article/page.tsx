// import dynamic from "next/dynamic";
"use client";
import { useRef, useState } from "react";
import Editor from "./_componets/editor";
import Quill from "quill";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

type articleValues = {
  body: string;
  image: Id<"_storage"> | undefined;
};
// const Editor=dynamic(()=>import("./_componets/editor"),{ssr:false})
const ArticlePage = () => {
  const editorRef = useRef<Quill | null>(null);
  const createnewarticle = useMutation(api.articles.createarticle);

  const [pending, setIsPending] = useState(false);
  const uploadurl = useMutation(api.upload.generateUploadUrl);

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);

      const values: articleValues = {
        body,
        image: undefined,
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
        values.image = storageId;
      }
      const response = await createnewarticle({
        article: body,
        image: values.image,
      });
      console.log("res", response);
    } catch (error) {
      toast.error("failed to send message");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="h-full border w-full ">
      <Editor
        placeholder="write an article"
        onSubmit={handleSubmit}
        disabled={pending}
        innerRef={editorRef}
        variant="create"
      />
    </div>
  );
};

export default ArticlePage;
