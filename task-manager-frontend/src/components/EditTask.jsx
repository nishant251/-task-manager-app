import { useState } from "react";

function EditTask({ task, updateTask, cancelEdit }) {
  // Format the date from database for date input
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(formatDateForInput(task.due_date));
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Format date properly for database
    const formattedDate = dueDate ? dueDate.split('T')[0] : null;
    
    const updatedTask = {
      title,
      description,
      due_date: formattedDate,
      status,
      remarks: task.remarks || ''
    };

    await updateTask(task.id, updatedTask);
  };

  const handleUpdateClick = async () => {
    // Format date properly for database
    const formattedDate = dueDate ? dueDate.split('T')[0] : null;
    
    const updatedTask = {
      title,
      description,
      due_date: formattedDate,
      status,
      remarks: task.remarks || ''
    };

    await updateTask(task.id, updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task-form">
      <h3>✏️ Edit Task</h3>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="📝 Task Title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="form-input"
        >
          <option value="Pending">⏳ Pending</option>
          <option value="Completed">✅ Completed</option>
        </select>
      </div>

      <div className="edit-form-actions">
        <button type="submit" className="btn btn-update">
          💾 Update Task
        </button>
        <button type="button" onClick={cancelEdit} className="btn btn-cancel">
          ❌ Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTask;