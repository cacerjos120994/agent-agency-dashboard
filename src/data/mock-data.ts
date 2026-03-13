import { Agent } from '@/types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Research Fox',
    role: 'Research',
    status: 'Researching',
    specialty: 'Market Analysis & Competitive Intel',
    tasksCompleted: 42,
    currentTask: 'Analyzing niche furniture market trends',
    efficiency: 94,
    position: { x: 20, y: 30 }
  },
  {
    id: '2',
    name: 'Strategy Fox',
    role: 'Ads Strategist',
    status: 'Analyzing',
    specialty: 'Campaign Architecture & Testing Hypotheses',
    tasksCompleted: 38,
    currentTask: 'Defining A/B testing structure for Q2',
    efficiency: 91,
    position: { x: 40, y: 30 }
  },
  {
    id: '3',
    name: 'Copy Fox',
    role: 'Creative Copy',
    status: 'Writing',
    specialty: 'High-Conversion Hooks & UGC Scripts',
    tasksCompleted: 156,
    currentTask: 'Drafting 12 hooks for TikTok creative',
    efficiency: 98,
    position: { x: 60, y: 30 }
  },
  {
    id: '4',
    name: 'Planner Fox',
    role: 'Media Planner',
    status: 'Planning',
    specialty: 'Budget Allocation & Scaling Logic',
    tasksCompleted: 29,
    currentTask: 'Optimizing ABO structure for scaling phase',
    efficiency: 89,
    position: { x: 80, y: 30 }
  },
  {
    id: '5',
    name: 'Data Fox',
    role: 'Analytics',
    status: 'Idle',
    specialty: 'Performance Attribution & Fatigue Detection',
    tasksCompleted: 245,
    efficiency: 96,
    position: { x: 30, y: 70 }
  },
  {
    id: '6',
    name: 'Auto Fox',
    role: 'Automation',
    status: 'Delivering',
    specialty: 'System Integration & Reporting Ops',
    tasksCompleted: 890,
    currentTask: 'Generating weekly performance report',
    efficiency: 99,
    position: { x: 50, y: 70 }
  },
  {
    id: '7',
    name: 'Manager Fox',
    role: 'Manager',
    status: 'Analyzing',
    specialty: 'Operations Orchestration & Quality Control',
    tasksCompleted: 120,
    currentTask: 'Reviewing cross-agent handoff efficiency',
    efficiency: 95,
    position: { x: 70, y: 70 }
  }
];
