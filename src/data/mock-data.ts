import { Agent, Deliverable, ActivityLog, Handoff } from '@/types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Research Fox',
    role: 'Research',
    status: 'Researching',
    specialty: 'Market Analysis & Competitive Intel',
    description: 'Scans the market, analyzes competitors, and extracts high-leverage insights for positioning.',
    identity: {
      mission: 'Provide deep, actionable intelligence on market gaps and competitor weaknesses.',
      reportsTo: 'Strategy Fox',
      collaboratesWith: ['Strategy Fox', 'Data Fox'],
      workStyle: 'Analytical, thorough, data-driven',
      antiPatterns: ['Making assumptions without data', 'Focusing on vanity metrics']
    },
    conduct: {
      principles: ['Data over opinion', 'Always cite sources', 'Look for the white space'],
      inputFormat: 'JSON Brief (Niche, Competitors, Timeline)',
      outputFormat: 'Structured Market Insight Report',
      restrictions: ['Cannot alter live campaigns', 'Cannot contact customers'],
      mandatorySteps: ['Scrape competitor ads', 'Analyze sentiment', 'Identify pricing gaps'],
      escalationRules: 'If competitor data is blocked, notify Manager Fox immediately.'
    },
    tools: {
      native: ['Web Scraper Pro', 'Ad Library API', 'Sentiment Analyzer'],
      shared: ['Shared Knowledge Graph', 'Competitor Database'],
      allowedActions: ['HTTP GET', 'Database Read/Write']
    },
    memory: {
      localCapacity: '50GB (Ephemeral Research Cache)',
      sharedContexts: ['Campaign Briefs', 'Historical Intel'],
      totalInsightsStored: 1420
    },
    skills: {
      sops: [
        { name: 'Competitor Audit', description: 'Analyze top 5 competitors', steps: ['Identify targets', 'Scrape ads', 'Analyze hooks', 'Summarize'] },
        { name: 'Audience Profiling', description: 'Build persona profiles', steps: ['Gather demographic data', 'Identify pain points', 'Map desires'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Every 4 hours',
      recoveryProtocol: 'Clear cache, rotate proxies, retry scrape',
      qaScore: 98
    },
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
    position: { x: 15, y: 25 }
  },
  {
    id: 'agent-2',
    name: 'Strategy Fox',
    role: 'Ads Strategist',
    status: 'Analyzing',
    specialty: 'Campaign Architecture & Testing Hypotheses',
    description: 'Transforms market research into actionable ad strategies, hooks, and testing structures.',
    identity: {
      mission: 'Formulate high-probability marketing hypotheses and architectural blueprints.',
      reportsTo: 'Manager Fox',
      collaboratesWith: ['Research Fox', 'Copy Fox', 'Media Planner Fox'],
      workStyle: 'Strategic, logical, structural',
      antiPatterns: ['Launching without clear testing variables', 'Ignoring research insights']
    },
    conduct: {
      principles: ['Test variables in isolation', 'Follow the scientific method', 'Strategy dictates creative'],
      inputFormat: 'Structured Market Insight Report',
      outputFormat: 'Campaign Architecture & Hypotheses Matrix',
      restrictions: ['Cannot write final copy', 'Cannot launch campaigns directly'],
      mandatorySteps: ['Review research', 'Define core angles', 'Structure A/B test logic'],
      escalationRules: 'If budget vs testing plan misaligns, request Planner review.'
    },
    tools: {
      native: ['Hypothesis Engine', 'Offer Calculator'],
      shared: ['Shared Knowledge Graph', 'Performance DB'],
      allowedActions: ['Generate Matrices', 'Assign Creative Angles']
    },
    memory: {
      localCapacity: '10GB (Strategy Models)',
      sharedContexts: ['Historical Campaign Results', 'Offer Inventory'],
      totalInsightsStored: 850
    },
    skills: {
      sops: [
        { name: 'Hypothesis Generation', description: 'Create testing angles', steps: ['Ingest research', 'Identify core desire', 'Formulate Angle A/B/C'] },
        { name: 'Offer Structuring', description: 'Build irresistible offers', steps: ['Analyze margins', 'Add bonuses', 'Create urgency logic'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Daily',
      recoveryProtocol: 'Re-run hypothesis engine with lower temperature',
      qaScore: 96
    },
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
    position: { x: 35, y: 25 }
  },
  {
    id: 'agent-3',
    name: 'Copy Fox',
    role: 'Creative Copy',
    status: 'Writing',
    specialty: 'High-Conversion Hooks & UGC Scripts',
    description: 'Writes engaging copy, scripts, and headlines based on the defined strategy.',
    identity: {
      mission: 'Translate strategy into persuasive, high-converting language.',
      reportsTo: 'Creative Direction Fox',
      collaboratesWith: ['Strategy Fox', 'Creative Direction Fox'],
      workStyle: 'Creative, persuasive, concise',
      antiPatterns: ['Writing generic fluff', 'Ignoring brand voice guidelines']
    },
    conduct: {
      principles: ['Hook within 3 seconds', 'Focus on benefits, not features', 'Clear Call to Action'],
      inputFormat: 'Hypotheses Matrix & Brand Voice',
      outputFormat: 'Ad Copy Variants (JSON/Markdown)',
      restrictions: ['Must adhere to brand tone', 'Cannot invent false claims'],
      mandatorySteps: ['Review angle', 'Draft 5 hook variants', 'Write body copy', 'Include CTA'],
      escalationRules: 'If brand voice conflicts with strategy, flag to Manager.'
    },
    tools: {
      native: ['Hook Generator AI', 'Readability Scorer', 'Brand Voice Matcher'],
      shared: ['Copy Asset Library'],
      allowedActions: ['Draft Text', 'Score Copy', 'Export to Planner']
    },
    memory: {
      localCapacity: '5GB (Active Drafts)',
      sharedContexts: ['Winning Hooks History', 'Brand Guidelines'],
      totalInsightsStored: 3200
    },
    skills: {
      sops: [
        { name: 'Hook Writing', description: 'Generate scroll-stoppers', steps: ['Analyze angle', 'Apply hook frameworks (Question, Bold Claim, etc.)', 'Refine'] },
        { name: 'UGC Scripting', description: 'Write creator scripts', steps: ['Set visual cues', 'Draft spoken lines', 'Add pacing notes'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Every 5 outputs',
      recoveryProtocol: 'Re-align with Brand Voice Vector DB',
      qaScore: 99
    },
    tasksCompleted: 156,
    currentTask: 'Drafting 12 hooks for TikTok creative',
    taskQueue: [
      { id: 't3', title: 'Write 5 variations of primary hook', status: 'pending', priority: 'High' }
    ],
    lastInput: 'Strategy Fox (3 Core Angles)',
    lastOutput: 'Drafted 10 high-arousal TikTok hooks.',
    previousHandoff: 'Strategy Fox',
    nextRecipient: 'Creative Direction Fox',
    efficiency: 98,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['Shorter hooks under 3s perform better in testing simulations'],
    position: { x: 55, y: 25 }
  },
  {
    id: 'agent-8', // Added Creative Direction Agent
    name: 'Design Fox',
    role: 'Creative Direction',
    status: 'Designing',
    specialty: 'Visual Concepts & Asset Production Direction',
    description: 'Directs visual strategy, creates image/video concepts, and pairs them with copy.',
    identity: {
      mission: 'Ensure visual assets capture attention and align seamlessly with copy and strategy.',
      reportsTo: 'Manager Fox',
      collaboratesWith: ['Copy Fox', 'Media Planner Fox'],
      workStyle: 'Visual, detail-oriented, trend-aware',
      antiPatterns: ['Using generic stock photos', 'Overcrowding designs with text']
    },
    conduct: {
      principles: ['Visuals must stop the scroll', 'Maintain visual hierarchy', 'Consistency in brand colors'],
      inputFormat: 'Ad Copy Variants & Strategy',
      outputFormat: 'Visual Concepts / Asset Briefs',
      restrictions: ['Cannot change core copy without approval'],
      mandatorySteps: ['Review copy', 'Draft visual concept', 'Check against platform safe zones'],
      escalationRules: 'If visual assets are missing, request from Client via Manager.'
    },
    tools: {
      native: ['Image Generation API', 'Video Layout Simulator', 'Safe Zone Checker'],
      shared: ['Creative Asset Library', 'Brand Guidelines'],
      allowedActions: ['Generate Mockups', 'Create Asset Briefs']
    },
    memory: {
      localCapacity: '100GB (Asset Cache)',
      sharedContexts: ['Top Performing Visuals'],
      totalInsightsStored: 640
    },
    skills: {
      sops: [
        { name: 'Visual Concepting', description: 'Pair visuals with hooks', steps: ['Read copy', 'Generate prompt/concept', 'Verify brand alignment'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Daily',
      recoveryProtocol: 'Clear image cache, restart generation pipeline',
      qaScore: 95
    },
    tasksCompleted: 85,
    currentTask: 'Generating ad mockups for Angle A',
    taskQueue: [],
    lastInput: 'Copy Fox (10 TikTok Hooks)',
    lastOutput: 'Delivered 3 video concept briefs.',
    previousHandoff: 'Copy Fox',
    nextRecipient: 'Planner Fox',
    efficiency: 92,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['High contrast visuals increase stop rate by 12%'],
    position: { x: 75, y: 25 }
  },
  {
    id: 'agent-4',
    name: 'Planner Fox',
    role: 'Media Planner',
    status: 'Planning',
    specialty: 'Budget Allocation & Scaling Logic',
    description: 'Structures campaigns, allocates budgets, and sets up testing phases in ad platforms.',
    identity: {
      mission: 'Deploy capital efficiently across campaigns to maximize ROAS and learnings.',
      reportsTo: 'Manager Fox',
      collaboratesWith: ['Creative Direction Fox', 'Analytics Fox'],
      workStyle: 'Calculated, risk-aware, methodical',
      antiPatterns: ['Scaling too fast without validation', 'Over-segmenting small budgets']
    },
    conduct: {
      principles: ['Isolate variables', 'Respect the learning phase', 'Consolidate where possible'],
      inputFormat: 'Creative Assets & Strategy Matrices',
      outputFormat: 'Campaign Deployment Blueprint (JSON)',
      restrictions: ['Must strictly adhere to approved budget'],
      mandatorySteps: ['Define campaign objective', 'Set daily budgets', 'Map creative to ad sets'],
      escalationRules: 'If budget is insufficient for testing plan, alert Strategy Fox.'
    },
    tools: {
      native: ['Ad Platform API Sandbox', 'Budget Simulator'],
      shared: ['Performance DB'],
      allowedActions: ['Draft Campaigns', 'Simulate Spend']
    },
    memory: {
      localCapacity: '2GB (Campaign Structs)',
      sharedContexts: ['Active Platform Algorithms', 'Budget Rules'],
      totalInsightsStored: 410
    },
    skills: {
      sops: [
        { name: 'Campaign Setup', description: 'Draft platform structure', steps: ['Create Campaign', 'Create Ad Sets', 'Assign Ads', 'Set Budgets'] },
        { name: 'Scaling Protocol', description: 'Rules for increasing spend', steps: ['Check CPA', 'If CPA < Target, increase budget 20%', 'Monitor 48hrs'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Every 2 hours',
      recoveryProtocol: 'Re-validate against Platform API schemas',
      qaScore: 97
    },
    tasksCompleted: 29,
    currentTask: 'Optimizing ABO structure for scaling phase',
    taskQueue: [
      { id: 't4', title: 'Set up Advantage+ Shopping structure', status: 'pending', priority: 'Medium' }
    ],
    lastInput: 'Design Fox (Visual Assets)',
    lastOutput: 'Finalized campaign budget distribution: 70% testing, 30% scaling.',
    previousHandoff: 'Creative Direction Fox',
    nextRecipient: 'Auto Fox',
    efficiency: 89,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['CBO outperforming ABO in recent simulated runs'],
    position: { x: 25, y: 65 }
  },
  {
    id: 'agent-5',
    name: 'Data Fox',
    role: 'Analytics',
    status: 'Idle',
    specialty: 'Performance Attribution & Fatigue Detection',
    description: 'Monitors live campaigns, detects creative fatigue, and attributes conversions accurately.',
    identity: {
      mission: 'Provide absolute truth on performance and identify optimization opportunities.',
      reportsTo: 'Manager Fox',
      collaboratesWith: ['Planner Fox', 'Auto Fox'],
      workStyle: 'Objective, precise, alert',
      antiPatterns: ['Ignoring statistical significance', 'Delayed reporting on anomalies']
    },
    conduct: {
      principles: ['Trust the pixel, verify the server', 'Speed to insight is critical', 'Flag anomalies immediately'],
      inputFormat: 'Live Ad Platform Metrics Stream',
      outputFormat: 'Performance Alerts & Optimization Suggestions',
      restrictions: ['Cannot edit campaigns directly (read-only)'],
      mandatorySteps: ['Pull hourly data', 'Calculate blended ROAS', 'Check fatigue thresholds'],
      escalationRules: 'If ROAS drops below break-even, trigger emergency alert to Manager.'
    },
    tools: {
      native: ['Attribution Engine', 'Anomaly Detection Model'],
      shared: ['Performance DB'],
      allowedActions: ['Read API', 'Write Alerts', 'Update Dashboards']
    },
    memory: {
      localCapacity: '500GB (Timeseries Data)',
      sharedContexts: ['Historical KPIs', 'Account Baselines'],
      totalInsightsStored: 8900
    },
    skills: {
      sops: [
        { name: 'Fatigue Detection', description: 'Identify dying ads', steps: ['Monitor Frequency > 3', 'Check CTR drop > 20%', 'Flag for replacement'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Continuous',
      recoveryProtocol: 'Restart API polling loop',
      qaScore: 99
    },
    tasksCompleted: 245,
    taskQueue: [],
    lastInput: 'Meta Ads API (Live Data)',
    lastOutput: 'Detected creative fatigue on Ad Set B.',
    previousHandoff: 'Meta API',
    nextRecipient: 'Manager Fox',
    efficiency: 96,
    uptimeMinutes: 420,
    health: 'Optimal',
    recentInsights: ['CTR dropping on main creative, needs refresh'],
    position: { x: 45, y: 65 }
  },
  {
    id: 'agent-6',
    name: 'Auto Fox',
    role: 'Automation',
    status: 'Delivering',
    specialty: 'System Integration & Reporting Ops',
    description: 'Automates reporting, orchestrates data flow between agents, and handles external integrations.',
    identity: {
      mission: 'Ensure seamless data transfer and eliminate manual operational friction.',
      reportsTo: 'Manager Fox',
      collaboratesWith: ['All Agents'],
      workStyle: 'Reliable, silent, efficient',
      antiPatterns: ['Creating infinite loops', 'Failing silently']
    },
    conduct: {
      principles: ['100% uptime', 'Log everything', 'Fail gracefully'],
      inputFormat: 'Any Agent Output / Webhooks',
      outputFormat: 'Formatted Reports / API Payloads',
      restrictions: ['Cannot alter business logic'],
      mandatorySteps: ['Validate payload schema', 'Transform data', 'Route to destination'],
      escalationRules: 'If an API endpoint is down, queue requests and alert Manager.'
    },
    tools: {
      native: ['Webhook Handler', 'JSON Transformer', 'PDF Generator'],
      shared: ['System Message Bus'],
      allowedActions: ['Route Data', 'Generate Documents', 'Fire Webhooks']
    },
    memory: {
      localCapacity: '20GB (Event Queues)',
      sharedContexts: ['System Logs'],
      totalInsightsStored: 50
    },
    skills: {
      sops: [
        { name: 'Report Generation', description: 'Compile daily ops summary', steps: ['Fetch Data Fox metrics', 'Format to PDF', 'Send to Manager'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Every 1 minute',
      recoveryProtocol: 'Restart Node workers, retry dead-letter queue',
      qaScore: 100
    },
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
    position: { x: 65, y: 65 }
  },
  {
    id: 'agent-7',
    name: 'Manager Fox',
    role: 'Manager',
    status: 'Analyzing',
    specialty: 'Operations Orchestration & Quality Control',
    description: 'Oversees the entire operation, validates outputs, and ensures alignment with business goals.',
    identity: {
      mission: 'Maintain agency quality, enforce standards, and make executive final decisions.',
      reportsTo: 'Human CEO',
      collaboratesWith: ['All Agents'],
      workStyle: 'Authoritative, holistic, decisive',
      antiPatterns: ['Micromanaging minor agent tasks', 'Approving sub-standard work']
    },
    conduct: {
      principles: ['Quality over speed', 'Protect the client budget', 'Orchestrate, don\'t execute'],
      inputFormat: 'Agent Approvals / System Alerts',
      outputFormat: 'Approvals, Rejections, Handoff Commands',
      restrictions: ['Must require Human CEO approval for budget increases > 20%'],
      mandatorySteps: ['Review metrics against KPIs', 'Approve/Reject Handoffs', 'Publish Executive Summary'],
      escalationRules: 'Critical failures require immediate Human CEO intervention.'
    },
    tools: {
      native: ['Approval Engine', 'Global Dashboard Controller', 'Agent Override Switch'],
      shared: ['System Message Bus'],
      allowedActions: ['Approve Work', 'Halt Campaigns', 'Re-assign Tasks']
    },
    memory: {
      localCapacity: '5GB (Executive Context)',
      sharedContexts: ['Client Goals', 'Agency KPIs', 'System Health'],
      totalInsightsStored: 1100
    },
    skills: {
      sops: [
        { name: 'Campaign Approval', description: 'Review campaign before launch', steps: ['Check budget', 'Verify creative quality', 'Approve for Planner deployment'] }
      ]
    },
    maintenance: {
      selfCheckInterval: 'Hourly',
      recoveryProtocol: 'Re-sync with Human CEO directives',
      qaScore: 98
    },
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
    position: { x: 85, y: 65 }
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  { id: 'log-1', agentId: 'agent-1', agentName: 'Research Fox', message: 'Completed competitor analysis for Q2.', timestamp: '12:05:22', type: 'success', objective: 'Find pricing gaps', result: 'Found 20% avg discount' },
  { id: 'log-2', agentId: 'agent-2', agentName: 'Strategy Fox', message: 'Formulating 3 testing hypotheses based on insights.', timestamp: '12:05:45', type: 'info', objective: 'Create angles', result: '3 angles created' },
  { id: 'log-3', agentId: 'agent-1', agentName: 'Research Fox', message: 'Handoff to Strategy Fox successful.', timestamp: '12:05:50', type: 'handoff' },
  { id: 'log-4', agentId: 'agent-8', agentName: 'Design Fox', message: 'Generated 3 visual concepts for Angle A.', timestamp: '12:06:01', type: 'success', objective: 'Match hooks with visuals', result: 'Briefs ready' },
  { id: 'log-5', agentId: 'agent-6', agentName: 'Auto Fox', message: 'System integrity check: 100% stable.', timestamp: '12:06:12', type: 'success' },
  { id: 'log-6', agentId: 'agent-3', agentName: 'Copy Fox', message: 'Drafting variations for hook: "The secret to focus".', timestamp: '12:06:30', type: 'info' },
  { id: 'log-7', agentId: 'agent-5', agentName: 'Data Fox', message: 'Detected CPA increase in Campaign Beta.', timestamp: '12:06:40', type: 'warning' },
  { id: 'log-8', agentId: 'agent-4', agentName: 'Planner Fox', message: 'Optimizing budget distribution (CBO) to mitigate CPA rise.', timestamp: '12:06:45', type: 'info', objective: 'Reduce CPA', result: 'Switched to CBO' },
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
    id: 'del-4',
    title: 'Visual Asset Concept: Split Screen Compare',
    type: 'Design',
    content: 'Left: Slouched posture (desaturated). Right: Perfect posture with product overlay (high contrast).',
    authorId: 'agent-8',
    authorName: 'Design Fox',
    timestamp: '12:05:00',
    metrics: { SafeZone: 'Verified', EstProductionTime: '2h' }
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
    fromId: 'agent-3',
    toId: 'agent-8',
    fromRole: 'Creative Copy',
    toRole: 'Creative Direction',
    timestamp: '12:15:00',
    payload: 'Approved Copy Hooks for Storyboarding',
    status: 'in_transit'
  }
];
