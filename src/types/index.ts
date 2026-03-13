export type AgentRole = 
  | 'Research' 
  | 'Ads Strategist' 
  | 'Creative Copy' 
  | 'Media Planner' 
  | 'Analytics' 
  | 'Automation' 
  | 'Manager';

export type AgentStatus = 
  | 'Idle' 
  | 'Researching' 
  | 'Analyzing' 
  | 'Writing' 
  | 'Planning' 
  | 'Reporting' 
  | 'Blocked' 
  | 'Delivering';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  specialty: string;
  tasksCompleted: number;
  currentTask?: string;
  lastOutput?: string;
  efficiency: number; // 0-100
  position: { x: number; y: number }; // Percentage for pixel art grid
}

export interface Handoff {
  id: string;
  from: AgentRole;
  to: AgentRole;
  timestamp: string;
  payload: string;
}

export interface ActivityLog {
  id: string;
  agentName: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
}
