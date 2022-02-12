import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { endLogout, startLogout } from "../../redux/logoutSlice";
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
                  })
                ).json();

                if (response.success) {
                  if (props.isAdmin) {
                    await router.push("/root/login");
                  } else {
                    await router.push("/");
                  }
                  dispatch(endLogout());
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
