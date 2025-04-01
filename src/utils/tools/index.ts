
import { Tool } from '../types/tools';
import { programmingTools } from './programmingTools';
import { aiTools } from './aiTools';
import { minecraftTools } from './minecraftTools';
import { designTools } from './designTools';
import { challengeTools } from './challengeTools';
import { safetyTools } from './safetyTools';

export const tools: Tool[] = [
  ...programmingTools,
  ...aiTools,
  ...minecraftTools,
  ...designTools,
  ...challengeTools,
  ...safetyTools
];
