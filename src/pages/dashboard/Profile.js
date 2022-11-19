import { useState } from "react";
import { FormRow, Alert } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import usePartners from "../../utils/hooks/usePartners";
import { updateUserDetails } from "../../store/actions/authActions";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    country: user?.address?.country,
    city: user?.address?.city,
    street: user?.address?.street,
    partner: user?.partner?.id,
  });

  const { institutions, loading } = usePartners();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !values.firstName ||
      !values.phone ||
      !values.lastName ||
      !values.country ||
      !values.city ||
      !values.street ||
      !values.partner
    ) {
      setError("Please fill all fields!");
      return;
    }
    const { firstName, lastName, phone, country, city, street, partner } =
      values;
    const userObj = {
      firstName,
      lastName,
      phone,
      partner,
      address: {
        country,
        city,
        street,
      },
    };
    try {
      setIsLoading(true);
      await dispatch(updateUserDetails(userObj, user?.id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>profile</h3>
        {error && <Alert alertType="danger" alertText={error} />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="first name"
            name="firstName"
            value={values.firstName}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="phone"
            name="phone"
            value={values.phone}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="country"
            value={values.country}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="city"
            value={values.city}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="street"
            value={values.street}
            handleChange={handleChange}
          />
          <div className="form-row">
            <label htmlFor="partner" className="form-label">
              Institution
            </label>
            <select
              name="partner"
              onChange={handleChange}
              value={values.partner}
              className="form-select"
            >
              <option value="">--select--</option>
              {loading
                ? "Loading Institutions"
                : institutions?.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue.id}>
                        {itemValue.name}
                      </option>
                    );
                  })}
            </select>
          </div>

          <FormRow
            type="email"
            name="email"
            value={user?.email}
            disabled={true}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
