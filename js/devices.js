import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'

// Functions
const fns = {
  
    load(){
        const primary_lock = new Lock({name: 'Front Door', status: true});
        devices.primary_lock = primary_lock;
        els.wrapper.appendChild(devices.primary_lock.div_device_wrapper);

        const plug = new Binary_Switch({name: 'Plug', status: false});
        devices.plug = plug;
        els.wrapper.appendChild(devices.plug.div_device_wrapper);

        const delivery = new DeliveryCode();
        code.delivery = delivery;
        els.delivery = delivery.code_wrapper;
        els.wrapper.appendChild(els.delivery);
    }
  
};

const els = {
  wrapper: document.querySelector('.wrapper'),
  refresh: document.querySelector('header')
};

const devices = {
  primary_lock: null,
  plug: null
};

const code = {
    delivery: null
}

fns.load();



// Event Listeners
els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() );

devices.primary_lock.icon.addEventListener( 'click', () => devices.primary_lock.toggle(devices.primary_lock) );
devices.plug.icon.addEventListener( 'click', () => devices.plug.toggle(devices.plug) );

code.delivery.code_display.addEventListener('click', () => code.delivery.getCode() );
code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() )



