import React, { useState, useEffect } from "react";
import "./todoTask.css";

const Todotask = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTask = () => {
    if (!form.title || !form.dueDate) {
      alert("Please provide all required fields.");
      return;
    }
    if (currentTask !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTask ? form : task
      );
      setTasks(updatedTasks);
      setCurrentTask(null);
    } else {
      setTasks([...tasks, form]);
    }
    setForm({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  const handleEditTask = (index) => {
    setCurrentTask(index);
    setForm(tasks[index]);
  };

  const handleDeleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleAddTask} className="button1">
          {currentTask !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="task-list">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      className="button2"
                      onClick={() => handleEditTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="button3"
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Todotask;
