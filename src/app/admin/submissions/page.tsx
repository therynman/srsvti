import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Submissions',
};

// Disable static caching so the dashboard is strictly real-time
export const revalidate = 0;

// Re-defining STEPS here to map the short keys (e.g. "1-0") back to the human-readable questions
const STEPS_MAP: Record<string, string> = {
  "0-0": "What is your name?",
  "0-1": "What is your company name?",
  "0-2": "What is your company email?",
  "1-0": "What is your core product category and hero SKU?",
  "1-1": "What is your current website URL?",
  "2-0": "What is your current Average Order Value and subscription adoption percentage?",
  "2-1": "If you mentally removed your logo right now, what makes your brand meaningfully different from the hundreds of competitors in the market?",
  "3-0": "What is your current annual revenue?",
  "3-1": "What do you believe are your primary growth bottlenecks?",
  "3-2": "What are the exact budget allocations set aside for growth initiatives?",
  "4-0": "What is the financial cost to your business of remaining stagnant for another quarter?"
};

export default async function AdminSubmissionsPage() {
  const { data: submissions, error } = await supabase
    .from('diagnoses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] pt-32 pb-20 px-6 flex items-center justify-center text-white">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl">
          Error loading submissions: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pt-32 pb-20 px-4 md:px-8 text-white font-sans selection:bg-[#0077FF] selection:text-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header Region */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[clamp(32px,3.33vw,48px)] font-medium tracking-tight text-white leading-tight">
            Diagnosis Submissions
          </h1>
          <p className="text-[clamp(16px,1.25vw,18px)] font-medium text-white/50">
            Internal dashboard for reviewing strategic revenue architecture applications.
          </p>
        </div>

        {/* Submissions List */}
        {!submissions || submissions.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-[24px] border border-white/5 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-white/60 font-medium text-lg">No submissions recorded yet.</p>
            <p className="text-white/40 mt-2 text-sm">Once users complete the diagnosis form, their data will appear here instantly.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="bg-[#1a1a1a] rounded-[24px] border border-white/5 p-[clamp(24px,3vw,40px)] flex flex-col gap-8 shadow-2xl"
              >
                
                {/* Identity Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[clamp(24px,2vw,32px)] font-medium tracking-tight text-white">
                      {sub.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-[16px]">
                      <span className="text-[#0077FF] font-medium bg-[#0077FF]/10 px-3 py-1 rounded-[8px]">
                        {sub.company_name}
                      </span>
                      <span className="text-white/30">•</span>
                      <a href={`mailto:${sub.company_email}`} className="text-white/60 hover:text-white transition-colors font-medium">
                        {sub.company_email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm font-medium text-white/40 bg-white/5 px-4 py-2.5 rounded-full w-max shrink-0 border border-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {new Date(sub.created_at).toLocaleString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric', 
                      hour: 'numeric', minute: '2-digit' 
                    })}
                  </div>
                </div>

                {/* Questionnaire Breakdown */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-white/30">
                    Diagnostic Responses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {Object.entries(sub.responses || {}).map(([key, value]) => {
                      // Skip structural identity keys since they're in the header
                      if (key === '0-0' || key === '0-1' || key === '0-2') return null;
                      
                      const questionStr = STEPS_MAP[key] || `Question (${key})`;
                      
                      return (
                        <div key={key} className="flex flex-col gap-3">
                          <p className="text-sm font-medium text-white/50 leading-relaxed">
                            {questionStr}
                          </p>
                          <div className="bg-[#222222] border border-white/5 rounded-[12px] p-4 text-white font-medium leading-[160%] shadow-inner">
                            {String(value) || <span className="text-white/20 italic">No response</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
