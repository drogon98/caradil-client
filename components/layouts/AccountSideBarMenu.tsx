import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { endLogout, startLogout } from "../../redux/logoutSlice";
import { baseHttpDomain } from "../../utils/baseDomain";

interface AccountSideBarMenuProps {
  isHost: boolean;
}

export const AccountSideBarMenu: FC<AccountSideBarMenuProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isChatPage, setIsChatPage] = useState(false);

  useEffect(() => {
    if (router.pathname) {
      const isChat = router.pathname.includes("/chats");
      setIsChatPage(isChat);
    }
  }, [router]);

  return (
    <div className="account-side-menu">
      <ul className="list-style-none m-0">
        <li>
          <Link
            href="/account/personal-details"
            shallow={true}
            data-testid="test-link"
          >
            <a className="link black-link">
              <div>Personal Details</div>
            </a>
          </Link>
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/listings" shallow={true}>
              <a className="link black-link">
                <div>My Cars</div>
              </a>
            </Link>
          </li>
        )}

        {props.isHost && (
          <li>
            <Link href="/account/bookings" shallow={true}>
              <a className="link black-link">
                {" "}
                <div>Bookings </div>
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/account/trips" shallow={true}>
            <a className="link black-link">
              {" "}
              <div>Trips</div>
            </a>
          </Link>
        </li>
        <li>
          {isChatPage ? (
            <span className="link black-link cursor-pointer">
              {" "}
              <div>Chats</div>
            </span>
          ) : (
            <Link href="/account/chats" shallow={true}>
              <a className="link black-link">
                <div>Chats</div>
              </a>
            </Link>
          )}
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/earnings" shallow={true}>
              <a className="link black-link">
                <div>Earnings</div>
              </a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/account/notifications" shallow={true}>
            <a className="link black-link">
              <div>Notifications </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/account/settings" shallow={true}>
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
