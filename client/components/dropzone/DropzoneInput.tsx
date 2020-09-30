import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface DropzoneInputInterface {
  setFiles: Function;
}

const DropzoneInput = ({ setFiles }: DropzoneInputInterface) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map((file: { [key: string]: string }) => ({
          ...file,
          preview: URL.createObjectURL(file)
        }))
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*"
  });
  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive && "dropzone--isActive"}`}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};
export default DropzoneInput;
