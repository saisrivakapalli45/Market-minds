
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Search, 
  Settings, 
  LayoutDashboard, 
  BrainCircuit, 
  ShieldAlert,
  ArrowUpRight,
  ExternalLink,
  MessageSquareQuote,
  Zap,
  Loader2
} from 'lucide-react';
import { analyzeMarket, generatePitch } from './services/geminiService';
import { Lead, IntelligenceReport, SalesScript } from './types';
import LeadCard from './components/LeadCard';
import MarketMap from './components/MarketMap';

// Mock Initial Data
const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Alex Rivera', company: 'CloudScale Inc.', industry: 'SaaS', intentScore: 92, status: 'new', lastActivity: '2h ago' },
  { id: '2', name: 'Sarah Chen', company: 'Nova Health', industry: 'Healthtech', intentScore: 74, status: 'contacted', lastActivity: '5h ago' },
  { id: '3', name: 'Marcus Thorne', company: 'GreenPace', industry: 'Renewables', intentScore: 48, status: 'new', lastActivity: '1d ago' },
  { id: '4', name: 'Elena Vance', company: 'Blackwood Capital', industry: 'Fintech', intentScore: 88, status: 'qualified', lastActivity: '1h ago' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'intelligence' | 'copilot'>('dashboard');
  const [industrySearch, setIndustrySearch] = useState('Cybersecurity');
  const [intelReport, setIntelReport] = useState<IntelligenceReport | null>(null);
  const [isLoadingIntel, setIsLoadingIntel] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [salesScript, setSalesScript] = useState<SalesScript | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  const fetchIntelligence = async () => {
    setIsLoadingIntel(true);
    try {
      const data = await analyzeMarket(industrySearch);
      setIntelReport(data);
    } catch (error) {
      console.error("Error fetching market intel:", error);
    } finally {
      setIsLoadingIntel(false);
    }
  };

  const handleGeneratePitch = async () => {
    if (!selectedLead) return;
    setIsGeneratingScript(true);
    try {
      const script = await generatePitch(
        `${selectedLead.name} from ${selectedLead.company} in the ${selectedLead.industry} sector`,
        "Market Mind AI Enterprise intelligence platform"
      );
      setSalesScript(script);
    } catch (error) {
      console.error("Error generating pitch:", error);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'intelligence' && !intelReport) {
      fetchIntelligence();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 glass border-r border-slate-800 p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20">
            <BrainCircuit className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Market<span className="text-sky-400">Mind</span></h1>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest px-2 mb-2">Platform</p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Pipeline</span>
          </button>
          <button 
            onClick={() => setActiveTab('intelligence')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeTab === 'intelligence' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
          >
            <Globe size={18} />
            <span className="text-sm font-medium">Market Intel</span>
          </button>
          <button 
            onClick={() => setActiveTab('copilot')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeTab === 'copilot' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'}`}
          >
            <Zap size={18} />
            <span className="text-sm font-medium">Sales Copilot</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <header className="sticky top-0 glass border-b border-slate-800 px-8 py-4 z-40 flex justify-between items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search leads or competitors..."
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-slate-950" />
              ))}
            </div>
            <button className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-sky-500/20">
              New Campaign
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Pipeline Intelligence</h2>
                  <p className="text-slate-400">Visualizing your high-intent prospects and market exposure.</p>
                </div>
                <div className="flex gap-3">
                  <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                    <TrendingUp size={20} className="text-emerald-400" />
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Avg Intent</div>
                      <div className="text-lg font-bold">78.4%</div>
                    </div>
                  </div>
                  <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                    <Users size={20} className="text-sky-400" />
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Qualified</div>
                      <div className="text-lg font-bold">128</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INITIAL_LEADS.map(lead => (
                      <LeadCard 
                        key={lead.id} 
                        lead={lead} 
                        onSelect={(l) => {
                          setSelectedLead(l);
                          setActiveTab('copilot');
                        }} 
                      />
                    ))}
                  </div>
                  <MarketMap />
                </div>
                
                <div className="space-y-6">
                  <div className="glass p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-sky-500/10 border-sky-500/20">
                    <div className="flex items-center gap-2 text-sky-400 mb-4">
                      <Zap size={20} />
                      <h3 className="font-bold">AI Recommended Action</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      "CloudScale Inc. (Alex Rivera) just updated their tech stack to include Kubernetes. This matches our Tier-1 trigger. Recommend immediate reach-out with the **Scale-Ready pitch**."
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedLead(INITIAL_LEADS[0]);
                        setActiveTab('copilot');
                      }}
                      className="w-full py-2.5 bg-sky-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-sky-400 transition-colors"
                    >
                      Draft Outreach <ArrowUpRight size={16} />
                    </button>
                  </div>

                  <div className="glass p-6 rounded-2xl">
                    <h3 className="font-bold mb-4">Upcoming Meetings</h3>
                    <div className="space-y-4">
                      {[
                        { time: '10:00 AM', name: 'Product Demo', with: 'Sarah Chen' },
                        { time: '02:30 PM', name: 'Contract Review', with: 'Elena Vance' }
                      ].map((meeting, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-lg bg-slate-900/40 border border-slate-800/50">
                          <div className="text-xs font-bold text-sky-400 w-16 pt-1">{meeting.time}</div>
                          <div>
                            <div className="text-sm font-semibold">{meeting.name}</div>
                            <div className="text-xs text-slate-500">{meeting.with}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'intelligence' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Market Intelligence</h2>
                  <p className="text-slate-400">Deep-dive into industry shifts and competitor strategies.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <input 
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm flex-1 md:w-64 focus:border-sky-500/50"
                    placeholder="Enter industry..."
                  />
                  <button 
                    onClick={fetchIntelligence}
                    disabled={isLoadingIntel}
                    className="bg-sky-500 hover:bg-sky-400 px-6 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoadingIntel ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />}
                    Scan
                  </button>
                </div>
              </div>

              {intelReport ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="glass p-8 rounded-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Globe size={120} />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <ShieldAlert className="text-amber-400" />
                          Executive Summary
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                          {intelReport.summary}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass p-6 rounded-2xl">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                          <TrendingUp size={18} className="text-emerald-400" />
                          Key Trends
                        </h3>
                        <div className="space-y-6">
                          {intelReport.trends.map((trend, i) => (
                            <div key={i} className="group">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-slate-200 group-hover:text-sky-400 transition-colors">{trend.topic}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${trend.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                  +{trend.growth}%
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed">{trend.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="glass p-6 rounded-2xl">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                          <ShieldAlert size={18} className="text-rose-400" />
                          Competitor Analysis
                        </h3>
                        <div className="space-y-4">
                          {intelReport.competitors.map((comp, i) => (
                            <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-slate-100">{comp.competitor}</span>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${comp.threatLevel === 'high' ? 'text-rose-400 bg-rose-400/10' : 'text-amber-400 bg-amber-400/10'}`}>
                                  {comp.threatLevel} Threat
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-sky-400 mb-1">{comp.strategy}</div>
                              <p className="text-[11px] text-slate-500">{comp.notes}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass p-6 rounded-2xl">
                      <h3 className="font-bold mb-4">Top Opportunities</h3>
                      <div className="space-y-3">
                        {intelReport.opportunities.map((opp, i) => (
                          <div key={i} className="flex gap-3 items-start group cursor-default">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:scale-150 transition-transform" />
                            <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">{opp}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass p-6 rounded-2xl">
                      <h3 className="font-bold mb-4">Grounding Sources</h3>
                      <div className="space-y-3">
                        {intelReport.groundingSources.map((source, i) => (
                          <a 
                            key={i} 
                            href={source.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800"
                          >
                            <span className="text-xs text-slate-400 truncate">{source.web.title}</span>
                            <ExternalLink size={14} className="text-slate-600 shrink-0" />
                          </a>
                        ))}
                        {intelReport.groundingSources.length === 0 && (
                          <p className="text-xs text-slate-600 italic">No external sources indexed for this query.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border-dashed border-slate-700">
                  <Globe size={48} className="text-slate-700 mb-4" />
                  <h3 className="text-lg font-bold text-slate-500 mb-1">No Market Data Loaded</h3>
                  <p className="text-slate-600 max-w-xs text-center">Enter an industry and click 'Scan' to generate a real-time intelligence report.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'copilot' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sales Copilot</h2>
                <p className="text-slate-400">Generate high-converting scripts based on deep lead intelligence.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="font-bold mb-6">1. Select Target Lead</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {INITIAL_LEADS.map(lead => (
                        <div 
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-sky-500/10 border-sky-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                        >
                          <div className="font-bold text-sm">{lead.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase">{lead.company}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedLead && (
                    <div className="glass p-6 rounded-2xl animate-in slide-in-from-left-4 duration-300">
                      <h3 className="font-bold mb-4">2. Contextual Data</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Lead Strength</span>
                          <span className="font-bold text-emerald-400">High (9.2/10)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Key Paint Points</span>
                          <span className="text-slate-300">Scaling infra, Security Compliance</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Preferred Channel</span>
                          <span className="text-sky-400 font-semibold">LinkedIn DM</span>
                        </div>
                        <button 
                          onClick={handleGeneratePitch}
                          disabled={isGeneratingScript}
                          className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-500/20 disabled:opacity-50"
                        >
                          {isGeneratingScript ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                          Generate High-Impact Script
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="glass p-8 rounded-3xl min-h-[500px] flex flex-col">
                  {salesScript ? (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                        <h3 className="text-xl font-bold text-sky-400 flex items-center gap-2">
                          <MessageSquareQuote size={24} />
                          Generated Pitch
                        </h3>
                        <button className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-wider">Copy to Clipboard</button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 block">Opening</label>
                          <p className="text-slate-200 bg-slate-900/80 p-4 rounded-xl border border-slate-800 leading-relaxed italic">
                            "{salesScript.opening}"
                          </p>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 block">Value Proposition</label>
                          <div className="bg-sky-500/5 p-5 rounded-2xl border border-sky-500/20">
                            <p className="text-sky-100 font-medium leading-relaxed">
                              {salesScript.valueProp}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 block">Handling Objections</label>
                          <div className="grid grid-cols-1 gap-2">
                            {salesScript.handlingObjections.map((obj, i) => (
                              <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                                {obj}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2 block">The Close</label>
                          <p className="text-slate-200 bg-slate-900/80 p-4 rounded-xl border border-slate-800 leading-relaxed">
                            {salesScript.closing}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
                      <MessageSquareQuote size={64} className="mb-4 opacity-10" />
                      <p className="text-sm font-medium opacity-40">Your AI-generated pitch will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
