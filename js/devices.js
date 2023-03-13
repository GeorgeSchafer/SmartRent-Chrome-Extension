import { DeliveryCode, DeliveryMenu } from './codeClass.js';
import {Lock,Binary_Switch} from './deviceClass.js'
import { SmartRentAPI as srapi } from './SmartRentApi.js';

// Functions
const fns = {
  
    load(){
        const primary_lock = new Lock({name: 'Front Door', status: true});
        devices.primary_lock = primary_lock;
        els.wrapper.appendChild(devices.primary_lock.div_device_wrapper);

        const plug = new Binary_Switch({name: 'Plug', status: false});
        devices.plug = plug;
        els.wrapper.appendChild(devices.plug.div_device_wrapper);

        const delivery = new DeliveryMenu();
        els.delivery = delivery.code_wrapper;
        els.wrapper.appendChild(els.delivery);
    },

    getDeliveryCode(){
        const r = srapi.deliveryCode();
        const delivery = new DeliveryCode(r);
        code.delivery = delivery;
        els.delivery.remove(); 
        els.delivery = delivery.code_wrapper;
        els.wrapper.appendChild(els.delivery);
    }
  
};

const els = {
  wrapper: document.querySelector('.wrapper'),
  refresh: document.querySelector('header')
  /* 
  delivery: document.querySelector('.code-wrapper');
  */
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
devices.primary_lock.div_device_wrapper.querySelector('.icon').addEventListener( 'click', () => devices.primary_lock.toggle(devices.primary_lock) );
devices.plug.div_device_wrapper.querySelector('.icon').addEventListener( 'click', () => devices.plug.toggle(devices.plug) );
els.delivery.addEventListener('click', () => fns.getDeliveryCode() );

// This is not firing because the div.svg is being replaced.
els.delivery.querySelector('.icon').addEventListener( 'click', () => code.delivery.copy() )


