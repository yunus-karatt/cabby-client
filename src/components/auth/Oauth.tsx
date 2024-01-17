import google from "../../assets/Icon google.svg";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase/config";
import { userAxios } from "../../constraints/axios/userAxios";
import userApi from "../../constraints/api/userApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../services/redux/slices/userAuthSlice";


const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const existingUser = await userAxios.post(userApi.isUserExistWithMail, {
      mail: user.email,
    });
    if (existingUser.data) {
      dispatch(setCredentials(existingUser.data));
      navigate("/");
    } else {
      const [firstName = "", lastName = ""] =
        user?.displayName?.split(" ") || [];
      const userInfo={
        firstName,
        lastName,
        email:user.email
      }

      const registerdUser=await userAxios.post(userApi.registerUser,{...userInfo}) 
      console.log(registerdUser)
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
