export type Service = {
  id: string;
  title: string;
  description: string;
  value: number;
  serviceTypeId: number;
  serviceClass: string;
  validTo: Date;
  validFrom: Date;
  createdAt: Date;
  updatedAt: Date;
  providerId: Date;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    userType: string;
    phoneConfirmed: true;
    emailConfirmed: false;
    emailVerified: null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  serviceType: {
    id: number;
    name: string;
    description: string;
  };
};
