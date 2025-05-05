// src/pages/ModeratorDashboard.js
import { useState, useEffect } from 'react';
import { 
  fetchModeratorActions,
  fetchAssignedTasks
} from '../api/moderation';
import TaskAssignmentForm from '../components/TaskAssignmentForm';

const ModeratorDashboard = () => {
  const [actions, setActions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [actionsRes, tasksRes, volunteersRes] = await Promise.all([
          fetchModeratorActions(),
          fetchAssignedTasks(),
          fetch('/api/volunteers/').then(res => res.json())
        ]);
        
        setActions(actionsRes.data);
        setTasks(tasksRes.data);
        setVolunteers(volunteersRes);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleTaskAssigned = async () => {
    const [actionsRes, tasksRes] = await Promise.all([
      fetchModeratorActions(),
      fetchAssignedTasks()
    ]);
    setActions(actionsRes.data);
    setTasks(tasksRes.data);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Moderator Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Assign New Task</h2>
          <TaskAssignmentForm 
            volunteers={volunteers} 
            onSuccess={handleTaskAssigned}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Actions</h2>
          <div className="space-y-4">
            {actions.slice(0, 5).map(action => (
              <div key={action.id} className="p-3 border rounded shadow-sm">
                <p>{action.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(action.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Assigned Tasks</h2>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="p-3 border rounded shadow-sm">
                <p className="font-medium">{task.task_details}</p>
                <p className="text-sm">Status: {task.status}</p>
                <p className="text-sm">Due: {new Date(task.due_date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};