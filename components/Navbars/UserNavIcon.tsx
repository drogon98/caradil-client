import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { baseUrl } from "../../utils/baseUrl";
import { RiArrowDropDownFill } from "react-icons/ri";

interface UserNavIconProps {}

export function UserNavIcon(props: UserNavIconProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="account-tooltip m-0 p-0 cursor-pointer">
      <span className="d-flex align-items-end">
        <Icon icon="carbon:user-avatar" style={{ fontSize: "30px" }} />
        <RiArrowDropDownFill size={"20px"} className="m-0 p-0" />
      </span>

      <div className="account-tooltip-content shadow">
        <div>
          <Link href="/account">Account</Link>
        </div>
        <div>
          <button
            className="btn m-0 p-0 cursor-pointer"
            onClick={async () => {
              const response = await (
                await fetch(`${baseUrl}logout`, {
                  credentials: "include",
                })
              ).json();

              if (response.success) {
                await router.push("/");
                dispatch(unsetToken());
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
