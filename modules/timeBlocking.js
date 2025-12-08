// Week Long 24h Calendar UI For Scheduling Blocks

// Changes to make: Add upto 1 Week (_render())

// modules/timeBlocking.js
import Storage from '../utils/storage.js';

export default class TimeBlocking {
  constructor({storage}){
    this.storage = storage || new Storage('work-prod-v1');
    this.key = 'time-blocks';
    this.container = document.getElementById('time-blocking');
    this.state = this.storage.get(this.key) || {blocks: []};
    this._render();
  }

  _render() {
  this.container.innerHTML = '';

  const days = [
    'Monday','Tuesday','Wednesday',
    'Thursday','Friday','Saturday','Sunday'
  ];

  days.forEach((dayName, dayIndex) => {
    // Day header
    const daySection = document.createElement('div');
    daySection.className = 'day-section';

    const dayHeader = document.createElement('h3');
    dayHeader.innerText = dayName;
    daySection.appendChild(dayHeader);

    // 24-hour rows for that day
    for (let hour = 0; hour < 24; hour++) {
      const row = document.createElement('div');
      row.className = 'hour-row';

      const label = document.createElement('div');
      label.className = 'hour-label';
      const displayHour = (hour % 12 === 0 ? 12 : hour % 12) + (hour < 12 ? ' AM' : ' PM');
      label.innerText = displayHour;

      const actions = document.createElement('div');
      actions.className = 'hour-actions';

      // blocks for that day+hour
      const blocks = this.state.blocks.filter(
        b => b.day === dayIndex && b.hour === hour
      );

      blocks.forEach(b => {
        const block = document.createElement('div');
        block.className = 'block';
        block.innerText = `${b.title} (${b.duration || 60}m)`;

        const rm = document.createElement('button');
        rm.innerText = '✕';
        rm.title = 'Remove';
        rm.addEventListener('click', () => this.removeBlock(b.id));

        block.appendChild(rm);
        actions.appendChild(block);
      });

      const btn = document.createElement('button');
      btn.innerText = 'Add';
      btn.addEventListener('click', () => this._promptAdd(dayIndex, hour));

      actions.appendChild(btn);

      row.appendChild(label);
      row.appendChild(actions);

      daySection.appendChild(row);
    }

    this.container.appendChild(daySection);
  });
}


  _promptAdd(day, hour) {
  const title = prompt('Block title (e.g., Deep Work, Meeting):');
  if (!title) return;

  const durationStr = prompt('Duration in minutes (default 60):','60');
  const duration = parseInt(durationStr) || 60;

  this.addBlock({
    id: this._uid(),
    day,
    hour,
    title,
    duration
  });
}


  addBlock(block){
    this.state.blocks.push(block);
    this._saveAndRender();
  }

  removeBlock(id){
    this.state.blocks = this.state.blocks.filter(b=>b.id!==id);
    this._saveAndRender();
  }

  _saveAndRender(){
    this.storage.set(this.key, this.state);
    this._render();
  }

  _uid(){ return 'b-' + Math.random().toString(36).slice(2,9); }
}
