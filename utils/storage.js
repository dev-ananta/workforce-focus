export default class Storage {
  constructor(namespace = 'app'){
    this.ns = namespace;
    this._prefix = `${this.ns}::`;
  }

  set(key, value){
    try{
      localStorage.setItem(this._prefix + key, JSON.stringify(value));
    }catch(e){
      console.warn('Storage set failed', e);
    }
  }

  get(key){
    try{
      const raw = localStorage.getItem(this._prefix + key);
      return raw ? JSON.parse(raw) : null;
    }catch(e){
      console.warn('Storage get failed', e);
      return null;
    }
  }

  remove(key){
    localStorage.removeItem(this._prefix + key);
  }

  clearAll(){
    // only clear keys under this namespace
    Object.keys(localStorage).forEach(k=>{
      if(k.startsWith(this._prefix)) localStorage.removeItem(k);
    });
  }
}
