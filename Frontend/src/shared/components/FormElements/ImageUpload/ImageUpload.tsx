import React, { useRef, useState, useEffect } from "react";
import Button from "../Button/Button";
import "./ImageUpload.css";

interface ImageUploadProps {
  _id: string;
  center: any;
  error: any;
  errorText: string;
  onInput(_id: string, pickedFile: HTMLImageElement, fileIsValid: boolean): any;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const [file, setFile] = useState<Blob>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const filePickerRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      setPreviewUrl(result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: any) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      fileIsValid = false;
      setIsValid(false);
    }
    props.onInput(props._id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props._id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && props.error.text}
    </div>
  );
};

export default ImageUpload;
