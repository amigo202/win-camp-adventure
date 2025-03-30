
// Simple authentication utilities for WIN CAMP

// Mock credentials - in a real app, these would be stored securely on a server
const MOCK_USERS = [
  { username: "WINCAMP", password: "12345", isAdmin: true, displayName: "WINCAMP" },
  { username: "WINCAMP100", password: "12345", isAdmin: false, displayName: "מדריך 1" },
  { username: "WINCAMP200", password: "12345", isAdmin: false, displayName: "מדריך 2" },
];

export interface User {
  username: string;
  displayName: string;
  isAdmin?: boolean;
}

// Login function
export const loginUser = (username: string, password: string): User | null => {
  // Convert to uppercase for case-insensitive comparison
  const uppercaseUsername = username.toUpperCase();
  
  // Find matching user
  const matchedUser = MOCK_USERS.find(
    user => user.username === uppercaseUsername && user.password === password
  );
  
  if (matchedUser) {
    const user: User = {
      username: matchedUser.username,
      displayName: matchedUser.displayName,
      isAdmin: matchedUser.isAdmin
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
