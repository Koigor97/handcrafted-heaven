"use client";

import { useRef, useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.click();
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    // check if file is an image
    if (!file) {
      setSelectedImage(null);
      return;
    }

    // convert image to base64
    const fileReader = new FileReader();

    // read image as base64
    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    };

    // convert image to base64
    fileReader.readAsDataURL(file);
  }

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div>
        {selectedImage ? (
          <Image
            className="h-16 w-16 mb-2 rounded object-contain"
            src={selectedImage}
            alt="Selected image"
            width={100}
            height={100}
          />
        ) : (
          ""
        )}
        <Input
          className="hidden "
          type="file"
          id={name}
          accept="image/png, image/jpeg, image/jpg, image/webp"
          name={name}
          ref={inputRef}
          onChange={handleImageChange}
        />
        <Button onClick={handleClick} type="button" size="sm">
          Pick an image
        </Button>
      </div>
    </div>
  );
}

export default ImagePicker;