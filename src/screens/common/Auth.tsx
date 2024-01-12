import CabbyNav from "../../components/user/CabbyNav";
import google from "../../assets/Icon google.svg";

const Auth = () => {
  return (
    <>
      <CabbyNav />
      <div className="bg-secondary h-lvh flex justify-center items-center">
        <div className="h-3/4 w-[360px] border-2 border-white rounded-lg p-4 mt-8  flex flex-col items-center justify-center">
          <p className="text-2xl font-normal">
            What's your phone number or email?
          </p>
          <div className="w-full mt-4">
            <input
              className="p-3 w-full rounded-lg border-2 border-black"
              type="text"
              placeholder="Enter Phone Number or Email"
            />
            <button className="w-full bg-primary text-white rounded-lg mt-6 p-3">
              Continue
            </button>
          </div>
          <hr className="w-full border-black my-6" />
          <button className="w-full bg-white rounded-lg p-3 flex items-center justify-center gap-6">
            <img src={google} alt="" /> Continue with Google
          </button>
          <p className="text-text-secondary text-xs my-6">
            By proceeding, you consent to get calls, WhatsApp or SMS messages,
            including by automated dialer, from Uber and its affiliates to the
            number provided. Text “STOP” to 89203 to opt out.
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;
