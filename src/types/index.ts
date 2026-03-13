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

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AgentTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: TaskPriority;
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  specialty: string;
  description: string;
  tasksCompleted: number;
  currentTask?: string;
  taskQueue: AgentTask[];
  lastInput?: string;
  lastOutput?: string;
  previousHandoff?: string;
  nextRecipient?: string;
  efficiency: number; // 0-100
  uptimeMinutes: number;
  health: 'Optimal' | 'Degraded' | 'Down';
  recentInsights: string[];
  position: { x: number; y: number }; // Percentage for pixel art grid
}

export interface Handoff {
  id: string;
  fromId: string;
  toId: string;
  fromRole: AgentRole;
  toRole: AgentRole;
  timestamp: string;
  payload: string;
  status: 'pending' | 'in_transit' | 'received';
}

export type LogEventType = 'info' | 'success' | 'warning' | 'error' | 'handoff' | 'alert' | 'delivery';

export interface ActivityLog {
  id: string;
  agentId: string;
  agentName: string;
  message: string;
  timestamp: string;
  type: LogEventType;
}

export interface Deliverable {
  id: string;
  title: string;
  type: 'Insight' | 'Hypothesis' | 'Copy' | 'Plan' | 'Report' | 'Alert';
  content: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  metrics?: Record<string, string | number>;
}
