import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import { UserModel } from "../models/user.model.js";
import { TabModel } from "../models/tab.model.js";
import { CommentModel } from "../models/comment.model.js";

const followRouter = express.Router();

followRouter.put(
  "/add/:idUserToFollow",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      //user que tá sendo seguindo -> precisamos de att quem segue ele
      //user que seguindo (nós) -> precisamos de add o user do cara que ele tá seguindo na nossa array
      let user = req.currentUser;
      let userToFollow = UserModel.findById(req.params.idUserToFollow);

      //abaixo pegando o user que estamos seguindo e colocando a gente na lista de seguidores dele
      userToFollow = await UserModel.findByIdAndUpdate(
        { _id: req.params.idUserToFollow },
        { $push: { follower: user._id } },
        { new: true, runValidators: true }
      );
      user = await UserModel.findByIdAndUpdate(
        { _id: user._id },
        { $push: { following: userToFollow._id } },
        { new: true, runValidators: true }
      );
      return res.status(200).json(userToFollow);

      return res.status(200).json("ce n pode seguir 2 veis não");
    } catch (err) {
      console.log(err);
      return res.status(500).json("Deu erro no follow, irmão");
    }
  }
);

export { followRouter };
