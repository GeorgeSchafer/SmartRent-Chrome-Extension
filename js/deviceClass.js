class Device {
    constructor(obj){
        this.status = obj.status;
        this.device_id = null;
        this.name = obj.name;
      
        this.div_device_wrapper = document.createElement("div");
        this.div_device_wrapper.classList.add('device-wrapper');

        this.div_name = document.createElement('div');
        this.div_name.classList.add('device');

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.svg = document.createElement('img');
        this.svg.classList.add('svg');

        this.div_device_wrapper.appendChild(this.div_name);
        this.div_device_wrapper.appendChild(this.icon);
        this.icon.appendChild(this.svg);
    }
}

export class Lock extends Device {
    constructor(obj){
        super(obj);

        if(this.status === null){
            this.svg.src = icon.warning;
          } else if(this.status){
            this.svg.src = icon.is_locked.true;
          } else {
            this.svg.src = icon.is_locked.false;
          }
    
        this.div_name.textContent = this.name;
    }

    toggle(){
      if(this.status === null){
        this.status = true;
        this.svg.src = icon.is_locked.true;
      } else if(this.status){
        this.status = false;
        this.svg.src = icon.is_locked.false;
      } else {
        this.status = true;
        this.svg.src = icon.is_locked.true;
      }
    }
}

export class Binary_Switch extends Device {
    constructor(obj){
        super(obj);

        if(this.status === null){
            this.svg.src = icon.unknown;
          } else if(this.status){
            this.svg.src = icon.is_on.true;
          } else {
            this.svg.src = icon.is_on.false;
          }    

        this.div_name.textContent = this.name;
    }

    toggle(){
      if(this.status === null){
        this.status = false;
        this.svg.src = icon.is_on.false;
      } else if(this.status){
        this.status = false;
        this.svg.src = icon.is_on.false;
      } else {
        this.status = true;
        this.svg.src = icon.is_on.true;
      }
    }
}


const icon = {
    is_locked: {
        true: '../images/on.svg',
        false: '../images/open.svg'
    },
    is_on: {
        true: '../images/on.svg',
        false: '../images/off.svg'
    },
    refresh: '../images/refresh.svg',
    smartrent: '../images/smartrent.png',
    unknown: '../images/unknown.svg',
    warning: '../images/warning.svg'
};

