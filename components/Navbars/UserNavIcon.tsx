import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import client from "../../apollo";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { endLogout, startLogout } from "../../redux/logoutSlice";
import { unsetUser } from "../../redux/userSlice";
import { baseHttpDomain } from "../../utils/baseDomain";

interface UserNavIconProps {
  isAdmin?: boolean;
  isAccount?: boolean;
}

export function UserNavIcon(props: UserNavIconProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const [inDashboard, setInDashboard] = useState(false);
  const token = useAppSelector((state) => state.auth._id);

  useEffect(() => {
    if (router) {
      if (router.pathname.includes("/account")) {
        setInDashboard(true);
      } else {
        setInDashboard(false);
      }
    }
  }, [router]);

  return (
    <div className="account-tooltip m-0 p-0">
      <span className="d-flex align-items-end cursor-pointer">
        <FaRegUserCircle size={"24px"} />
        <RiArrowDropDownFill size={"20px"} className="m-0 p-0" />
      </span>
      {!props.isAccount && !props.isAdmin && notifications.length > 0 && (
        <span className="notifications-dot"></span>
      )}

      <div className="account-tooltip-content shadow p-2">
        {props.isAdmin || props.isAccount ? (
          <>
            {props.isAdmin && (
              <div className="cursor-pointer">
                <Link href="/root">Home</Link>
              </div>
            )}
            {props.isAccount && (
              <div className="cursor-pointer">
                <Link href="/account">Home</Link>
              </div>
            )}
          </>
        ) : (
          <div className="cursor-pointer">
            <Link href="/account">
              <p className="d-flex align-items-center justify-content-between m-0">
                <span>Account</span>{" "}
                <span>
                  {notifications.length > 0 && (
                    <span className="notifications-badge ml-4">
                      {notifications.length}
                    </span>
                  )}
                </span>
              </p>
            </Link>
          </div>
        )}

        <div>
          <button
            className="btn m-0 p-0 cursor-pointer"
            onClick={async () => {
              try {
                dispatch(startLogout());
                const response = await (
                  await fetch(`${baseHttpDomain}logout`, {
                    credentials: "include",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                ).json();

                if (response.success) {
                  if (props.isAdmin) {
                    await router.push("/root/login");
                  } else {
                    if (inDashboard) {
                      await router.push("/");
                    }
                  }
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
      </div>
    </div>
  );
}
