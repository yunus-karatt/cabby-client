import CabbyNav from "../../components/auth/CabbyNav";
import AuthFooter from "../../components/auth/AuthFooter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { useDispatch } from "react-redux";
import { setDriverCredentials } from "../../services/redux/slices/driverAuthSlice";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const number = location.state;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: number,
    cityData: {
      placeName: "",
      latitude: number,
      longitude: number,
    },
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });
  // const [city, setCity] = useState<string>("");
  const [citySuggestion, setCitySuggestion] = useState<
    {
      placeName: string;
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const [cityData, setCityData] = useState<{
    placeName: string;
    latitude: number;
    longitude: number;
  }>({
    placeName: "",
    latitude: 0,
    longitude: 0,
  });
  const [showCitySuggestion, setShowCitySuggestion] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: "",
      };
    });
  };

  const handleCity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCitySuggestion(true);
    setCityData((prev) => ({ ...prev, placeName: e.target.value }));
  };

  const onCityAddressClick = (
    placeName: string,
    latitude: number,
    longitude: number
  ) => {
    console.log("here");
    setCitySuggestion([]);
    setShowCitySuggestion(false);
    setCityData(() => ({ placeName, latitude, longitude }));
  };

  const handleSubmit = async () => {
    const validationErrors = {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    };
    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }
    if (!cityData.placeName.trim()) {
      validationErrors.firstName = "city is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }

    if (
      validationErrors.firstName ||
      validationErrors.lastName ||
      validationErrors.email
    ) {
      setErrors(validationErrors);
      return;
    }
    try {
      setFormData((prev) => ({ ...prev, cityData }));
      const driver = await driverAxios.post(driverApi.register, formData);
      dispatch(setDriverCredentials(driver.data));
      // const { token } = driver.data;
      // localStorage.setItem("driverToken", token);
      navigate("/driver/vehicle-registration");
    } catch (error) {
      console.log(error);
    }
  };

  const getAddressList = async () => {
    try {
      if (cityData.placeName) {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityData.placeName}.json`,
          {
            params: {
              access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
              country: "in",
            },
          }
        );
        setCitySuggestion(() => {
          return res.data.features.map((data: any) => {
            return {
              placeName: data.place_name,
              latitude: data.geometry.coordinates[1],
              longitude: data.geometry.coordinates[0],
            };
          });
        });
      } else {
        console.log("no sourceL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const delay = setTimeout(() => {
    if (showCitySuggestion) getAddressList();
    // }, 1000);
    // return () => clearTimeout(delay);
  }, [cityData]);

  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        <div className="min-h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col items-center justify-center">
          <div className="w-full mt-4">
            <label htmlFor="firstName">First Name</label>
            <input
              value={formData.firstName}
              onChange={handleChange}
              id="firstName"
              name="firstName"
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${
                errors.firstName && "border border-danger"
              }`}
              type="text"
              placeholder="Enter Your First Name"
            />
            <p className="text-danger">{errors.firstName}</p>
            <label htmlFor="lastName">Last Name</label>

            <input
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              id="lastName"
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${
                errors.lastName && "border border-danger"
              }`}
              type="text"
              placeholder="Enter Last Name"
            />
            <p className="text-danger">{errors.lastName}</p>
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="email"
              className={`p-3 w-full rounded-lg border-2 border-black my-2 ${
                errors.email && "border border-danger"
              }`}
              type="email"
              placeholder="Enter Your Email"
            />
            <p className="text-danger">{errors.email}</p>
            <div className="relative">
              <label htmlFor="city">City</label>
              <input
              autoComplete="off"
                value={cityData?.placeName}
                onChange={(e) => handleCity(e)}
                name="city"
                id="city"
                className={`p-3 w-full rounded-lg border-2 border-black my-2 ${
                  errors.city && "border border-danger"
                }`}
                type="text"
                placeholder="Enter Your city"
              />
              <p className="text-danger">{errors.city}</p>
              {citySuggestion.length > 0 && showCitySuggestion && (
                <div className="z-50 absolute bg-white border border-secondary py-4 rounded-md border-t-0 flex flex-col gap-y-2">
                  {citySuggestion.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-white hover:bg-secondary rounded-md cursor-pointer px-3"
                      >
                        <h1
                          onClick={() =>
                            onCityAddressClick(
                              data.placeName,
                              data.latitude,
                              data.longitude
                            )
                          }
                          className=""
                        >
                          {data.placeName}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white rounded-lg mt-6 p-3"
            >
              Continue
            </button>
          </div>
          <hr className="w-full border-black my-6" />
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default Signup;
