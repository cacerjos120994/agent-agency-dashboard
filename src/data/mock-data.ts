import { Agent, Deliverable, ActivityLog, Handoff } from '@/types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Research Fox',
    role: 'Research',
    status: 'Researching',
    specialty: 'Market Analysis & Competitive Intel',
    description: 'Scans the market, analyzes competitors, and extracts high-leverage insights for positioning.',
    tasksCompleted: 42,
    currentTask: 'Analyzing niche furniture market trends',
    taskQueue: [
      { id: 't1', title: 'Compile Top 10 competitor offers', status: 'pending', priority: 'Medium' }
    ],
    lastInput: 'Analyze competitor pricing strategy',
    lastOutput: 'Found average 20% discount on first purchase across top 5 brands.',
    previousHandoff: 'Manager (Brief)',
    nextRecipient: 'Strategy Fox',
    efficiency: 94,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['Competitor X lowered prices', 'Rising search trend for "ergonomic chairs"'],
    position: { x: 20, y: 30 }
  },
  {
    id: 'agent-2',
    name: 'Strategy Fox',
    role: 'Ads Strategist',
    status: 'Analyzing',
    specialty: 'Campaign Architecture & Testing Hypotheses',
    description: 'Transforms market research into actionable ad strategies, hooks, and testing structures.',
    tasksCompleted: 38,
    currentTask: 'Defining A/B testing structure for Q2',
    taskQueue: [
      { id: 't2', title: 'Develop Q2 testing hypotheses', status: 'in_progress', priority: 'High' }
    ],
    lastInput: 'Research Fox (Market Trends Report)',
    lastOutput: 'Proposed 3 core angles: Convenience, Status, ROI.',
    previousHandoff: 'Research Fox',
    nextRecipient: 'Copy Fox',
    efficiency: 91,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['Angle A has 30% higher predicted CTR'],
    position: { x: 40, y: 30 }
  },
  {
    id: 'agent-3',
    name: 'Copy Fox',
    role: 'Creative Copy',
    status: 'Writing',
    specialty: 'High-Conversion Hooks & UGC Scripts',
    description: 'Writes engaging copy, scripts, and headlines based on the defined strategy.',
    tasksCompleted: 156,
    currentTask: 'Drafting 12 hooks for TikTok creative',
    taskQueue: [
      { id: 't3', title: 'Write 5 variations of primary hook', status: 'pending', priority: 'High' }
    ],
    lastInput: 'Strategy Fox (3 Core Angles)',
    lastOutput: 'Drafted 10 high-arousal TikTok hooks.',
    previousHandoff: 'Strategy Fox',
    nextRecipient: 'Planner Fox',
    efficiency: 98,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['Shorter hooks under 3s perform better in testing simulations'],
    position: { x: 60, y: 30 }
  },
  {
    id: 'agent-4',
    name: 'Planner Fox',
    role: 'Media Planner',
    status: 'Planning',
    specialty: 'Budget Allocation & Scaling Logic',
    description: 'Structures campaigns, allocates budgets, and sets up testing phases in ad platforms.',
    tasksCompleted: 29,
    currentTask: 'Optimizing ABO structure for scaling phase',
    taskQueue: [
      { id: 't4', title: 'Set up Advantage+ Shopping structure', status: 'pending', priority: 'Medium' }
    ],
    lastInput: 'Copy Fox (Creative Assets)',
    lastOutput: 'Finalized campaign budget distribution: 70% testing, 30% scaling.',
    previousHandoff: 'Copy Fox',
    nextRecipient: 'Analytics Fox',
    efficiency: 89,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['CBO outperforming ABO in recent simulated runs'],
    position: { x: 80, y: 30 }
  },
  {
    id: 'agent-5',
    name: 'Data Fox',
    role: 'Analytics',
    status: 'Idle',
    specialty: 'Performance Attribution & Fatigue Detection',
    description: 'Monitors live campaigns, detects creative fatigue, and attributes conversions accurately.',
    tasksCompleted: 245,
    taskQueue: [],
    lastInput: 'Meta Ads API (Live Data)',
    lastOutput: 'Detected creative fatigue on Ad Set B.',
    previousHandoff: 'Planner Fox',
    nextRecipient: 'Manager Fox',
    efficiency: 96,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['CTR dropping on main creative, needs refresh'],
    position: { x: 30, y: 70 }
  },
  {
    id: 'agent-6',
    name: 'Auto Fox',
    role: 'Automation',
    status: 'Delivering',
    specialty: 'System Integration & Reporting Ops',
    description: 'Automates reporting, orchestrates data flow between agents, and handles external integrations.',
    tasksCompleted: 890,
    currentTask: 'Generating weekly performance report',
    taskQueue: [
      { id: 't5', title: 'Sync latest metrics to dashboard', status: 'in_progress', priority: 'Low' }
    ],
    lastInput: 'Data Fox (Performance Metrics)',
    lastOutput: 'Compiled weekly executive summary PDF.',
    previousHandoff: 'Data Fox',
    nextRecipient: 'Manager Fox',
    efficiency: 99,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['API latency normal, all webhooks firing correctly'],
    position: { x: 50, y: 70 }
  },
  {
    id: 'agent-7',
    name: 'Manager Fox',
    role: 'Manager',
    status: 'Analyzing',
    specialty: 'Operations Orchestration & Quality Control',
    description: 'Oversees the entire operation, validates outputs, and ensures alignment with business goals.',
    tasksCompleted: 120,
    currentTask: 'Reviewing cross-agent handoff efficiency',
    taskQueue: [
      { id: 't6', title: 'Approve new campaign launch', status: 'pending', priority: 'Critical' }
    ],
    lastInput: 'Auto Fox (Weekly Report)',
    lastOutput: 'Approved Q2 budget increase.',
    previousHandoff: 'Auto Fox',
    nextRecipient: 'Client',
    efficiency: 95,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['Overall agency throughput up 15% this week'],
    position: { x: 70, y: 70 }
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  { id: 'log-1', agentId: 'agent-1', agentName: 'Research Fox', message: 'Completed competitor analysis for Q2.', timestamp: '12:05:22', type: 'success' },
  { id: 'log-2', agentId: 'agent-2', agentName: 'Strategy Fox', message: 'Formulating 3 testing hypotheses based on insights.', timestamp: '12:05:45', type: 'info' },
  { id: 'log-3', agentId: 'agent-1', agentName: 'Research Fox', message: 'Handoff to Strategy Fox successful.', timestamp: '12:05:50', type: 'handoff' },
  { id: 'log-4', agentId: 'agent-7', agentName: 'Manager Fox', message: 'Reviewing current campaign metrics.', timestamp: '12:06:01', type: 'info' },
  { id: 'log-5', agentId: 'agent-6', agentName: 'Auto Fox', message: 'System integrity check: 100% stable.', timestamp: '12:06:12', type: 'success' },
  { id: 'log-6', agentId: 'agent-3', agentName: 'Copy Fox', message: 'Drafting variations for hook: "The secret to focus".', timestamp: '12:06:30', type: 'info' },
  { id: 'log-7', agentId: 'agent-5', agentName: 'Data Fox', message: 'Detected CPA increase in Campaign Beta.', timestamp: '12:06:40', type: 'warning' },
  { id: 'log-8', agentId: 'agent-4', agentName: 'Planner Fox', message: 'Optimizing budget distribution (CBO) to mitigate CPA rise.', timestamp: '12:06:45', type: 'info' },
];

