export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  cabModel: string;
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
    cabType: string;
  }[];
}

export interface RideData {
  status: string;
  _id: string;
  userId: string;
  sourceCoordinates: {
    latitude: number;
    longitude: number;
  };
  destinationCoordinates: {
    latitude: number;
    longitude: number;
  };
  sourceLocation: string;
  destinationLocation: string;
  distance: number;
  price: number;
  feedback?: string;
  rating?: number;
  duration: number;
  date:Date,
  driverId?:string
}
