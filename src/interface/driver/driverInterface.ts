export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
}

export interface DriverData {
  aadhar: {
    aadharId: string;
    aadharImage: string;
  };
  licence: {
    licenceId: string;
    licenceImage: string;
  };
  vehicleDocuments: {
    registration: {
      registrationId: string;
      registrationImage: string;
    };
    vehicleImage1: string;
    vehicleImage2: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  isBlocked: boolean;
  isAvailable: boolean;
  isRiding: boolean;
  driverVerified: boolean;
  joinedAt: string;
  __v: number;
  cabModel: {
    cabType:string
  };
}
