// Eisenhower matrix (Urgent/Not Urgent, Important/Not Important)

// modules/priorityMatrix.js
import Storage from '../utils/storage.js';

export default class PriorityMatrix {
  constructor({storage}){
    this.storage = storage || new Storage('work-prod-v1');
    this.key = 'priority-matrix';
    this.container = document.getElementById('priority-matrix');
    this.quads = [
      {id:'urgent-important', title:'Urgent & Important'},
      {id:'noturgent-important', title:'Not Urgent, Important'},
      {id:'urgent-notimportant', title:'Urgent, Not Important'},
      {id:'noturgent-notimportant', title:'Not Urgent, Not Important'}
    ];
    this.state = this.storage.get(this.key) || {tasks: []};
    this._render();
  }

  _render(){
    this.container.innerHTML = '';
    // build matrix
    this.quads.forEach(q=>{
      const el = document.createElement('div');
      el.className = 'quadrant';
      el.id = q.id;
      el.innerHTML = `<h3>${q.title}</h3><div class="task-list" data-id="${q.id}"></div>
        <div style="margin-top:8px">
          <input placeholder="Add task..." class="task-input" data-target="${q.id}" />
          <button class="add-task" data-target="${q.id}">Add</button>
        </div>`;
      // dragover/drop
      el.addEventListener('dragover', e=>e.preventDefault());
      el.addEventListener('drop', (e)=>this._onDrop(e,q.id));
      this.container.appendChild(el);
    });

    // render tasks
    this._syncRender();

    // wire add buttons & inputs
    this.container.querySelectorAll('.add-task').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const target = e.currentTarget.dataset.target;
        const input = this.container.querySelector(`.task-input[data-target="${target}"]`);
        const text = input.value.trim();
        if(!text) return;
        this.addTask({id:this._uid(), title:text, quadrant:target});
        input.value = '';
      });
    });
  }

  _syncRender(){
    this.quads.forEach(q=>{
      const list = this.container.querySelector(`#${q.id} .task-list`);
      list.innerHTML = '';
      const tasks = this.state.tasks.filter(t=>t.quadrant === q.id);
      tasks.forEach(t=>{
        const item = document.createElement('div');
        item.className = 'task';
        item.draggable = true;
        item.dataset.taskId = t.id;
        item.innerText = t.title;
        item.addEventListener('dragstart', e=>{
          e.dataTransfer.setData('text/plain', t.id);
        });
        const rm = document.createElement('button');
        rm.innerText = '✕';
        rm.title = 'Remove';
        rm.style.marginLeft = '8px';
        rm.addEventListener('click', ()=>this.removeTask(t.id));
        item.appendChild(rm);
        list.appendChild(item);
      });
    });
    this.storage.set(this.key, this.state);
  }

  _onDrop(e, quadrantId){
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const t = this.state.tasks.find(x=>x.id===id);
    if(!t) return;
    t.quadrant = quadrantId;
    this._syncRender();
  }

  addTask(task){
    this.state.tasks.push(task);
    this._syncRender();
  }

  removeTask(id){
    this.state.tasks = this.state.tasks.filter(t=>t.id!==id);
    this._syncRender();
  }

  _uid(){
    return 't-' + Math.random().toString(36).slice(2,9);
  }
}
