import React from "react";
import Link from "next/link";
import { Menu, Header } from "semantic-ui-react";

const SettingsNav = () => {
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
          <Link href="/profile">
            <a>My Account</a>
          </Link>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default SettingsNav;
