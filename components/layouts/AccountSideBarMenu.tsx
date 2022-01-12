import Link from "next/link";
import React, { FC } from "react";

interface AccountSideBarMenuProps {
  isHost: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @AccountSideBarMenu
 **/

export const AccountSideBarMenu: FC<AccountSideBarMenuProps> = (props) => {
  return (
    <div className="account-side-menu">
      <ul className="list-style-none m-0">
        <li>
          <Link href="/account/personal-details" data-testid="test-link">
            <a className="link black-link">
              <div>Personal Details</div>
            </a>
          </Link>
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/listings">
              <a className="link black-link">
                <div>My Cars</div>
              </a>
            </Link>
          </li>
        )}

        {props.isHost && (
          <li>
            <Link href="/account/bookings">
              <a className="link black-link">
                {" "}
                <div>Bookings </div>
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/account/trips">
            <a className="link black-link">
              {" "}
              <div>Trips</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/account/chats">
            <a className="link black-link">
              <div>Chats </div>
            </a>
          </Link>
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/earnings">
              <a className="link black-link">
                <div>Earnings</div>
              </a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/account/notifications">
            <a className="link black-link">
              <div>Notifications </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/account/settings">
            <a className="link black-link">
              <div>Settings</div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
