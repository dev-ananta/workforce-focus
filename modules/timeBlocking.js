// 24h Calender UI For Scheduling Blocks

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

  _render(){
    this.container.innerHTML = '';
    // create 24-hour rows
    for(let hour=0; hour<24; hour++){
      const row = document.createElement('div');
      row.className = 'hour-row';
      const label = document.createElement('div');
      label.className = 'hour-label';
      const displayHour = (hour%12===0?12:hour%12) + (hour<12 ? ' AM' : ' PM');
      label.innerText = displayHour;
      const actions = document.createElement('div');
      actions.className = 'hour-actions';
      // show blocks for this hour
      const blocksForHour = this.state.blocks.filter(b=>b.hour===hour);
      blocksForHour.forEach(b=>{
        const block = document.createElement('div');
        block.className='block';
        block.innerText = `${b.title} (${b.duration || 60}m)`;
        const rm = document.createElement('button'); rm.innerText='✕'; rm.title='Remove';
        rm.addEventListener('click', ()=>this.removeBlock(b.id));
        block.appendChild(rm);
        actions.appendChild(block);
      });

      // add block button
      const btn = document.createElement('button');
      btn.innerText = 'Add';
      btn.addEventListener('click', ()=>this._promptAdd(hour));
      actions.appendChild(btn);

      row.appendChild(label);
      row.appendChild(actions);
      this.container.appendChild(row);
    }
  }

  _promptAdd(hour){
    const title = prompt('Block title (e.g., Deep Work, Meeting):');
    if(!title) return;
    const durationStr = prompt('Duration in minutes (default 60):','60');
    const duration = parseInt(durationStr) || 60;
    this.addBlock({id:this._uid(), hour, title, duration});
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
