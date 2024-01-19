import { CabInteface } from "../common/common";

export interface Admin {
  _id: string;
  name: string;

  mobile: string;
}

export interface PriceModelPopupProps {
  preview: string | ArrayBuffer | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setNewCab:React.Dispatch<React.SetStateAction<CabInteface | null>>
  // cabType: string;
}
