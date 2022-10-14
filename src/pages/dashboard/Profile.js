import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);
  const [country, setCountry] = useState(user?.address.country);
  const [city, setCity] = useState(user?.address.city);
  const [street, setStreet] = useState(user?.address.street);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !phone || !lastName || !country || !city || !street) {
      displayAlert();
      return;
    }

    updateUser({ firstName, lastName, phone, country, city, street });
  };

  console.log(user);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow
            type='text'
            labelText='first name'
            name='firstName'
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='phone'
            name='phone'
            value={phone}
            handleChange={(e) => setPhone(e.target.value)}
          />
          <FormRow
            type='text'
            name='country'
            value={country}
            handleChange={(e) => setCountry(e.target.value)}
          />
          <FormRow
            type='text'
            name='city'
            value={city}
            handleChange={(e) => setCity(e.target.value)}
          />
          <FormRow
            type='text'
            name='street'
            value={street}
            handleChange={(e) => setStreet(e.target.value)}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
