import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import EditTask from "./components/EditTask";
import API from "./services/api";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Get current user name
  const userName = sessionStorage.getItem('userName') || 'User';

  // Get current user info from sessionStorage
  const getCurrentUser = () => {
    const userName = sessionStorage.getItem('userName') || 'Unknown User';
    const userId = sessionStorage.getItem('userId') || 'unknown';
    return { userName, userId };
  };

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

  // Add task
  const addTask = async (task) => {
    try {
      const currentUser = getCurrentUser();
      const res = await API.post("/tasks", task, {
        headers: {
          'x-user-name': currentUser.userName,
          'x-user-id': currentUser.userId
        }
      });
      fetchTasks();
      setSearch(""); // Clear search after adding task
    } catch (error) {
      console.error("Error adding task:", error);
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

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const currentUser = getCurrentUser();
      const res = await API.put(`/tasks/${id}`, updatedTask, {
        headers: {
          'x-user-name': currentUser.userName,
          'x-user-id': currentUser.userId
        }
      });
      fetchTasks();
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating task:", error);
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

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>
              <span style={{ color: '#FF6B6B' }}>📋</span>{' '}
              <span style={{ color: '#4ECDC4' }}>Task</span>{' '}
              <span style={{ color: '#45B7D1' }}>Manager</span>
            </h1>
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              <span style={{ color: '#FF6B6B' }}>Organize</span>{' '}
              <span style={{ color: '#4ECDC4' }}>your</span>{' '}
              <span style={{ color: '#45B7D1' }}>tasks</span>{' '}
              <span style={{ color: '#96CEB4' }}>efficiently</span>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              👤 {userName}
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
        <div className="edit-overlay">
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

export default App;
