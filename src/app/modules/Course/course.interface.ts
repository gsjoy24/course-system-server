import { Types } from 'mongoose';

export type TCourse = {
  _id?: Types.ObjectId;
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [
    {
      name: string;
      isDeleted: boolean;
    },
  ];
  startDate: string;
  endDate: string;
  durationInWeeks?: number;
  language: string;
  provider: string;
  details: {
    level: string;
    description: string;
  };
};
