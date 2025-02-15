require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dburi = process.env.MONGO_URI || "mongodb+srv://prasannasimha5002:spk@cluster0.6476o.mongodb.net/";
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error:", err));
  
  const TaskSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Ensure email is stored with the task
    task: { type: String, required: true },
    desc: { type: String, default: "" },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
const Task = mongoose.model("Task", TaskSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});

const User = mongoose.model("User", UserSchema);

// Route to store user data
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }
    res.status(200).json({ message: "User saved successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error saving user" });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const tasks = await Task.find({ email }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/addTask", async (req, res) => {
  try {
    const { email, task, desc } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const newTask = new Task({ email, task, desc });
    await newTask.save();
    res.json({ message: "Task Added Successfully!", newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.put("/updatestatus/:id", async (req, res) => {
  try {
    const { status } = req.body; // Get status from request body
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task Updated!", updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/updateTask/:id", async (req, res) => {
  try {
    const { task, desc, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task, desc, status, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: "Task Updated!", updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Task
app.delete("/deleteTask/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
