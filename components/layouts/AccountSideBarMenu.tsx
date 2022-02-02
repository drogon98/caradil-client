import Link from "next/link";
import router from "next/router";
import React, { FC } from "react";
import { User } from "../../graphql_types/generated/graphql";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { startLogout, endLogout } from "../../redux/logoutSlice";
import { baseHttpDomain } from "../../utils/baseDomain";

interface AccountSideBarMenuProps {
  isHost: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @AccountSideBarMenu
 **/

export const AccountSideBarMenu: FC<AccountSideBarMenuProps> = (props) => {
  const dispatch = useAppDispatch();
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

        <li>
          <button
            className="sm-logout-burger-link link black-link btn p-0 m-0"
            onClick={async () => {
              try {
                dispatch(startLogout());
                const response = await (
                  await fetch(`${baseHttpDomain}logout`, {
                    credentials: "include",
                  })
                ).json();

                if (response.success) {
                  // if (props.isAdmin) {
                  //   await router.push("/root/login");
                  // } else {
                  await router.push("/");
                  dispatch(endLogout());
                  // }
                  dispatch(unsetToken());
                }
              } catch (error) {
                dispatch(endLogout());
                console.log("error :>> ", error);
              }
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
