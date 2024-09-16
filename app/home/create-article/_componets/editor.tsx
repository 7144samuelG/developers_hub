"use client";
import { Delta, Op } from "quill/core";
import { Button } from "@/components/ui/button";
import { ImageIcon, Smile, XIcon } from "lucide-react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { PiTextAa } from "react-icons/pi";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { stringify } from "querystring";
type EditorValue = {
  image: File | null;
  body: string;
};
interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  defaultValue?: Delta | Op[];
  variant?: "create" | "update";
}
const Editor = ({
  onCancel,
  onSubmit,
  placeholder = "write an article",
  disabled = false,
  innerRef,
  defaultValue = [],
  variant = "create",
}: EditorProps) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageelementRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const option: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                const text = quill.getText();
                const addedimage = imageelementRef.current?.files?.[0] || null;
                const isEmpty =
                  !addedimage &&
                  text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
                // const isEmpty=text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
                if (isEmpty) {
                  const body = JSON.stringify(quill.getContents());
                  submitRef.current?.({ body, image: addedimage });
                }

                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };
    const quill = new Quill(editorContainer, option);
    quillRef.current = quill;
    quillRef.current.focus();
    if (innerRef) {
      innerRef.current = quill;
    }
    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });
    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);
  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="px-4">
      <div className="flex items-center space-x-10 mt-[50px]">
        <Button variant="link">Go Back to Home page</Button>
        
      </div>
      <div className="flex flex-col w-1/2 mx-auto">
      <h2 className="py-6">Write an article</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files![0])}
          ref={imageelementRef}
          className="hidden"
        />
        <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-30 focus-within:shadow-sm transition bg-white">
          <div ref={containerRef} className="h-full ql-custom " />
          {!!image && (
            <div className="p-2">
              <div className="relative size-[62px] flex items-center justify-center group/image ">
                <button
                  onClick={() => {
                    setImage(null);
                    imageelementRef.current!.value = "";
                  }}
                  className="hidden group-hover:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center"
                >
                  <XIcon className="size-3.5" />
                </button>
                <Image
                  src={URL.createObjectURL(image)}
                  alt=""
                  fill
                  className="rounded-xl overflow-hidden border object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex px-2 pb-2 z-[5]">
            {/* <Button disabled={false} variant="ghost" onClick={() => {}}>
              <PiTextAa className="size-4" />
            </Button>
            <Button disabled={false} variant="ghost" onClick={() => {}}>
              <Smile className="size-4" />
            </Button> */}
            {variant === "create" && (
              <Button
                disabled={false}
                variant="ghost"
                onClick={() => imageelementRef.current?.click()}
              >
                <ImageIcon className="size-4" />
              </Button>
            )}
            {variant === "update" && (
              <div className="ml-auto flex items-center gap-x-2 ">
                <Button variant="outline" disabled={false} onClick={onCancel}>
                  Cancel
                </Button>

                <Button
                  className=" bg-[#007a5a] hover:bg-[#007a5a]/80 text-white "
                  variant="outline"
                  disabled={false}
                  onClick={() => {
                    onSubmit({
                      body: JSON.stringify(quillRef.current?.getContents()),
                      image,
                    });
                  }}
                >
                  Save
                </Button>
              </div>
            )}
            {variant === "create" && (
              <Button
                disabled={disabled || isEmpty}
                onClick={() => {
                  onSubmit({
                    body: JSON.stringify(quillRef.current?.getContents()),
                    image,
                  });
                }}
                className={cn(
                  "ml-auto  ",
                  isEmpty
                    ? "bg-white hover:bg-white text-muted-foreground"
                    : "bg-[#007a5a] h/over:bg-[#007a5a]/80 text-white"
                )}
              >
                submit
              </Button>
            )}
          </div>
        </div>
        {variant === "create" && (
          <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
            <p className=" ">
              <strong>Shift + Return</strong> to add a new line
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
