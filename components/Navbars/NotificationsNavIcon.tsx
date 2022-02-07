import Link from "next/link";
import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import { useAppSelector } from "../../redux/hooks";

interface NotificationsNavIconProps {
  isAdmin?: boolean;
  isAccount?: boolean;
}

export function NotificationsNavIcon(props: NotificationsNavIconProps) {
  //   const router = useRouter();
  //   const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  return (
    <div className="notifications-nav-tooltip m-0 p-0">
      {/* <Link href={"/account/notifications"}>
        <a> */}
      <span className="cursor-pointer">
        <HiOutlineBell size={"21px"} />
      </span>
      {/* </a>
      </Link> */}
      {!props.isAccount && !props.isAdmin && notifications.length > 0 && (
        <span className="notifications-dot"></span>
      )}

      {notifications.length > 0 && (
        <div className="notifications-nav-tooltip-content shadow p-0">
          <div className="bgOrange p-3 m-0 notifications-nav-tooltip-content-header">
            <h6 className="m-0 text-center">
              All Notifications ({notifications.length})
            </h6>
          </div>
          <div>
            <div className="generic-notification-box p-2 pt-3">
              <div>
                <small>You have 1 new notification</small>
              </div>
              <div className="pb-2 text-end">
                <Link href="/account/notifications">
                  <a>
                    <small className="colorOrange" style={{ fontSize: "12px" }}>
                      View
                    </small>
                  </a>
                </Link>
              </div>

              {/* <div className="generic-notification-box-border" /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
