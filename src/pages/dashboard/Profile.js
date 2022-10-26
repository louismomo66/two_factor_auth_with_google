import { useEffect, useState } from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import axios from "axios";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    
    handleChange,
    token,
  } = useAppContext();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phone, setPhone] = useState(user?.phone);
  const [country, setCountry] = useState(user?.address.country);
  const [city, setCity] = useState(user?.address.city);
  const [street, setStreet] = useState(user?.address.street);
  const [institutions, setInstitutions] = useState([]);
  const [partner, setPartner] = useState(user?.partner);

  useEffect(() => {
    axios
      .get("/api/v1/partners", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        return response.data;
      })
      .then((data) => {
        setInstitutions(data);
      })
      .catch((err) => console.log("error:", err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !phone || !lastName || !country || !city || !street || !partner) {
      displayAlert();
      return;
    }
    const UserObj = {
      firstName,
      lastName,
      phone,
      country,
      city,
      street,
      partner,
    };
    // console.log(`UpdateObjecUuser:`, UserObj);
    updateUser(UserObj);
  };

  // console.log(user);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

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
          {/* <FormRowSelect
            name='institution'
            value={institution}
            handleChange={handleInput}
            list={institutions}
          /> */}
          <select
            name='institution'
            onChange={(e) => setPartner(e.target.value)}
            value={partner}
            className='form-select'
          >
            <option value="">--select--</option>
            {institutions.map((itemValue, index) => {
              return (
                <option key={index} value={itemValue.id}>
                  {itemValue.name}
                </option>
              );
            })}
          </select>
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
