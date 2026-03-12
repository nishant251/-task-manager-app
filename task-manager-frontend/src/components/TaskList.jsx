import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, startEdit, editingIndex }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <h3>📭 No tasks found</h3>
          <p>Start by adding a new task to get organized!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>📋 Your Tasks ({tasks.length})</h2>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          deleteTask={deleteTask}
          startEdit={startEdit}
          isEditing={editingIndex === index}
        />
      ))}
    </div>
  );
}

export default TaskList;