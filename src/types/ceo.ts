export interface CeoDecision {
  id: string;
  title: string;
  description: string;
  impact: string;
  suggestedBy: string;
  urgency: 'Normal' | 'High' | 'Critical';
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface CeoAlert {
  id: string;
  message: string;
  source: string;
  type: 'warning' | 'error' | 'info';
  timestamp: string;
}

export interface CeoModeData {
  executiveSummary: string;
  topPriorities: string[];
  alerts: CeoAlert[];
  pendingDecisions: CeoDecision[];
}
