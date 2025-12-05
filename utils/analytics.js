export default class Analytics {
  constructor(storage){
    this.storage = storage;
    this.key = 'analytics';
    this.state = this.storage.get(this.key) || {events:{}};
  }

  track(eventName){
    this.state.events[eventName] = (this.state.events[eventName] || 0) + 1;
    this.storage.set(this.key, this.state);
  }

  getEvents(){ return this.state.events; }
  reset(){ this.state = {events:{}}; this.storage.set(this.key, this.state); }
}
