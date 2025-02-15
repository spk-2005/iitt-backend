const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    task: { type: String, required: true }, 
    desc: { type: String, default: "" },  
    status: { type: String, default: "" },
  });