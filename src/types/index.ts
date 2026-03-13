export type AgentStatus = 
  | 'Idle' 
  | 'Researching' 
  | 'Analyzing' 
  | 'Writing' 
  | 'Designing'
  | 'Planning' 
  | 'Reporting' 
  | 'Blocked' 
  | 'Delivering'
  | 'Active';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AgentTask {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: TaskPriority;
}

export interface Agent {
  // Core Identity
  id: string;
  displayName: string;
  department: string;
  mission: string;
  reportsTo: string;
  collaboratesWith: string[];
  workStyle: string[];
  neverDo: string[];
  corePrinciples: string[];

  // Conduct & Workflow
  inputFormat: string[];
  outputFormat: string[];
  restrictions: string[];
  mandatoryWorkflow: string[];
  escalationRules: string[];
  validationChecklist: string[];

  // Tools & Memory
  privateTools: string[];
  sharedTools: string[];
  localMemory: string[];
  sharedMemoryUsage: string[];
  insightsStoreUsage: string[];
  taskHistoryUsage: string[];

  // Skills & SOPs
  skills: string[];
  maintenance: {
    selfCheck: string[];
    errorRecovery: string[];
    qualityControl: string[];
    stopConditions: string[];
  };

  // Architecture & Handoffs
  dashboardVisualization: {
    zone: string;
    statusLabels: string[];
    deliverablesShown: string[];
  };
  handoffRules: {
    primaryReceiver: string;
    secondaryReceivers: string[];
    payloadMustInclude: string[];
  };

  // Live Operational State (for Dashboard UI)
  status: AgentStatus;
  efficiency: number;
  health: 'Optimal' | 'Degraded' | 'Down';
  position: { x: number; y: number };
  tasksCompleted: number;
  taskQueue: AgentTask[];
  currentTask?: string;
  lastInput?: string;
  lastOutput?: string;
  recentInsights?: string[];
}

export interface Handoff {
  id: string;
  fromId: string;
  toId: string;
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
  objective?: string;
  result?: string;
}

export interface Deliverable {
  id: string;
  title: string;
  type: 'Insight' | 'Hypothesis' | 'Copy' | 'Design' | 'Plan' | 'Report' | 'Alert';
  content: string;
  authorId: string;
  authorName: string;
  timestamp: string;
  metrics?: Record<string, string | number>;
}
