import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';

const catchAsync = (controller: RequestHandler) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         await controller(req, res, next);
      } catch (error) {
         next(error);
      }
   };
};

const createUser = catchAsync(async (req: Request, res: Response) => {
   const result = await userService.createUserIntoDB(req.body);
   res.json({
      success: true,
      message: 'user created successfully',
      data: result,
   });
});

const getUsers = catchAsync(
   async (req: Request, res: Response, next: NextFunction) => {
      const result = await userService.getUsersFromDB(req.query);
      res.json({
         success: true,
         message: 'user fetched successfully',
         data: result,
      });
   }
);

const getSIngleUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;
   const result = await userService.getSingleUserFroDB(userId);
   res.json({
      success: true,
      message: 'user fetched successfully',
      data: result,
   });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;

   const result = await userService.updateUserIntoDB(userId, req.body);
   res.json({
      success: true,
      message: 'user updated successfully',
      data: result,
   });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
   const { userId } = req.params;

   const result = await userService.deleteFromDB(userId);
   res.json({
      success: true,
      message: 'user deleted successfully',
      data: result,
   });
});

export const userController = {
   createUser,
   getUsers,
   getSIngleUser,
   updateUser,
   deleteUser,
};
