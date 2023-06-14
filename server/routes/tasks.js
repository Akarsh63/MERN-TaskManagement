const express = require('express');
const router = express.Router();
const tasksmodel=require('../models/tasksmodel')

router.get('/', (req, res) => res.send('tasks route testing!'));
router.post('/enter',async (req,res)=>{
    const {title,description,timeanddate}=req.body;
    const task= await tasksmodel.findOne({title})
    if(!task){
        const dateObj = new Date(timeanddate);
        const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj
        .getFullYear()
        .toString()
        .slice(-2)}`;
        let formattedHours = dateObj.getHours();
        const amPm = formattedHours >= 12 ? "PM" : "AM";
        formattedHours = formattedHours % 12 || 12;
        const formattedTime = `${formattedHours}:${dateObj.getMinutes()} ${amPm}`;
        const formattedDateTime = `${formattedDate} ${formattedTime}`;

        const newtask= new tasksmodel({"title":title,"description":description,"timeanddate":formattedDateTime})
        await newtask.save();
        res.status(200).json({message:"New task created Successfully!"})
    }
    else{
        res.status(400).json({message:"A task already exists with that title!"})
    }
})

router.get('/alltasks',async (req,res)=>{
    try {
        const activetasks = await tasksmodel.find({ "status": "On progress" });
        const completedtasks = await tasksmodel.find({"status": "Completed"  });
        const alltasks = await tasksmodel.find({ });

        res.status(200).json({
          'alltasks': alltasks,
          'completedtasks': completedtasks,
          'activetasks': activetasks
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }

})
router.put('/delete', async (req, res) => {
    try {
        const { key} = req.body;
        const task = await tasksmodel.findByIdAndDelete(key);
        res.json(task);
          
    } catch (err) {
      res.status(500).json({ error:err });
    }
  });
  router.put('/update', async (req, res) => {
    try {
      const { taskid, val } = req.body;
      const task = await tasksmodel.findById(taskid);
      task.status = val; 
      await task.save(); 
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  
module.exports=router;