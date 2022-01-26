import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiArrowDropDownFill } from "react-icons/ri";
import { unsetToken } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { baseHttpDomain } from "../../utils/baseDomain";

interface UserNavIconProps {}

export function UserNavIcon(props: UserNavIconProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="account-tooltip m-0 p-0 cursor-pointer">
      <span className="d-flex align-items-end">
        <FaRegUserCircle size={"24px"} />
        <RiArrowDropDownFill size={"20px"} className="m-0 p-0" />
      </span>

      <div className="account-tooltip-content shadow p-2">
        <div>
          <Link href="/account">Account</Link>
        </div>
        <div>
          <button
            className="btn m-0 p-0 cursor-pointer"
            onClick={async () => {
              try {
                const response = await (
                  await fetch(`${baseHttpDomain}logout`, {
                    credentials: "include",
                  })
                ).json();

                if (response.success) {
                  await router.push("/");
                  dispatch(unsetToken());
                }
              } catch (error) {
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
