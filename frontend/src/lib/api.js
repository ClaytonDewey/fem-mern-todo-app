import API from '../config/apiClient';

export const register = async (data) => API.post('/auth/register', data);
export const login = async (data) => API.post('/auth/login', data);
export const logout = async () => API.get('/auth/logout');
export const verifyEmail = async (verificationCode) =>
  API.get(`/auth/email/verify/${verificationCode}`);
export const sendPasswordResetEmail = async (email) =>
  API.post('/auth/password/forgot', { email });
export const resetPassword = async ({ verificationCode, password }) =>
  API.post('/auth/password/reset', { verificationCode, password });

export const getUser = async () => API.get('/user');
export const getSessions = async () => API.get('/sessions');
export const deleteSession = async (id) => API.delete(`/sessions/${id}`);

// Tasks
export const createTask = async (data) => API.post('/tasks/create-task', data);
export const getTasks = async () => API.get('/tasks');
// export const updateTask = async (id) => API.patch(`/tasks/${id}`);
export const deleteTask = async (id) => API.delete(`/tasks/${id}`);
