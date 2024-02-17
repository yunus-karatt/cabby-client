import { XCircle } from "lucide-react";
import { RequestPopupProps } from "../../interface/admin/adminInterface";
import ViewImage from "./ViewImage";
import { useState } from "react";
import adminApi from "../../constraints/api/adminApi";
import { adminAxios } from "../../constraints/axios/adminAxios";
import Swal from "sweetalert2";
import Spinner from "../common/Spinner";

const RequestPopup = ({ driver, setPopup,setRequest }: RequestPopupProps) => {
  const [src, setSrc] = useState<{src:string,text:string} | null>(null);
  const [loading,setLoading]=useState<boolean>(true)

  const verifyDriver=async()=>{
    try {
      await adminAxios.put(`${adminApi.verifyDriver}/${driver._id}`)
      setRequest((prev)=>{
        return(
          prev?.filter(req=>req._id!==driver._id)
        )
      })
      setPopup(false)
    } catch (error) {
      console.log(error)
    }
  }


  const handleLoad=()=>{
    setLoading(false)
  }

  const rejectDriver=async()=>{
    try {
      Swal.fire({
        title: "Reason for rejection",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (reason) => {
          try {
            // const githubUrl = `
            //   https://api.github.com/users/${login}
            // `;
            // const response = await fetch(githubUrl);
      await adminAxios.post(adminApi.rejectDriver,{id:driver._id,reason})

            // if (!response.ok) {
            //   return Swal.showValidationMessage(`
            //     ${JSON.stringify(await response.json())}
            //   `);
            // }
            // return response.json();
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(()=>{
        setRequest((prev)=>{
          return(
            prev?.filter(req=>req._id!==driver._id)
          )
        })
        setPopup(false)

      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={`bg-white min-w-[460px] border  min-h-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-md overflow-auto no-scrollbar ${src && "flex flex-col gap-y-3 justify-center items-center w-auto h-auto"}`}>
        {src ? (
          <>
          <XCircle
                onClick={() => setSrc(null)}
                className="text-primary cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm absolute top-16"
              />
              <p className="font-bold text-2xl">{src.text}</p>
          <ViewImage src={src.src}/>
          </>
        ) : (
          <>
            <div className="flex justify-between p-3">
              <p>Driver Details</p>
              <XCircle
                onClick={() => setPopup(false)}
                className="text-primary cursor-pointer hover:bg-primary hover:text-white hover:rounded-sm"
              />
            </div>
            <hr />
            <div className="flex justify-center w-full mt-5"></div>
            <div className="flex flex-col p-3 ms-10 gap-y-2 w-[82%]">
              <p className="font-bold text-xl">Driver Details</p>
              <div className="flex flex-wrap  gap-3 justify-start">
                <div className="w-1/3">
                  <p className="text-text-secondary opacity-50">Name</p>
                  <p className="font-bold">{driver.firstName}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-text-secondary opacity-50">Email</p>
                  <p className="font-bold">{driver.email}</p>
                </div>
                <div>
                  <p className="text-text-secondary opacity-50">Mobile</p>
                  <p className="font-bold">{driver.mobile}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-text-secondary opacity-50">Aadhar No.</p>
                  <p className="font-bold">{driver.aadhar.aadharId}</p>
                </div>
                <div className="w-1/3">
                  <p className="text-text-secondary opacity-50">License No.</p>
                  <p className="font-bold">{driver.licence.licenceId}</p>
                </div>
                <div>
                  <p className="text-text-secondary opacity-50">Vehicle No.</p>
                  <p className="font-bold">
                    {driver.vehicleDocuments.registration.registrationId}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex flex-col p-3 ms-10 gap-y-2 min-w-[82%] h-auto">
              <p className="font-bold text-xl text-center md:text-start">
                Documents
              </p>
              <div className="flex mt-3 justify-start flex-col md:flex-row items-center gap-x-3">
                <div className="h-[160px] w-[160px] object-contain flex flex-col gap-y-2 ">
                  {loading && <div className="text-center"><Spinner /></div>}
                  <img
                    onClick={()=>setSrc({src:driver.vehicleDocuments.registration.registrationImage,text:"RC"})}
                    className="cursor-pointer"
                    src={driver.vehicleDocuments.registration.registrationImage}
                    alt="vehicle registration"
                  />
                  <p className="font-semibold text-center">Registration</p>
                </div>
                <div className="h-[160px] w-[160px] object-contain flex flex-col gap-y-2 ">
                {loading && <Spinner />}
                  <img
                  onClick={()=>setSrc({src:driver.licence.licenceImage,text:"License"})}
                    className="cursor-pointer"
                    src={driver.licence.licenceImage}
                    alt="vehicle registration"
                  />
                  <p className="font-semibold text-center">License</p>
                </div>
                <div className="h-[160px] w-[160px] object-contain flex flex-col gap-y-2 ">
                {loading && <Spinner />}
                  <img
                  onLoad={handleLoad}
                  onClick={()=>setSrc({src:driver.aadhar.aadharImage,text:"Aadhar"})}

                    className="cursor-pointer"
                    src={driver.aadhar.aadharImage}
                    alt="vehicle registration"
                  />
                  <p className="font-semibold text-center">Aadhar</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-x-5 mt-8">
              <button onClick={rejectDriver} className="w-[180px] py-2 px-6 rounded-lg border border-primary text-primary">
                Decline
              </button>
              <button onClick={verifyDriver} className="w-[180px] py-2 px-6 rounded-lg bg-primary text-white">
                Accept
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RequestPopup;
