const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({status: "success", message: tasks})

})

const createTasks =asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })

})

const getTasks =asyncWrapper( async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404 ))
    
    }
    
})

const updateTasks =asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new:true,
        runValidators:true,
    })
    res.status(200).json({task})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404 ))
     }
})

const deleteTasks =asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return next(createCustomError(`No task with id : ${taskID}`, 404 ))
      }
    res.status(200).send()
})

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks
}