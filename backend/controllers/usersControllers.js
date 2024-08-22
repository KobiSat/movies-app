import User from './../models/userModel.js'
import factory from './factoryHandlers.js'
import asyncHandler from 'express-async-handler'
import AppError from './../utils/AppError.js'
import { generateToken } from '../middleware/generateToken.js'

export const getUsers = factory.getAll(User)

export const getUserById = factory.getOne(User)

export const registerUser = asyncHandler(async(req, res, next) => {
    const {name, email, password, confirmPassword} = req.body
    if(!name || !email || !password || !confirmPassword) return next(new AppError(403, 'Missing details'))
    const user = await User.create({name, email, password, confirmPassword})
    const token = generateToken(user._id)
    res.cookie('jwt',token, {
        httpOnly: true,
        sameSite:'none',
        secure: true
    } )
    res.status(201).json({
        status:"success",
        name: user.name
    })
})
export default {getUsers, getUserById, registerUser}