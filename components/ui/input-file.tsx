"use client";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function InputFile() {
  const [file, setFile] = useState();
  const router = useRouter();
  const proModal = useProModal();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "/api/conversation";
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("fileName", "resume.pdf");
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    try {
      const response = axios.post(url);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="resume">Resume.pdf</Label>
        <Input id="resume" type="file" />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
