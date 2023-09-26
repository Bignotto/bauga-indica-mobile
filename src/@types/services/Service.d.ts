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
  providerId: string;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    userType: string;
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
