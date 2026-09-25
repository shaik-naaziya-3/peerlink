import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: "Bearer " + token } : {};
};

export const registerUser = (userData) =>
  api.post("/auth/register", userData);

export const loginUser = (credentials) =>
  api.post("/auth/login", credentials);

export const hasValidStoredAuth = () => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const createLearningRequest = (skillId) =>
  api.post("/requests", { skillId }, { headers: getAuthHeaders() });

export const getStudentRequests = () =>
  api.get("/requests/student", { headers: getAuthHeaders() });

export const getMentorRequests = () =>
  api.get("/requests/mentor", { headers: getAuthHeaders() });

export const updateRequestStatus = (requestId, status) =>
  api.put(
    `/requests/${requestId}/status`,
    { status },
    { headers: getAuthHeaders() }
  );

export const createLearningSession = (sessionData) =>
  api.post("/sessions", sessionData, { headers: getAuthHeaders() });

export const getStudentSessions = () =>
  api.get("/sessions/student", { headers: getAuthHeaders() });

export const getMentorSessions = () =>
  api.get("/sessions/mentor", { headers: getAuthHeaders() });

export const updateSessionStatus = (sessionId, status) =>
  api.put(
    `/sessions/${sessionId}/status`,
    { status },
    { headers: getAuthHeaders() }
  );

export default api;
