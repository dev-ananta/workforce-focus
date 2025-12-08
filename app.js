// Main Bootstrap & Module Wiring

// Import Utilities & Modules
import Storage from './utils/storage.js';
import Exporter from './utils/exportPDF.js';
import Analytics from './utils/analytics.js';
import PriorityManagementTable from './modules/priorityMatrix.js';
import TimeBlocking from './modules/timeBlocking.js';
import MeetingNotes from './modules/meetingNotes.js';

// Initialize Utilities & Modules (Constants)
const storage = new Storage('work-prod-v1');
const analytics = new Analytics(storage);
const exporter = new Exporter();

const priority = new PriorityManagementTable({storage});
const timeBlock = new TimeBlocking({storage});
const meetings = new MeetingNotes({storage});

function showView(id){
  document.querySelectorAll('.view').forEach(v=>{
    v.hidden = true;
    v.setAttribute('aria-hidden','true');
  });
  const el = document.getElementById(id);
  el.hidden = false;
  el.setAttribute('aria-hidden','false');
}

document.getElementById('nav-schedule').addEventListener('click', () => {
  showView('schedule-view');
  document.querySelectorAll('.nav-btn').forEach(b=>b.setAttribute('aria-pressed','false'));
  document.getElementById('nav-schedule').setAttribute('aria-pressed','true');
  analytics.track('nav_schedule');
});

document.getElementById('nav-priority').addEventListener('click', () => {
  showView('priority-view');
  document.querySelectorAll('.nav-btn').forEach(b=>b.setAttribute('aria-pressed','false'));
  document.getElementById('nav-priority').setAttribute('aria-pressed','true');
  analytics.track('nav_priority');
});

document.getElementById('nav-meetings').addEventListener('click', () => {
  showView('meeting-view');
  document.querySelectorAll('.nav-btn').forEach(b=>b.setAttribute('aria-pressed','false'));
  document.getElementById('nav-meetings').setAttribute('aria-pressed','true');
  analytics.track('nav_meetings');
});

document.getElementById('export-btn').addEventListener('click', () => {
  // Export current visible view content
  const visible = document.querySelector('.view:not([hidden])');
  exporter.printElement(visible);
  analytics.track('export_print');
});

// initialize default view
document.getElementById('nav-schedule').setAttribute('aria-pressed','true');
showView('schedule-view');
analytics.track('app_open');
