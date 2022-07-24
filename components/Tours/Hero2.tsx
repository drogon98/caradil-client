import Link from "next/link";

type Props = {};

export default function Hero2({}: Props) {
  return (
    <div className="tours-bg-hero-wrapper">
      <div className="wrapper-overlay d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center">
          Find perfect car to conquer toughest outdoors
        </h1>
        <Link
          href={{
            pathname: "/browse-cars",
            query: { categories: ["tours", "4wd"] },
          }}
        >
          <a className="btn bgOrange mt-4">Browse 4WDs</a>
        </Link>
      </div>
    </div>
  );
}
