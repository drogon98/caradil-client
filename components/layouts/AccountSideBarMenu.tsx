import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import client from "../../apollo";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { endLogout, startLogout } from "../../redux/logoutSlice";
import { unsetUser } from "../../redux/userSlice";
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
          <Link href="/account" shallow={true}>
            <a className="link white-link d-flex align-items-center">
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="account-menu-icon"
                >
                  <path
                    fill="currentColor"
                    d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"
                  />
                </svg>
              </div>

              <div>Overview</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/account/profile" shallow={true} data-testid="test-link">
            <a className="link white-link d-flex align-items-center">
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  className="account-menu-icon"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                  </g>
                </svg>
              </div>
              <div>
                <p className="m-0">Profile</p>
              </div>
            </a>
          </Link>
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/listings" shallow={true}>
              <a className="link white-link d-flex align-items-center">
                <div className="account-menu-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    className="account-menu-icon"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fill="currentColor"
                      d="M5.518 6.026L4.86 8H8V5H6.942a1.5 1.5 0 0 0-1.424 1.026ZM4.528 9l-.004.01l-.266.066l-.122.03A1.5 1.5 0 0 0 3 10.562v1.688c0 .16.05.31.137.432A2.501 2.501 0 0 1 7.95 13h4.1a2.5 2.5 0 0 1 4.813-.318a.746.746 0 0 0 .137-.432v-1.213a1.5 1.5 0 0 0-1.114-1.45L13.685 9H4.527Zm8.345-1l-1.239-2.228A1.5 1.5 0 0 0 10.324 5H9v3h3.873ZM18 12.25a1.75 1.75 0 0 1-1.023 1.592A2.5 2.5 0 0 1 12.05 14h-4.1a2.5 2.5 0 0 1-4.927-.158A1.75 1.75 0 0 1 2 12.25v-1.688a2.5 2.5 0 0 1 1.747-2.384l.823-2.469A2.5 2.5 0 0 1 6.942 4h3.381a2.5 2.5 0 0 1 2.186 1.286l1.542 2.777l2.093.558A2.5 2.5 0 0 1 18 11.037v1.213ZM5.5 12a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"
                    />
                  </svg>
                </div>
                <div>My Cars</div>
              </a>
            </Link>
          </li>
        )}

        {props.isHost && (
          <li>
            <Link href="/account/bookings" shallow={true}>
              <a className="link white-link d-flex align-items-center">
                <div className="account-menu-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    className="account-menu-icon"
                    viewBox="0 0 48 48"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    >
                      <rect width="30" height="36" x="9" y="8" rx="2" />
                      <path
                        strokeLinecap="round"
                        d="M18 4v6m12-6v6m-14 9h16m-16 8h12m-12 8h8"
                      />
                    </g>
                  </svg>
                </div>
                <div>Bookings </div>
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/account/trips" shallow={true}>
            <a className="link white-link d-flex align-items-center">
              {" "}
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  className="account-menu-icon"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5S5.121 15 6.5 15h7c1.93 0 3.5-1.57 3.5-3.5S15.43 8 13.5 8H8.639a9.812 9.812 0 0 1-1.354 2H13.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-7C4.019 13 2 15.019 2 17.5S4.019 22 6.5 22h9.593a10.415 10.415 0 0 1-1.249-2zM5 2C3.346 2 2 3.346 2 5c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5 6.5z"
                  />
                  <path
                    fill="currentColor"
                    d="M19 14c-1.654 0-3 1.346-3 3c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 19 18.5z"
                  />
                </svg>
              </div>
              <div>Trips</div>
            </a>
          </Link>
        </li>
        <li>
          {isChatPage ? (
            <span className="link white-link d-flex align-items-center cursor-pointer">
              {" "}
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  className="account-menu-icon"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M2.678 11.894a1 1 0 0 1 .287.801a10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6c0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7s-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                  />
                </svg>
              </div>
              <div>Chats</div>
            </span>
          ) : (
            <Link href="/account/chats" shallow={true}>
              <a className="link white-link d-flex align-items-center">
                <div className="account-menu-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    className="account-menu-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M2.678 11.894a1 1 0 0 1 .287.801a10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6c0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7s-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    />
                  </svg>
                </div>
                <div>Chats</div>
              </a>
            </Link>
          )}
        </li>
        {props.isHost && (
          <li>
            <Link href="/account/earnings" shallow={true}>
              <a className="link white-link d-flex align-items-center">
                <div className="account-menu-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    className="account-menu-icon"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M2 7v17h28V7H2zm4 2h20a2 2 0 0 0 2 2v9a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2v-9a2 2 0 0 0 2-2zm10 2c-2.211 0-4 2.016-4 4.5s1.789 4.5 4 4.5c2.211 0 4-2.016 4-4.5S18.211 11 16 11zm0 2c1.102 0 2 1.121 2 2.5s-.898 2.5-2 2.5c-1.102 0-2-1.121-2-2.5s.898-2.5 2-2.5zm-7.5 1a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 8.5 14zm15 0a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 23.5 14z"
                    />
                  </svg>
                </div>
                <div>Earnings</div>
              </a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/account/notifications" shallow={true}>
            <a className="link white-link d-flex align-items-center">
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  className="account-menu-icon"
                >
                  <path
                    fill="currentColor"
                    d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
                  />
                </svg>
              </div>
              <div>Notifications</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/account/settings" shallow={true}>
            <a className="link white-link d-flex align-items-center">
              <div className="account-menu-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  className="account-menu-icon"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  >
                    <path d="M19 3v4m0 14V11m-7-8v12m0 6v-2M5 3v2m0 16V9" />
                    <circle cx="19" cy="9" r="2" transform="rotate(90 19 9)" />
                    <circle
                      cx="12"
                      cy="17"
                      r="2"
                      transform="rotate(90 12 17)"
                    />
                    <circle cx="5" cy="7" r="2" transform="rotate(90 5 7)" />
                  </g>
                </svg>
              </div>
              <div>Settings</div>
            </a>
          </Link>
        </li>

        <li>
          <div className="sm-logout-burger-link align-items-center link white-link">
            <div className="account-menu-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
                className="account-menu-icon"
              >
                <path
                  fill="currentColor"
                  d="M77.155 272.034H351.75v-32.001H77.155l75.053-75.053v-.001l-22.628-22.626l-113.681 113.68l.001.001h-.001L129.58 369.715l22.628-22.627v-.001l-75.053-75.053z"
                />
                <path
                  fill="currentColor"
                  d="M160 16v32h304v416H160v32h336V16H160z"
                />
              </svg>
            </div>
            <button
              className="sm-logout-burger-link  link white-link btn p-0 m-0"
              onClick={async () => {
                try {
                  dispatch(startLogout());
                  const response = await (
                    await fetch(`${baseHttpDomain}logout`, {
                      credentials: "include",
                    })
                  ).json();

                  if (response.success) {
                    await router.push("/");
                    await client.clearStore();
                    dispatch(endLogout());
                    dispatch(unsetUser());
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
          </div>
        </li>
      </ul>
    </div>
  );
};
