const express = require('express');
const { status } = require('express/lib/response');
const router = express.Router();

const Task = require('../models/tasks');

router.get('/', async (req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res)=>{
    const task =await Task.findById(req.params.id);
    res.json(task);
})

//ADD
router.post('/', async(req, res)=>{
    const { title, description } = req.body;
    const task = new Task({
        title:title,
        description:description
    });
    await task.save();
    res.json({status: 'received task'});
});

//UPDATE
router.put('/:id', async (req, res)=>{
    const { title, description } = req.body;
    const newTask ={ title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);
    console.log(newTask);
    res.json({status: 'Task Update'});
});

//DELETE
router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({status:'Task Delete'});
});

module.exports = router;