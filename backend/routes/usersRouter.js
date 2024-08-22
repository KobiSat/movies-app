import {Router} from 'express'
import usersControllers from './../controllers/usersControllers.js'

const router = Router()

router.route("/")
.get(usersControllers.getUsers)

router.post("/register", usersControllers.registerUser)


export default router