export type Service = {
  id: string;
  title: string;
  description: string;
  value: number;
  serviceClass: string;
  validTo: Date;
  validFrom: Date;
  createdAt: Date;
  providerId: {
    id: string;
    name: string;
    email: string;
    phone: string;
    userType: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  serviceTypeId: {
    id: number;
    name: string;
    description: string;
  };
};
