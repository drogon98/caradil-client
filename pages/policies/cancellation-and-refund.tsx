import type { NextPage } from "next";
import { CustomHead } from "../../components/CustomHead";
import Layout from "../../components/Layouts/Layout";
import DropDown from "../../components/Policies/DropDown";

const CancellationAndRefund: NextPage = () => {
  return (
    <>
      <CustomHead title="Cancellation And Refund" />
      <Layout>
        <div className="customContainer my-5">
          <DropDown />
          <h1>Cancellation And Refund</h1>
          <h3 className="mt-4">Guest cancellation</h3>
          <p>
            Guests may cancel their trip through our site, and the cancellation
            is effective immediately. Whether the guest receives a full refund,
            a partial refund, or receives no refund depends on the
            circumstances. The total amount refunded will depend on when the
            guest cancels the trip.
          </p>
          <br />
          <h5>Full refund: Free cancellation period and cancellation</h5>
          <h6>Free cancellation period</h6>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">TRIP DURATION</th>
                <th scope="col">FREE CANCELLATION PERIOD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Less than 24hrs</td>
                <td>
                  Within 1hr after booking and host has not confirmed trip
                </td>
              </tr>
              <tr>
                <td>More than 24hrs</td>
                <td>
                  Within 24hrs after booking and host has not confirmed trip
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            Guests can only cancel free of charge if host has not yet confirmed
            their trip.
          </p>
          {/* <p>
            In case host has confirmed the trip,guests may cancel free of charge
            within 1hr after trip if the trip is scheduled to start within 24hrs
            after booking. Guests may cancel free of charge within 24hrs after
            booking if the trip is scheduled to start after 24hrs from booking
            time. If guest wants to cancel a confirmed trip, we encourage them
            to notify their host as soon as possible via Caradil messaging and
            to process the cancellation themselves through the Caradil website.
          </p> */}
          <br />
          <h6>Trip modifications</h6>
          <p>
            If a guest requests a trip modification and the host accepts, that
            modification does not reset the free cancellation period for the
            trip. It remains tied to the original booking time.
          </p>
          <br />
          <h5>
            Partial refund: Cancellations outside the free period and guest
            no-shows
          </h5>
          <h6>Cancellations outside the free period</h6>
          <p>
            If a guest wants to cancel a confirmed trip, we encourage them to
            notify the host via Caradil messaging as soon as possible and to
            process the cancellation themselves through the Caradil website.
            We’ll issue a partial refund to guests who cancel in this manner and
            do not fall within the free cancellation period. If a trip is
            cancelled and it is less 24 hours long, we will refund the guest the
            trip fee minus (total trip fee/60) fee. For cancelled trips that are
            longer than 24 hours, we’ll refund the guest the trip fee (total
            trip fee/24).{" "}
            <b>
              Note. If the trip car was to be delivered and host had delivered
              the car to the delivery point,delivery fee will also be deducted.
            </b>
          </p>
          <br />
          <h6>Guest no-show</h6>
          <p>
            If a guest fails to cancel and doesn't show up for the trip within
            1hr of the trip's scheduled start time, it's a guest no-show. Also,
            if someone else shows up for the trip other than the person who
            booked the trip,its also a guest no-show. Caradil or the host will
            cancel guest no-show trips, and we’ll issue the guest a partial
            refund. For no-show trips that are less 24hrs long, we’ll refund the
            guest their trip fee minus 1 hour fee and delivery fee if the car
            was delivered . For no-show trips that are more than 24hrs longer,
            we’ll refund the guest their trip fee minus 1 day trip fee and
            delivery fee if the car was delivered. If the car was not to be
            delivered, then no delivery fee is deducted.
          </p>

          {/* <p>
            <strong>TRIP LENGTH</strong>
          </p>
          <p>
            <strong>REFUND AMOUNT</strong>
          </p>
          <p>More than two days</p>
          <p>
            Full amount refunded minus two days' average&nbsp;
            <a
              href="https://support.Caradil.com/hc/articles/203991170-How-much-does-a-trip-cost-"
              rel="noopener noreferrer"
              target="_blank"
            >
              trip price/trip fee combined
            </a>
            &nbsp;+ half of any delivery fee
          </p>
          <p>Two days or less</p>
          <p>
            Full amount refunded minus 75% of one day’s average&nbsp;
            <a
              href="https://support.Caradil.com/hc/articles/203991170-How-much-does-a-trip-cost-"
              rel="noopener noreferrer"
              target="_blank"
            >
              trip price/trip fee combined
            </a>
            &nbsp;+ half of any delivery fee
          </p>
          <p>Exceptions</p>
          <p>
            Exceptions to the guest refund amounts for cancellations outside the
            free period and for no-shows may apply in the event of a flight
            delay, flight cancellation, lost baggage issue (see below),&nbsp;
            <a
              href="https://support.Caradil.com/hc/en-us/articles/360000808347-Cleaning-policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              safety issues tied to vehicle cleanliness
            </a>
            , or other&nbsp;
            <a
              href="https://support.Caradil.com/hc/articles/360044481393-Extenuating-Circumstances-Policy"
              rel="noopener noreferrer"
              target="_blank"
            >
              extenuating circumstances
            </a>
            .
          </p>
          <h3>
            <strong>No refund: Early returns</strong>
          </h3>
          <p>Early returns</p>
          <p>
            There are no credits/refunds issued for early returns except when
            the guest has submitted a trip modification request to shorten their
            trip and the host has accepted through the Caradil website or app,
            as defined in Caradil&nbsp;
            <a
              href="https://Caradil.com/us/en/policies/terms"
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms of service
            </a>
            .
          </p> */}
          <br />
          <h3>
            Guest trips canceled by host, host no-shows, and trips canceled by
            Caradil
          </h3>

          <h6>Free cancellation period for host</h6>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">TRIP DURATION</th>
                <th scope="col">FREE CANCELLATION PERIOD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>All trip durations</td>
                <td>Before Confirming Trip</td>
              </tr>
              {/* <tr>
                <td>More than 24hrs</td>
                <td>24hrs before trip start</td>
              </tr> */}
            </tbody>
          </table>
          <h6>Guest trips canceled by host and host no-shows</h6>
          <p>
            If a host doesn’t show up for the trip after 1 hour of the scheduled
            start time, it’s a host no-show. If the host cancels a trip after
            the free cancellation period above or fails to show up for the
            trip,he is charged a ksh. 300 fee. Funds from the canceled or
            no-show trip will be available instantly after the cancellation for
            the quest to be used to rebook a trip. Guests who don’t want to
            rebook can follow the instructions in the cancellation email to
            initiate their refund.
          </p>
          <br />
          <h6>Trips canceled by Caradil</h6>
          <p>
            In some cases, Caradil’s trust and safety team will cancel a guest’s
            booked trip. If that were to happen, Caradil will contact the guest
            and host, and the guest will receive a full refund.
          </p>
          <br />
          <h3>Guest trips impacted by flight delays, flight cancellations</h3>
          <h6>Flight delays or flight cancellations</h6>
          <p>
            If a guest’s flight is delayed or canceled, they must message their
            host to tell them and to request a trip modification for a new start
            time. If the host cannot or does not accommodate a new start time
            and the trip must be canceled, Caradil will issue the guest a full
            refund if they've messaged their host and provided documentation.
            Specifically, guests must notify the host of the flight delay or
            cancellation at least one hour before the scheduled trip start time.
            They must provide documentation, such as a screenshot from the
            airline mobile app or website, that shows the flight issue.
          </p>
        </div>
      </Layout>
    </>
  );
};

export default CancellationAndRefund;
