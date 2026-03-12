import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import EditTask from "../components/EditTask";
import API from "../services/api";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Get current user info from sessionStorage
  const getCurrentUser = () => {
    const userName = sessionStorage.getItem('userName') || 'Unknown User';
    const userId = sessionStorage.getItem('userId') || 'Unknown';
    return { userName, userId };
  };

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Run when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task with user tracking
  const addTask = async (task) => {
    try {
      const currentUser = getCurrentUser();
      const taskWithUser = {
        ...task,
        created_by_name: currentUser.userName,
        created_by_id: currentUser.userId,
        updated_by_name: currentUser.userName,
        updated_by_id: currentUser.userId
      };
      
      await API.post("/tasks", taskWithUser);
      fetchTasks();
      setSearch(""); // Clear search after adding task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update task with user tracking
  const updateTask = async (id, updatedTask) => {
    try {
      const currentUser = getCurrentUser();
      const taskWithUser = {
        ...updatedTask,
        updated_by_name: currentUser.userName,
        updated_by_id: currentUser.userId
      };
      
      await API.put(`/tasks/${id}`, taskWithUser);
      fetchTasks();
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start editing
  const startEdit = (index) => {
    setEditingIndex(index);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  // Search filter
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentUser = getCurrentUser();

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>📋 Task Manager</h1>
            <p>Organize your tasks efficiently</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              👤 {currentUser.userName}
            </span>
            <button onClick={handleLogout} className="btn-small btn-logout">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="search-container">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div className="task-form">
        <TaskForm addTask={addTask} existingTasks={tasks} />
      </div>

      <div className="task-list">
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          startEdit={startEdit}
          editingIndex={editingIndex}
        />
      </div>

      {editingIndex !== null && (
        <div className="edit-task-form">
          <EditTask
            task={filteredTasks[editingIndex]}
            updateTask={updateTask}
            cancelEdit={cancelEdit}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
