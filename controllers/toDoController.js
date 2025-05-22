const ToDo = require("../models/ToDoList");

exports.createToDo = async (req, res) => {
    try {
        const data = req.body
        const todo = new ToDo(data)
        const result = await todo.save()
        console.log(result)
        res.status(201).send({message: "Created New Task !"})
    }
    catch(error) {
       console.log(error)
       res.send(error) 
    }
}

exports.getAllToDo = async (req, res) => {
    let {userId} = req.params 
    try {
        const result = await ToDo.find({createdBy: userId})
        res.send(result)


    }catch(error) {
        console.log(error)
        res.status(400).send(error)
    }

}

exports.updateToDo = async (req, res) => {
    try {
        const {id} = req.params 
        const data = req.body 
        const result = await ToDo.findByIdAndUpdate(id, {$set: data}, { new: true })
         if (!result) {
            return res.status(404).send({ message: "ToDo not found" }); 
        }
        console.log("Update result:", result);
        res.send({message: "ToDo Updated"})
    }catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
}

exports.deleteToDo = async (req, res) => {
    try {
        const {id} = req.params 
        const result = await ToDo.findByIdAndDelete(id)
       
        if (!result) {
            return res.status(404).send({ message: "ToDo not found" }); 
             }
              console.log(result)
            res.send({ message: "ToDo deleted successfully" });
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
}
