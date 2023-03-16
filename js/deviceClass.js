class Device {
    constructor(obj){
        this.device_id = null;
        this.name = obj.name;
      
        this.device_wrapper = document.createElement("div");
        this.device_wrapper.classList.add('device-wrapper');

        this.device_name = document.createElement('div');
        this.device_name.classList.add('device');

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.svg = document.createElement('img');
        this.svg.classList.add('svg');

        this.device_wrapper.appendChild(this.device_name);
        this.device_wrapper.appendChild(this.icon);
        this.icon.appendChild(this.svg);
    }
}

export class Lock extends Device {
    constructor(obj){
        super(obj);

        this.is_locked = obj.is_locked
 
        if(this.is_locked === null){
            this.svg.src = icon.warning;
          } else if(this.is_locked){
            this.svg.src = icon.is_locked.true;
          } else {
            this.svg.src = icon.is_locked.false;
          }
    
        this.device_name.textContent = this.name;
    }

    toggle(){
      if(this.is_locked === null){
        this.is_locked = true;
        this.svg.src = icon.is_locked.true;
      } else if(this.is_locked){
        this.is_locked = false;
        this.svg.src = icon.is_locked.false;
      } else {
        this.is_locked = true;
        this.svg.src = icon.is_locked.true;
      }
    }
}

export class Binary_Switch extends Device {
    constructor(obj){
        super(obj);

        this.is_on = obj.is_on;

        if(this.is_on === null){
            this.svg.src = icon.unknown;
          } else if(this.is_on){
            this.svg.src = icon.is_on.true;
          } else {
            this.svg.src = icon.is_on.false;
          }    

        this.device_name.textContent = this.name;
    }

    toggle(){
      if(this.is_on === null){
        this.is_on = false;
        this.svg.src = icon.is_on.false;
      } else if(this.is_on){
        this.is_on = false;
        this.svg.src = icon.is_on.false;
      } else {
        this.is_on = true;
        this.svg.src = icon.is_on.true;
      }
    }
}


const icon = {
    is_locked: {
        true: './images/on.svg',
        false: './images/open.svg'
    },
    is_on: {
        true: './images/on.svg',
        false: './images/off.svg'
    },
    refresh: './images/refresh.svg',
    smartrent: './images/smartrent.png',
    unknown: './images/unknown.svg',
    warning: './images/warning.svg'
};

