import google from "../../assets/Icon google.svg";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase/config";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../services/redux/slices/userAuthSlice";
import { driverAxios } from "../../constraints/axios/driverAxios";
import driverApi from "../../constraints/api/driverApi";
import { setDriverCredentials } from "../../services/redux/slices/driverAuthSlice";

const Oauth = ({ role }: { role: "User" | "Driver" | "Admin" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    const { user } = await signInWithPopup(auth, provider);
    try {
      if (role === "User") {
        const existingUser = await userAxios.post(userApi.isUserExistWithMail, {
          mail: user.email,
        });
        if (existingUser.data) {
          dispatch(setUserCredentials(existingUser.data));
          navigate("/");
        } else {
          const [firstName = "", lastName = ""] =
            user?.displayName?.split(" ") || [];
          const userInfo = {
            firstName,
            lastName,
            email: user.email,
          };

          const registerdUser = await userAxios.post(userApi.registerUser, {
            ...userInfo,
          });
          dispatch(setUserCredentials(registerdUser.data));
          navigate("/");
        }
      } else if (role === "Driver") {
        const existingDriver = await driverAxios.post(
          driverApi.isDriverExistWithMail,
          {
            mail: user.email,
          }
        );
        if (existingDriver.data) {
          dispatch(setDriverCredentials(existingDriver.data));
          navigate("/driver");
        } else {
          const [firstName = "", lastName = ""] =
            user?.displayName?.split(" ") || [];
          const userInfo = {
            firstName,
            lastName,
            email: user.email,
          };

          const registerdUser = await driverAxios.post(driverApi.register, {
            ...userInfo,
          });
          dispatch(setUserCredentials(registerdUser.data));
          navigate("/driver/vehicle-registration");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-white rounded-lg p-3 flex items-center justify-center gap-6"
    >
      <img src={google} alt="" /> Continue with Google
    </button>
  );
};

export default Oauth;
