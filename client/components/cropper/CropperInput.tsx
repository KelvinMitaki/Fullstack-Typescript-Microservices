import React, { Component, createRef } from "react";
import Cropper from "react-cropper";

interface CropperInputInterface {
  imagePreview: string;
  setImage: Function;
}

interface RefObject extends React.RefObject<HTMLImageElement> {}

export class CropperInput extends Component<CropperInputInterface> {
  cropper = createRef() as RefObject;
  cropImage = () => {
    const { setImage } = this.props;
    // if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
    //   return;
    // }
    // this.cropper.current.getCroppedCanvas().toBlob(blob => {
    setImage(this.cropper.current!.src);
    // }, "image/*");
  };
  render() {
    const { imagePreview } = this.props;

    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: 400, width: "100%" }}
        preview=".img-preview"
        aspectRatio={1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export default CropperInput;
