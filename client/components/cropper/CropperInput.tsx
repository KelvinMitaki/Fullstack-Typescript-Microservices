import React, { Component, createRef } from "react";
import Cropper from "react-cropper";

interface CropperInputInterface {
  imagePreview: string;
  setImage: Function;
}

interface RefObject extends React.RefObject<HTMLImageElement> {}

export class CropperInput extends Component<CropperInputInterface> {
  cropper = createRef();
  cropImage = () => {
    const { setImage } = this.props;
    // @ts-ignore
    if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    // @ts-ignore
    this.cropper.current.getCroppedCanvas().toBlob((blob: Blob) => {
      setImage(blob);
    }, "image/*");
  };
  render() {
    const { imagePreview } = this.props;

    return (
      <Cropper
        // ref={this.cropper}
        // @ts-ignore
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
