import { User } from "../models/userSchma.js";

export class UsersListsController {
    findLists = async (req, res) => {
        const result = await User.find();

        res.send(result);
    };
}
