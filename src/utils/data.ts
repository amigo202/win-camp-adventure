
import { tools } from './tools/index';
export { type Tool, type Category } from './types/tools';
export { categories } from './categories';
export { tools } from './tools/index';

export const getToolsByCategory = (categoryId: string) => {
  return tools.filter(tool => tool.category === categoryId);
};

export const getAllTools = () => {
  return tools;
};

export const getToolById = (id: string) => {
  return tools.find(tool => tool.id === id);
};
