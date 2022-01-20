import React, { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { useGetMakesQuery } from "../../graphql_types/generated/graphql";
import slugify from "slugify";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import FlexibleLoader from "../Loading/FlexibleLoader";

interface IProps {}

/**
 * @author
 * @function @BrowseByMake
 **/

export const BrowseByMake: FC<IProps> = (props) => {
  const [makes, setMakes] = useState<any[]>([]);
  const { data, loading } = useGetMakesQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.makes) {
      setMakes([...data?.makes]);
    }
  }, [data]);

  const { width } = useWindowDimensions();

  const settings = {
    // dots: true,
    autoplay: width <= 600 ? true : false,
    infinite: true,
    speed: width <= 600 ? 700 : 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: width <= 600 ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          // slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 1,
        },
      },
    ],
  };

  // console.log("makes :>> ", makes);
  return (
    <div className="page-section customContainer">
      <div className="text-center">
        <p className="text-uppercase section-heading-top-heading">
          Choose your best ride
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <div className="section-heading-hr" />
      </div>
      <div className="text-center">
        <h2 className="mb-5">Browse by make</h2>
      </div>

      <div className="makes-slider">
        {loading ? (
          <FlexibleLoader />
        ) : (
          <Slider {...settings}>
            {makes.map((make) => (
              <div className="makeSlide" key={make.id}>
                <div className="makeSlideInner shadow">
                  <Link
                    href={{
                      pathname: `/browse-cars/${make.title.toLowerCase()}`,
                    }}
                  >
                    <a>
                      <img
                        src={
                          make.photo.secure_url
                            ? make.photo.secure_url
                            : "/images/lambo.jpg"
                        }
                        height="120px"
                        width="100%"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        style={{ height: "calc(100% - 120px)" }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <h5 className="m-0">{make.title}</h5>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
    // </div>
  );
};
