
export interface Lead {
  id: string;
  name: string;
  company: string;
  industry: string;
  intentScore: number;
  status: 'new' | 'contacted' | 'qualified' | 'lost';
  lastActivity: string;
}

export interface MarketTrend {
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  growth: number;
  description: string;
}

export interface CompetitiveInsight {
  competitor: string;
  strategy: string;
  threatLevel: 'low' | 'medium' | 'high';
  notes: string;
}

export interface IntelligenceReport {
  summary: string;
  trends: MarketTrend[];
  opportunities: string[];
  competitors: CompetitiveInsight[];
  groundingSources: Array<{ web: { uri: string; title: string } }>;
}

export interface SalesScript {
  opening: string;
  valueProp: string;
  handlingObjections: string[];
  closing: string;
}
