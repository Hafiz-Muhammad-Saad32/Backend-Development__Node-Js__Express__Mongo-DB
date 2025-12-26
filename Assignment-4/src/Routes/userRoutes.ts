import router from "express";
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById} from "../Controllers/users";

const route = router();

route.post("/create", createUser);
route.get("/getAll", getAllUsers);
route.get("/getById/:id", getUserById);
route.patch("/update/:id", updateUserById);
route.delete("/delete/:id", deleteUserById);

export default route;