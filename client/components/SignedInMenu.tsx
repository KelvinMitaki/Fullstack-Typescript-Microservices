import React from "react";
import { Menu, Image, Dropdown, Icon } from "semantic-ui-react";
import Link from "next/link";
import { User } from "../interfaces/User";

interface SignedInMenuInterface {
  user: User;
}

const SignedInMenu = ({ user }: SignedInMenuInterface) => {
  const { firstName, lastName, _id } = user;
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/1.png" />
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
            // onClick={(): LogoutUser => logoutUser()}
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
