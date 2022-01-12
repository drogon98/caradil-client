import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import {
  useAddCarMakeMutation,
  useUploadFileMutation,
} from "../../graphql_types/generated/graphql";

interface CarMakesProps {}

/**
 * @author @CodeYourEmpire
 * @function @CarMakes
 **/

const CarMakes: FC<CarMakesProps> = (props) => {
  const [values, setValues] = useState<any>({ title: "", photo: {} });
  const [uploadFile] = useUploadFileMutation();
  const [addMake, { loading }] = useAddCarMakeMutation();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const response = await uploadFile({ variables: { file } });
    const newPhoto = response.data?.singleUpload;
    delete newPhoto?.__typename;
    setValues({ ...values, photo: newPhoto });
    // e.target.value = "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, title: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addMake({ variables: { input: values } });
    console.log("response :>> ", response);
  };

  return (
    <AdminLayout>
      <h3>Add Car</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" required onChange={handleUpload} />
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            value={values.title}
            id="title"
            type="text"
            name="title"
            className="form-control"
            required
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn bgOrange">
            Add Make
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CarMakes;
