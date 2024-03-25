import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

const createUserIntoDB = async (userData: any) => {
   const { user, password } = userData;
   const result = await prisma.user.create({
      data: { ...user, password },
   });

   return result;
};

const getUsersFromDB = async (queryParams: any) => {
   const {
      q,
      limit = 2,
      page = 1,
      sortBy,
      sortOrder,
      ...otherQueryParams
   } = queryParams;
   console.log(otherQueryParams);
   const conditions = [];

   if (q) {
      conditions.push({
         OR: ['username', 'email'].map((field) => ({
            [field]: {
               contains: q,
               mode: 'insensitive',
            },
         })),
      });
   }

   if (Object.keys(otherQueryParams).length > 0) {
      const filterData = Object.keys(otherQueryParams).map((key) => ({
         [key]: otherQueryParams[key],
      }));

      conditions.push(...filterData);
   }

   console.dir(conditions, { depth: Infinity });

   const result = await prisma.user.findMany({
      where: { AND: conditions },
      skip: (Number(page) - 1) * limit,
      take: Number(limit),
      orderBy: {
         [sortBy]: sortOrder,
      },
   });
   return result;
};

const getSingleUserFroDB = async (userId: string) => {
   return await prisma.user.findUniqueOrThrow({
      where: {
         id: userId,
      },
   });
};

const updateUserIntoDB = async (userId: string, updatedData: Partial<User>) => {
   return await prisma.user.update({
      where: {
         id: userId,
      },
      data: updatedData,
   });
};

const deleteFromDB = async (userId: string) => {
   return await prisma.user.delete({
      where: {
         id: userId,
      },
   });
};

export const userService = {
   createUserIntoDB,
   getUsersFromDB,
   getSingleUserFroDB,
   updateUserIntoDB,
   deleteFromDB,
};
