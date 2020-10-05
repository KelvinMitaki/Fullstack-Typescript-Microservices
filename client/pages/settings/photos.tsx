import React, { useState, useEffect } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card
} from "semantic-ui-react";
import DropzoneInput from "../../components/dropzone/DropzoneInput";
import Layout from "../../components/Layout";
import CropperInput from "../../components/cropper/CropperInput";
import SettingsNav from "../../components/SettingsNav";
import { User } from "../../interfaces/User";
import withAuth from "../../hocs/withAuth";
import axios from "axios";
import Router from "next/router";

interface Props {
  photos: { [key: string]: string }[];
  profile: { [key: string]: string };
  user: User | null;
}

const PhotosPage = ({
  photos,
  profile,
  user
}: //   deletePhoto,
//   updateProfilePhoto
Props) => {
  const [files, setFiles] = useState<{ [key: string]: string }[]>([]);
  const [image, setImage] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      files.forEach((file: { [key: string]: string }) =>
        URL.revokeObjectURL(file.preview)
      );
    };
  }, [files]);
  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const uploadConfig = await axios.get("/api/user/image/upload");
      await axios.put(uploadConfig.data.url, image, {
        headers: { "Content-Type": image?.type }
      });
      // @ts-ignore
      await axios.post("/api/user/profile/edit", {
        photos: [...user?.photos, uploadConfig.data.key]
      });
      setLoading(false);
      Router.push("/settings/photos");
      handleCancelCrop();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };
  //   const handleDeletePhoto = async photo => {
  //     try {
  //       await deletePhoto(photo);
  //     } catch (error) {
  //       toastr.error("Oops!!!", error);
  //     }
  //   };
  // const handleUpdateProfilePhoto = async photo => {
  //     await updateProfilePhoto(photo);
  //   };
  return (
    <Layout title="Photos" user={user}>
      <div className="profile">
        <Grid stackable>
          <Grid.Column width={12}>
            <Segment stacked>
              <Header dividing size="large" content="Your Photos" />
              <Grid stackable>
                <Grid.Row />
                <Grid.Column width={4}>
                  <Header color="teal" sub content="Step 1 - Add Photo" />
                  <DropzoneInput setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                  <Header sub color="teal" content="Step 2 - Resize image" />
                  {files.length > 0 && (
                    <CropperInput
                      setImage={setImage}
                      imagePreview={files[0].preview}
                    />
                  )}
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                  <Header
                    sub
                    color="teal"
                    content="Step 3 - Preview & Upload"
                  />

                  {files.length > 0 && (
                    <React.Fragment>
                      <div
                        className="img-preview"
                        style={{
                          minHeight: "200px",
                          minWidth: "200px",
                          overflow: "hidden"
                        }}
                      />
                      <Button.Group>
                        <Button
                          loading={loading}
                          onClick={handleUploadImage}
                          style={{ width: "100px" }}
                          positive
                          icon="check"
                        />
                        <Button
                          onClick={handleCancelCrop}
                          style={{ width: "100px" }}
                          positive
                          icon="close"
                        />
                      </Button.Group>
                    </React.Fragment>
                  )}
                </Grid.Column>
              </Grid>

              <Divider />
              <Header sub color="teal" content="All Photos" />

              <Card.Group itemsPerRow={5}>
                <Card>
                  <Image
                    src={
                      user?.photos?.length !== 0
                        ? `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${
                            user?.photos![0]
                          }`
                        : `/1.png`
                    }
                    style={{ minHeight: "80%" }}
                  />
                  <Button positive>Main Photo</Button>
                </Card>
                {user?.photos?.length !== 0 &&
                  user?.photos
                    ?.filter((photo: string, index: number) => index !== 0)
                    .map((photo: string) => (
                      <Card key={photo}>
                        <Image
                          src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${photo}`}
                          style={{ minHeight: "80%" }}
                        />
                        <div className="ui two buttons">
                          <Button
                            // onClick={() => handleUpdateProfilePhoto(photo)}
                            basic
                            color="green"
                          >
                            Main
                          </Button>
                          <Button
                            // onClick={() => handleDeletePhoto(photo)}
                            basic
                            icon="trash"
                            color="red"
                          />
                        </div>
                      </Card>
                    ))}
              </Card.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <SettingsNav />
          </Grid.Column>
        </Grid>
      </div>
      <style jsx>{`
        .profile {
          margin-top: 35vh;
        }
        @media screen and (min-width: 760px) {
          .profile {
            margin-top: 15vh;
          }
        }
      `}</style>
    </Layout>
  );
};

export default withAuth(PhotosPage);
