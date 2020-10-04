import React, { useContext } from "react";
import Link from "next/link";
import { Menu, Header } from "semantic-ui-react";
import { UserContext } from "../contexts/userContext";

const SettingsNav = () => {
  const { user } = useContext(UserContext);
  return (
    <React.Fragment>
      <Menu vertical>
        <Header icon="user" attached inverted color="grey" content="Profile" />
        <Menu.Item>
          <Link href="/settings/basics">
            <a>Basics</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/settings/about">
            <a>About Me</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/settings/photos">
            <a>My Photos</a>
          </Link>
        </Menu.Item>
      </Menu>

      <Menu vertical>
        <Header
          icon="settings"
          attached
          inverted
          color="grey"
          content="Account"
        />
        <Menu.Item>
          <Link href={`/profile/${user?._id}`}>
            <a>My Account</a>
          </Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default SettingsNav;
