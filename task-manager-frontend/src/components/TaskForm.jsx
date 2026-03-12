import { useState } from "react";

function TaskForm({ addTask, existingTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicate title
    const isDuplicate = existingTasks.some(task => 
      task.title.toLowerCase().trim() === title.toLowerCase().trim()
    );

    if (isDuplicate) {
      setError(`⚠️ Task "${title}" already exists! Please use a different title.`);
      return;
    }

    // Clear error if validation passes
    setError("");

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      due_date: dueDate || null, // Ensure null if empty
      status: "Pending",
      remarks: remarks.trim()
    };

    try {
      await addTask(newTask);
      
      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setRemarks("");
      setError("");
    } catch (error) {
      console.error('Error adding task:', error);
      setError('❌ Failed to add task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>➕ Add New Task</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <input
          type="text"
          placeholder="📝 Task Title"
          className="form-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(""); // Clear error when typing
          }}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="📄 Task Description"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="date"
          className="form-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="💭 Remarks"
          className="form-input"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
        ➕ Add Task
      </button>
    </form>
  );
}

export default TaskForm;