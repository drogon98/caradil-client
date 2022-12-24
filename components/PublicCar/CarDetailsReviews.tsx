import React, { FC, useEffect, useRef, useState } from "react";
import {
  Review,
  useGetCarReviewsLazyQuery,
} from "../../graphql_types/generated/graphql";
import { Loading } from "../Loading";
import Spinner from "../Loading/Spinner";

interface CarDetailsReviewsProps {
  carId: string;
}

export const CarDetailsReviews: FC<CarDetailsReviewsProps> = (props) => {
  const [reviews, setReviews] = useState<Review[]>();
  const [hasMore, setHasMore] = useState(false);
  const [getReviews, { data, loading }] = useGetCarReviewsLazyQuery({
    variables: { carId: props.carId },
  });
  const [mainLoading, setMainLoading] = useState(false);
  const reviewsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: number;
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!id) {
              setMainLoading(true);
              id = window.requestIdleCallback(() => {
                // setTimeout(() => {
                getReviews({
                  variables: { carId: props.carId },
                });
                // }, 5000);
              });
              // console.log("id :>> ", id);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (reviewsWrapperRef) {
      observer.observe(reviewsWrapperRef.current!);
    }

    return () => {
      window.cancelIdleCallback(id);
    };
  }, []);

  useEffect(() => {
    if (data?.getCarReviews) {
      setReviews([...(reviews ?? []), ...data.getCarReviews]);
      setMainLoading(false);
    }
  }, [data]);

  const handleLoadMore = async () => {
    try {
      getReviews();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // console.log("mainLoading", mainLoading);

  return (
    <div ref={reviewsWrapperRef}>
      <h6 className="fw-bolder car-details-sections-heading">Reviews</h6>

      {mainLoading ? (
        <div className="py-5">
          <Spinner />
        </div>
      ) : (
        <>
          {reviews && reviews.length > 0 ? (
            <div>
              {reviews.map((rv) => (
                <div key={rv.id}>{rv.comment}</div>
              ))}
              {loading && (
                <div className="py-2">
                  <Spinner />
                </div>
              )}
            </div>
          ) : (
            <div className="my-3">
              <p>No reviews yet!</p>
            </div>
          )}

          {reviews && reviews.length > 0 && hasMore && (
            <div className="mt-2">
              <button
                className="btn btn-outline-secondary"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
