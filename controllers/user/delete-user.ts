import  UserModel from "../../models/user";

export const deleteUser = async function (req:any, res:any) {
 try {
  let user = await UserModel.findById(req.params.userId);
  if (!user) {
    res.status(404).send({message: 'user with this id not found'}) ;
  }
  await user!.deleteOne();
    res.status(200).send({message: 'user deleted successfully'});
  } catch (error) {
   res.status(400);
    return error
  }
};