export const INITIAL_DELIVERABLES: Deliverable[] = [
  {
    id: 'del-1',
    title: 'Q2 Competitor Pricing Insights',
    type: 'Insight',
    content: 'Top 3 competitors have increased baseline pricing by 15% while offering aggressive "first month free" trials.',
    authorId: 'agent-1',
    authorName: 'Research Fox',
    timestamp: '11:45:00',
    metrics: { Confidence: '92%', Sources: 14 }
  },
  {
    id: 'del-2',
    title: 'Hook Variant A: The Contrarian',
    type: 'Copy',
    content: '"Stop buying expensive ergonomic chairs. This $50 fix changed my posture forever."',
    authorId: 'agent-3',
    authorName: 'Copy Fox',
    timestamp: '12:01:00',
    metrics: { PredictedCTR: '3.4%', Readability: 'Grade 6' }
  },
  {
    id: 'del-3',
    title: 'Campaign Beta Restructure',
    type: 'Plan',
    content: 'Consolidating 5 ABO ad sets into 2 CBO campaigns (Broad vs. Lookalike 1%) to improve Meta delivery learning.',
    authorId: 'agent-4',
    authorName: 'Planner Fox',
    timestamp: '12:10:00',
    metrics: { EstBudget: '$5k/day', Phase: 'Scaling' }
  }
];

export const INITIAL_HANDOFFS: Handoff[] = [
  {
    id: 'ho-1',
    fromId: 'agent-1',
    toId: 'agent-2',
    fromRole: 'Research',
    toRole: 'Ads Strategist',
    timestamp: '12:05:50',
    payload: 'Competitor Pricing Insights Data Packet',
    status: 'received'
  },
  {
    id: 'ho-2',
    fromId: 'agent-2',
    toId: 'agent-3',
    fromRole: 'Ads Strategist',
    toRole: 'Creative Copy',
    timestamp: '12:15:00',
    payload: 'Core Messaging Angles & Positioning Brief',
    status: 'in_transit'
  }
];
