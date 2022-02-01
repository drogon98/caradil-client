import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  Car,
  // useEditCarVerifiedMutation,
  // VerifyCarInput,
} from "../../../graphql_types/generated/graphql";
import { ButtonLoading } from "../../Loading/ButtonLoading";

interface Props {
  show: boolean;
  handleClose: () => void;
  car: Car;
}

export default function VerifyModal(props: Props): ReactElement {
  // const [activeSlide, setActiveSlide] = useState(1);
  // // const [values, setValues] = useState<VerifyCarInput>();
  // // const [editVerified, { loading }] = useEditCarVerifiedMutation();

  // const handlePrev = () => {
  //   setActiveSlide(activeSlide - 1);
  // };

  // const handleNext = () => {
  //   setActiveSlide(activeSlide + 1);
  // };

  // const handleChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   console.log("e.target.value :>> ", e.target.value);
  //   if (e.target.name === "verification_passed") {
  //     setValues({
  //       ...values!,
  //       [e.target.name]: e.target.value === "true" ? true : false,
  //     });
  //   } else {
  //     setValues({ ...values!, [e.target.name]: e.target.value });
  //   }
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   let payload: VerifyCarInput = {
  //     ...values!,
  //     rejection_reason: values?.rejection_reason ? values.rejection_reason : "",
  //   };

  //   try {
  //     let response = await editVerified({
  //       variables: {
  //         carId: props.car.id!,
  //         input: {
  //           ...payload,
  //         },
  //       },
  //     });
  //     if (response.data?.editCarVerified) {
  //       props.handleClose();
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  return (
    <>
      {/* // <Modal
    //   show={props.show}
    //   //  fullscreen={true}
    //   size="xl"
    //   onHide={props.handleClose}
    //   aria-labelledby="example-custom-modal-styling-title"
    // >
    //   <Modal.Header closeButton>
    //     <Modal.Title>Verify Car</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <div className="verify-modal-content">
    //       <div className="verify-modal-content-wrapper">
    //         {activeSlide === 1 && (
    //           <div>
    //             <h3>General Info</h3>

    //             <p>Name:{props.car.name}</p>
    //             <p>Registration No.:{props.car.reg_no}</p>
    //             <p>Make:{}</p>
    //             <p>Odometer Reading:{props.car.odometer_reading}</p>
    //             <p>
    //               Is GPS enabled:{props.car.is_gps_enabled ? "true" : "false"}
    //             </p>
    //           </div>
    //         )}
    //         {activeSlide === 2 && (
    //           <div>
    //             <h3>Features</h3>
    //             <p>Doors:{props.car.doors}</p>
    //             <p>Gas:{props.car.gas}</p>
    //             <p>Transmission:{props.car.transmission}</p>
    //             <p>Seats:{props.car.seats}</p>
    //             <p>color:{props.car.color}</p>
    //           </div>
    //         )}
    //         {activeSlide === 3 && (
    //           <div className="h-100">
    //             <h3 className="photos-verify-heading">Photos</h3>
    //             <div className="verify-photos-wrapper py-3">
    //               {props.car.photos?.map((photo) => (
    //                 <a
    //                   key={photo.public_id}
    //                   href={photo.secure_url!}
    //                   target="_blank"
    //                 >
    //                   <img
    //                     width="100%"
    //                     height="300px"
    //                     src="/images/lambo.jpg"
    //                   />
    //                 </a>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //         {activeSlide === 4 && (
    //           <div>
    //             <h3>Documents</h3>

    //             <div>
    //               {props.car.documents?.map((doc) => (
    //                 <div key={doc.title} className="mb-4">
    //                   <h6 className="m-0">
    //                     {doc.title === "national_id"
    //                       ? "National ID"
    //                       : "LogBook"}
    //                   </h6>
    //                   <a
    //                     href={doc.file?.secure_url!}
    //                     target={"_blank"}
    //                     className="colorOrange"
    //                   >
    //                     <small>
    //                       {doc.file?.secure_url}
    //                       <span>
    //                         <BsBoxArrowUpRight />
    //                       </span>
    //                     </small>
    //                   </a>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //         {activeSlide === 5 && (
    //           <div>
    //             <h3>Results</h3>

    //             <form onSubmit={handleSubmit}>
    //               <div className="mb-3s">
    //                 <div className="form-check">
    //                   <input
    //                     className="form-check-input"
    //                     type="radio"
    //                     name="verification_passed"
    //                     id="verify-results-1"
    //                     onChange={handleChange}
    //                     value={"false"}
    //                     checked={values?.verification_passed === false}
    //                     required
    //                   />
    //                   <label
    //                     className="form-check-label"
    //                     htmlFor="verify-results-1"
    //                   >
    //                     Verification Failed
    //                   </label>
    //                 </div>
    //                 {values?.verification_passed === false && (
    //                   <div>
    //                     <label>Reason why verification failed</label>
    //                     <textarea
    //                       className="form-control"
    //                       onChange={handleChange}
    //                       value={values?.rejection_reason}
    //                       required
    //                     />
    //                   </div>
    //                 )}
    //               </div>
    //               <div>
    //                 <div className="form-check">
    //                   <input
    //                     className="form-check-input"
    //                     type="radio"
    //                     name="verification_passed"
    //                     id="verify-results-2"
    //                     onChange={handleChange}
    //                     checked={values?.verification_passed === true}
    //                     value={"true"}
    //                     required
    //                   />
    //                   <label
    //                     className="form-check-label"
    //                     htmlFor="verify-results-2"
    //                   >
    //                     Verification Passed
    //                   </label>
    //                 </div>
    //               </div>
    //               {(values?.verification_passed === true ||
    //                 values?.verification_passed === false) && (
    //                 <div className="mt-4">
    //                   <button className="btn bgOrange" type="submit">
    //                     {loading ? (
    //                       <ButtonLoading
    //                         spinnerColor="white"
    //                         dimensions={{ height: "24px", width: "24px" }}
    //                       />
    //                     ) : (
    //                       "Submit"
    //                     )}
    //                   </button>
    //                 </div>
    //               )}
    //             </form>
    //           </div>
    //         )}
    //       </div>
    //       <div className="verify-modal-arrows">
    //         <div>
    //           {activeSlide !== 1 && (
    //             <button className="btn py-0" onClick={handlePrev}>
    //               <MdKeyboardArrowLeft size={"25px"} />
    //             </button>
    //           )}
    //         </div>
    //         <div>
    //           {activeSlide !== 5 && (
    //             <button className="btn py-0" onClick={handleNext}>
    //               <MdKeyboardArrowRight size={"25px"} />
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </Modal.Body>
    // </Modal> */}
    </>
  );
}
