import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'

// Functions
const fns = {
  
    load(){
        devices.primary_lock = new Lock({name: 'Front Door', status: true});
        els.wrapper.appendChild(devices.primary_lock.div_device_wrapper);

        devices.plug = new Binary_Switch({name: 'Plug', status: false});
        els.wrapper.appendChild(devices.plug.div_device_wrapper);

        code.delivery = new DeliveryCode();
        els.delivery = code.delivery.code_wrapper;
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
