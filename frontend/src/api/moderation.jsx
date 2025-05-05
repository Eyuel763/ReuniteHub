// src/api/moderation.js
import axios from 'axios';

const API_BASE = '/api';

export const fetchModeratorActions = () => axios.get(`${API_BASE}/moderation/`);
export const createModeratorAction = (data) => axios.post(`${API_BASE}/moderation/`, data);
export const fetchModeratorAction = (id) => axios.get(`${API_BASE}/moderation/${id}/`);
export const updateModeratorAction = (id, data) => axios.put(`${API_BASE}/moderation/${id}/`, data);
export const partialUpdateModeratorAction = (id, data) => axios.patch(`${API_BASE}/moderation/${id}/`, data);
export const deleteModeratorAction = (id) => axios.delete(`${API_BASE}/moderation/${id}/`);

export const assignTask = (taskData) => axios.post(`${API_BASE}/assign-task/`, taskData);
export const fetchAssignedTasks = () => axios.get(`${API_BASE}/assigned-tasks/`);
export const fetchAssignedTask = (id) => axios.get(`${API_BASE}/assigned-tasks/${id}/`);