import React from "react";
import { Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import Link from "next/link";
import { User } from "../interfaces/User";
import Axios from "axios";
import Router from "next/router";

interface SignedInMenuInterface {
  user: User;
}

const SignedInMenu = ({ user }: SignedInMenuInterface) => {
  const { firstName, lastName, _id } = user;
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={
          user.photos?.length !== 0
            ? `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${
                user.photos![0]
              }`
            : "/1.png"
        }
      />
      <Dropdown pointing="top left" text={`${firstName} ${lastName}`}>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="plus" />
            <Link href="/new/event">
              <a>
                <span className="text">Create Event</span>
              </a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="user" />
            <Link href="/profile/[userId]" as={`/profile/${_id}`}>
              <a>
                <span className="text">My Profile</span>
              </a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon name="settings" />
            <Link href="/settings/basics">
              <a>
                <span className="text">Settings</span>
              </a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            text="Sign Out"
            icon="power"
            onClick={async () => {
              await Axios.post("/api/user/logout");
              Router.push("/login");
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
      <style jsx>{`
        .text {
          color: black;
        }
      `}</style>
    </Menu.Item>
  );
};
export default SignedInMenu;
