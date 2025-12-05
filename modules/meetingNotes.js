// Store Meeting Logs

// modules/meetingNotes.js
import Storage from '../utils/storage.js';

export default class MeetingNotes {
  constructor({storage}){
    this.storage = storage || new Storage('work-prod-v1');
    this.key = 'meeting-notes';
    this.form = document.getElementById('meeting-form');
    this.list = document.getElementById('meeting-list');
    this.state = this.storage.get(this.key) || {notes: []};
    this._wire();
    this._render();
  }

  _wire(){
    this.form.addEventListener('submit', e=>{
      e.preventDefault();
      const title = document.getElementById('meeting-title').value.trim();
      const tags = document.getElementById('meeting-tags').value.split(',').map(s=>s.trim()).filter(Boolean);
      const body = document.getElementById('meeting-body').value.trim();
      if(!title || !body) return;
      this.addNote({id:this._uid(), title, tags, body, created:Date.now()});
      this.form.reset();
    });
  }

  addNote(note){
    this.state.notes.unshift(note);
    this._saveAndRender();
  }

  removeNote(id){
    this.state.notes = this.state.notes.filter(n=>n.id!==id);
    this._saveAndRender();
  }

  _render(){
    this.list.innerHTML = '';
    this.state.notes.forEach(n=>{
      const el = document.createElement('div');
      el.className = 'note';
      el.innerHTML = `<strong>${n.title}</strong> <small>${new Date(n.created).toLocaleString()}</small>
        <div class="tags">${n.tags.map(t=>`<span>#${t}</span>`).join(' ')}</div>
        <p>${this._escape(n.body)}</p>`;
      const rm = document.createElement('button'); rm.innerText='Delete'; rm.addEventListener('click', ()=>this.removeNote(n.id));
      el.appendChild(rm);
      this.list.appendChild(el);
    });
    this.storage.set(this.key, this.state);
  }

  _saveAndRender(){ this.storage.set(this.key, this.state); this._render(); }
  _uid(){ return 'm-' + Math.random().toString(36).slice(2,9); }
  _escape(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>'); }
}
