"use client";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";

export function InputFile() {
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "/api/conversation";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", "resume.pdf");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
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
