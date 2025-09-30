'use client';

import { ThemeLogo } from '@/app/components/theme-logo';
import UserButton from '@/components/auth/UserButton';

interface PageHeaderProps {
  status: { text: string; active: boolean };
  aiModel: string;
  onModelChange: (model: string) => void;
  availableModels: string[];
  modelDisplayNames: Record<string, string>;
  onCreateSandbox: () => void;
  onReapply: () => void;
  onDownloadZip: () => void;
  canReapply: boolean;
  hasSandbox: boolean;
}

export default function PageHeader({
  status,
  aiModel,
  onModelChange,
  availableModels,
  modelDisplayNames,
  onCreateSandbox,
  onReapply,
  onDownloadZip,
  canReapply,
  hasSandbox
}: PageHeaderProps) {
  return (
    <div className="bg-card px-4 py-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ThemeLogo />
      </div>
      <div className="flex items-center gap-2">
        {/* Model Selector */}
        <select
          value={aiModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#36322F] focus:border-transparent"
        >
          {availableModels.map(model => (
            <option key={model} value={model}>
              {modelDisplayNames[model] || model}
            </option>
          ))}
        </select>
        
        {/* Create Sandbox Button */}
        <button
          onClick={onCreateSandbox}
          className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors"
          title="Create new sandbox"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        {/* Reapply Button */}
        <button
          onClick={onReapply}
          disabled={!canReapply}
          className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Re-apply last generation"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        
        {/* Download ZIP Button */}
        <button
          onClick={onDownloadZip}
          disabled={!hasSandbox}
          className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Download your Vite app as ZIP"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </button>
        
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 bg-[#36322F] text-white px-3 py-1.5 rounded-[10px] text-sm font-medium [box-shadow:inset_0px_-2px_0px_0px_#171310,_0px_1px_6px_0px_rgba(58,_33,_8,_58%)]">
          <span id="status-text">{status.text}</span>
          <div className={`w-2 h-2 rounded-full ${status.active ? 'bg-green-500' : 'bg-gray-500'}`} />
        </div>
        
        {/* User Button */}
        <UserButton />
      </div>
    </div>
  );
}
