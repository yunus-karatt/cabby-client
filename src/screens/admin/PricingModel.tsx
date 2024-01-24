import { PlusCircle } from "lucide-react";
import Navbar from "../../components/admin/Navbar";
import SideBar from "../../components/admin/SideBar";
import { useEffect, useState } from "react";
import PriceModelPopup from "../../components/admin/PriceModelPopup";
import { CabInteface } from "../../interface/common/common";
import { adminAxios } from "../../constraints/axios/adminAxios";
import adminApi from "../../constraints/api/adminApi";
import Spinner from "../../components/common/Spinner";

const PricingModel = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [cab, setCab] = useState<CabInteface[]>([]);
  const [newCab, setNewCab] = useState<CabInteface | null>(null);
  const togglePopup = () => {
    setPopup((state) => !state);
  };
  const[imageLoader,setImageLoader]=useState(true)

  const handleLoader=()=>{
    setImageLoader(false)
  }
  useEffect(() => {
    const fetchCab = async () => {
      const response = await adminAxios.get(adminApi.cab);
      setCab(response.data);
    };
    fetchCab();
  }, [newCab]);

  return (
    <>
      <div className={` ${popup ? "blur-sm " : ""}`}>
        <Navbar />

        <div className={`flex`}>
          <SideBar />
          <div className="bg-hover w-full">
            <div className="p-5 flex justify-between">
              <h1 className="font-bold text-4xl">Pricing Model</h1>
              <button
                onClick={togglePopup}
                className="border border-primary rounded-lg py-2 px-3 flex gap-2 hover:bg-primary hover:text-white"
              >
                <PlusCircle /> Add New Cab
              </button>
            </div>
            <div className=" bg-white h-[100vh] mx-2 rounded-md">
              <div className="flex justify-end w-full">
              <div className="font-bold w-1/4 px-5 mt-52">
                  <p>BASE FARE</p>
                  <p className="mt-10">PRICE PER KM</p>
                </div>
                <div className="flex w-3/4 justify-evenly">
                  {cab.map((cab) => {
                    return (
                      <div key={cab._id} className="flex flex-col items-center ">
                        {imageLoader && <Spinner/> }
                        <img onLoad={handleLoader} src={cab.image} alt="" />
                        <p className="font-bold">{cab.cabType}</p>
                        <p className="text-text-secondary">{`(${cab.maxPersons} seater)`}</p>
                        <div className="mt-10 font-bold">
                          {cab.basePrice}
                        </div>
                        <div className="mt-10 font-bold">
                          {cab.pricePerKm}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
              </div>
              {/* <div className="px-5 flex font-bold w-full">
                <div className="w-1/4">
                  <p>BASE FARE</p>
                  <p>PRICE PER KM</p>
                </div>
                <div className="flex w-3/4 justify-evenly">
                  {cab.map((cab) => {
                    return (
                      <div className="flex flex-col items-center">
                        <div className="border">{cab.basePrice}</div>
                        <div>{cab.pricePerKm}</div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <PriceModelPopup
          preview={preview}
          setPopup={setPopup}
          setPreview={setPreview}
          setNewCab={setNewCab}
        />
      )}
    </>
  );
};

export default PricingModel;
