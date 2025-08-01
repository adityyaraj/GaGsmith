// components/FileInput.tsx
"use client";
import React from "react";
import { Image, UploadCloud } from "lucide-react"; // or use an <img src="..." />

const FileInput = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload here
      console.log("Selected:", file.name);
    }
  };

  return (
    <label className="relative flex items-center border border-foreground/40 rounded-md px-3 py-2 bg-background text-foreground cursor-pointer">
      {/* Icon on the left */}
      <Image className="w-5 h-5 text-foreground mr-2" />
      <span className="pointer-events-none text-sm text-foreground">Upload</span>

      {/* Hidden file input overlay */}
      <input
        type="file"
        accept=".srt"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </label>
  );
};

export default FileInput;
