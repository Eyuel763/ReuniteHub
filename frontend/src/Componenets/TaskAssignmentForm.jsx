// src/components/TaskAssignmentForm.js
import { useState } from 'react';
import { assignTask } from '../api/moderation';

const TaskAssignmentForm = ({ volunteers, onSuccess }) => {
  const [formData, setFormData] = useState({
    volunteer: '',
    task_details: '',
    due_date: '',
    status: 'PENDING'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignTask({
        volunteer: formData.volunteer,
        task_details: formData.task_details,
        due_date: formData.due_date,
        status: formData.status
      });
      onSuccess();
      setFormData({
        volunteer: '',
        task_details: '',
        due_date: '',
        status: 'PENDING'
      });
    } catch (error) {
      console.error('Assignment failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Volunteer</label>
        <select
          value={formData.volunteer}
          onChange={(e) => setFormData({...formData, volunteer: e.target.value})}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Volunteer</option>
          {volunteers.map(v => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Task Details</label>
        <textarea
          value={formData.task_details}
          onChange={(e) => setFormData({...formData, task_details: e.target.value})}
          required
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block">Due Date</label>
        <input
          type="datetime-local"
          value={formData.due_date}
          onChange={(e) => setFormData({...formData, due_date: e.target.value})}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Assign Task
      </button>
    </form>
  );
};