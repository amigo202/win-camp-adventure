
// Simple authentication utilities for WIN CAMP

// Mock credentials - in a real app, these would be stored securely on a server
const MOCK_USERNAME = "WINCAMP";
const MOCK_PASSWORD = "12345";

export interface User {
  username: string;
  displayName: string;
  isAdmin?: boolean;
}

// Login function
export const loginUser = (username: string, password: string): User | null => {
  // Simple validation
  if (username.toUpperCase() === MOCK_USERNAME && password === MOCK_PASSWORD) {
    const user: User = {
      username: username.toUpperCase(),
      displayName: username,
      isAdmin: true // The main WINCAMP user is an admin
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('wincamp_user', JSON.stringify(user));
    
    return user;
  }
  
  return null;
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('wincamp_user') !== null;
};

// Check if user is an admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.isAdmin === true;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('wincamp_user');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('wincamp_user');
};

// Mark tool as complete
export const markToolAsComplete = (toolId: string, completed: boolean): void => {
  let completedTools: string[] = [];
  const storedTools = localStorage.getItem('wincamp_completed_tools');
  
  if (storedTools) {
    completedTools = JSON.parse(storedTools);
  }
  
  if (completed && !completedTools.includes(toolId)) {
    completedTools.push(toolId);
  } else if (!completed) {
    completedTools = completedTools.filter(id => id !== toolId);
  }
  
  localStorage.setItem('wincamp_completed_tools', JSON.stringify(completedTools));
};

// Check if tool is completed
export const isToolCompleted = (toolId: string): boolean => {
  const storedTools = localStorage.getItem('wincamp_completed_tools');
  if (storedTools) {
    const completedTools: string[] = JSON.parse(storedTools);
    return completedTools.includes(toolId);
  }
  return false;
};

// Get number of completed tools
export const getCompletedToolsCount = (): number => {
  const storedTools = localStorage.getItem('wincamp_completed_tools');
  if (storedTools) {
    const completedTools: string[] = JSON.parse(storedTools);
    return completedTools.length;
  }
  return 0;
};

// Reset all completed tools
export const resetCompletedTools = (): void => {
  localStorage.setItem('wincamp_completed_tools', JSON.stringify([]));
};
