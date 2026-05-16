import { useState } from 'react';
import { Settings, Save } from 'lucide-react';

export default function SettingsView() {
  const [profileName, setProfileName] = useState('Alex Thompson');
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Account deployment specifications updated successfully.');
    }, 1500);
  };

  return (
    <div className="bg-[var(--color-space-card)] border border-[var(--color-border-gray)] rounded-xl p-6 shadow-xl max-w-xl">
      <div className="mb-6 pb-3 border-b border-slate-800/60">
        <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <Settings size={14} className="text-[var(--color-accent-blue)]" /> Workspace System Configurations
        </h3>
        <p className="text-xs text-slate-500 mt-1">Adjust root deployment parameters and profile defaults.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium">Architect Profile Operator Signature Name</label>
          <input 
            type="text" 
            value={profileName} 
            onChange={(e) => setProfileName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-medium focus:border-[var(--color-accent-blue)] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800/60">
          <div>
            <h4 className="font-medium text-slate-300">Slack/Webhook Pushes</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Route infrastructure exceptions directly to your team's alert channels.</p>
          </div>
          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
              notifications ? 'bg-[var(--color-accent-blue)]' : 'bg-slate-800'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
              notifications ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <div className="pt-4 border-t border-slate-800/60 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 bg-[var(--color-accent-blue)] text-white hover:bg-[var(--color-accent-blue)]/90 rounded-lg shadow-md font-sans transition-colors disabled:opacity-50"
          >
            <Save size={14} /> {saving ? 'Updating...' : 'Save Specifications'}
          </button>
        </div>
      </form>
    </div>
  );
}