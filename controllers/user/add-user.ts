import  UserModel  from "../../models/user";
export const addUser = async function (req: any, res : any) {
   const { name,email,avatar,userId  }  = req.body;
  try {
    await UserModel.create({
    name,
    email,
    avatar,
    userId
  });
    res.status(201).send('user created successfully');
  } catch (error) {
   res.status(400);
    return error
  }
};
