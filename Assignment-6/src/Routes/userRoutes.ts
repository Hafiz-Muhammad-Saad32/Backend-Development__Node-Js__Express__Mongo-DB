import router from "express";
import { registerUser, login, getAllUsers, getUserById, updateUserById, deleteUserById} from "../Controllers/users";
import { checkJWT } from "../Middlewares/check-JWT";
import {roleCheck} from "../Middlewares/role-check"

const route = router();

route.post("/auth/register", registerUser);
route.post("/auth/login", login);
route.get("/getAll",checkJWT, roleCheck, getAllUsers);
route.get("/getById/:id", checkJWT, roleCheck, getUserById);
route.patch("/update/:id", checkJWT, roleCheck, updateUserById);
route.delete("/delete/:id", checkJWT, roleCheck, deleteUserById);

export default route;