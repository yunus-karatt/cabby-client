import { CabInteface } from "../common/common";
import { DriverData } from "../driver/driverInterface";

export interface Admin {
  _id: string;
  name: string;
  mobile: string;
}

export interface PriceModelPopupProps {
  preview: string | ArrayBuffer | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setNewCab: React.Dispatch<React.SetStateAction<CabInteface | null>>;
  // cabType: string;
}
export interface RequestPopupProps {
  driver: DriverData;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setRequest:React.Dispatch<React.SetStateAction<DriverData []>>;
}
