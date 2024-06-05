import  UserModel  from "../../models/user.js";
export const updateUser = async function (req:any, res:any) {
 const { name,email,avatar }  = req.body;
  try {
   let user = await UserModel.findByIdAndUpdate(req.params.userId, { name,email,avatar },{ new: true } );
    res.status(200).send(user);
  } catch (error) {
   res.status(400);
    return error
  }
};
