import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    // author:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: [true, 'The feedback must contain an author']
    //    },
    title:{
        type:String,
        required:[true, 'The task must have a title']
    },
    description:{
        type:String,
        default: "descreption"
    }, 
    deadlineDate:{
        type:Date,
        default: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split("T")[0]
    }, 
    taskUrgency:{
        type:String,
        enum:{
            values:[`Low`, `High`, `Critical`],
            message:'Urgency must be either `Low`, `High`, `Critical`'
        },
        default: `free`
    },
    isCompleted:{
        type:Boolean,
        default: false
    }
},
{timestamps:true})
// taskSchema.pre(/^find/, function (next) {
//     this.populate({
//       path: "author",
//       select: "name",
//     });
//     next();
//   });
//query middleware - this refers to query

const Task = mongoose.model("Task", taskSchema)

export default Task