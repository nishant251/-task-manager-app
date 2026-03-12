function TaskItem({ task, index, deleteTask, startEdit, isEditing }) {
  if (isEditing) {
    return null; // Don't render item while editing
  }

  const getStatusClass = (status) => {
    return status.toLowerCase() === 'completed' ? 'status-completed' : 'status-pending';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isRecentlyUpdated = (updatedDate) => {
    if (!updatedDate) return false;
    const updated = new Date(updatedDate);
    const now = new Date();
    const diffInMinutes = (now - updated) / (1000 * 60);
    return diffInMinutes < 5; // Less than 5 minutes ago
  };

  return (
    <div className="task-item">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <h3>{task.title}</h3>
        {isRecentlyUpdated(task.updated_on) && (
          <span style={{ 
            background: '#28a745', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '11px',
            fontWeight: 'bold'
          }}>
            ⚡ Recently Updated
          </span>
        )}
      </div>
      
      <p>{task.description}</p>
      
      <div className="task-meta">
        <div className="task-meta-item">
          📅 <strong>Due:</strong> {task.due_date || 'No due date'}
        </div>
        <div className="task-meta-item">
          🏷️ <span className={`status-badge ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
        </div>
      </div>
      
      <div className="task-meta">
        <div className="task-meta-item">
          🕐 <strong>Created:</strong> {formatDateTime(task.created_on)}
        </div>
        <div className="task-meta-item">
          🔄 <strong>Updated:</strong> {formatDateTime(task.updated_on)}
        </div>
      </div>
      
      <div className="task-meta">
        <div className="task-meta-item">
          👤 <strong>Created By:</strong> {task.created_by || 'Unknown'}
        </div>
        <div className="task-meta-item">
          ✏️ <strong>Updated By:</strong> {task.updated_by || 'Unknown'}
        </div>
      </div>
      
      {task.remarks && (
        <p><em>💭 {task.remarks}</em></p>
      )}
      
      <div className="task-actions">
        <button 
          onClick={() => startEdit(index)} 
          className="btn-small btn-edit"
        >
          ✏️ Edit
        </button>
        
        <button 
          onClick={() => deleteTask(task.id)} 
          className="btn-small btn-delete"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;