import { SmartRentAPI as srapi } from './SmartRentApi.js';
import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'

// Functions
const fns = {
  
    load(){
        const srdevices = srapi.getDevices();

        srdevices.forEach( (device) => {
          if(device.type == 'entry_control'){
            const lock = new Lock(device);
            const name = lock.name;

            devices[`${name}`] = lock;
            els[`${name}`] = lock.device_wrapper;
            els.devices.appendChild(els[`${name}`]);
            listeners.push(devices[`${name}`].icon.addEventListener('click', () => {devices[`${name}`].toggle()} ));
          } else if ( device.type == 'binary_switch' ){
            const binary_switch = new Binary_Switch(device);
            const name = binary_switch.name;

            devices[`${name}`] = binary_switch;
            els[`${binary_switch.name}`] = binary_switch.device_wrapper;
            els.devices.appendChild(els[`${binary_switch.name}`]);
            listeners.push(devices[`${name}`].icon.addEventListener('click', () => {devices[`${name}`].toggle()} ));
          }
        } );

        els.delivery = code.delivery.code_wrapper;
        els.devices.appendChild(els.delivery);
    },

    createListeners(element){
      listeners.push(element.icon.addEventListener('click'));
    }
  
};

const els = {
  devices: document.querySelector('.devices'),
  refresh: document.querySelector('header')
};

const devices = {};

const code = {
    delivery: new DeliveryCode()
}

const listeners = [];

if(srapi.logged_in){
  fns.load();
}




// Event Listeners

listeners.push(els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() ));

listeners.push(code.delivery.code_display.addEventListener('click', () => code.delivery.getCode() ));
listeners.push(code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() ));


