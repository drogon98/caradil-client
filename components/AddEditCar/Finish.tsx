import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {}

export default function Finish(props: Props): ReactElement {
  return (
    <div>
      <h3 className="text-success">Yey!!!!!</h3>

      <div>
        <p>
          Your car data is now in our system. Leave it to us now to do what we
          do. We will get back to you in a short while via sms notifying you of
          the status of your listing. If everything is okay,your car will be
          published and made public. Otherwise, we will let you know why your
          car was not a fit for our marketplace.
        </p>
      </div>

      <div className="d-grid gap-2 mt-4">
        <Link href="/account/listings">
          <a className="btn bgOrange">Manage My Listings</a>
        </Link>
      </div>
    </div>
  );
}
