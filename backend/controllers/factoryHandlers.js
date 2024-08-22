//FACTORY FUNCTION - gets Model and returns a function to delete one from params
import asyncHandler from "express-async-handler"
import APImethods from "../utils/APImethods.js"
import AppError from "../utils/AppError.js"

const getAll = (Model) =>
    asyncHandler(async (req, res, next)=>{
        let filter = {}
        if(req.params.tasktId) filter={task: req.params.taskId}
        
        const apimethods = new APImethods(Model.find(filter),req.query)
        apimethods.filter().sort().selectFields().makePagination()
        
        const documents = await apimethods.query
    
        res.status(200).json({
            status: "success",
            documents
        })
    })

    const getOne = (Model)=>
    asyncHandler(async(req, res, next)=>{
        if(!req.params.id) return next(new AppError(400, "Missing Details"))
        const document = await Model.findById(req.params.id)
        if(!document) return next(new AppError(400, "the requested document was not found"))
            res.status(201).json({
                status: "success",
                document
            })
        })
const createOne = (Model)=>
    asyncHandler(async (req, res, next) => {
        //1 save document into DB and get ID
        const document = await Model.create(req.body)        
        res.status(201).json({
            status: "success",
            document
        }) 
      })
const deleteOne = (Model) =>
    asyncHandler(async(req, res, next) =>{
      const deletedDoc = await Model.findByIdAndDelete(req.params.id)
      if(!deletedDoc) return next(new AppError(400, "the requested document was not found"))
      res.status(204).json({
        status: "success",
        document: null
      })
    })

const editOne = (Model) =>
    asyncHandler(async(req, res, next) =>{
        const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!updatedDoc) return next(new AppError(400, "the requested document was not found"))
        res.status(201).json({
            status: "success",
            document: updatedDoc
        })
    })
export default {getAll, getOne, createOne, deleteOne, editOne}