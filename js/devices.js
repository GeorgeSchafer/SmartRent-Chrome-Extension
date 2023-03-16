import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'

// Functions
const fns = {
  
    load(){
      els.devices.appendChild(devices.primary_lock.div_device_wrapper);

      els.devices.appendChild(devices.plug.div_device_wrapper);

      els.delivery = code.delivery.code_wrapper;
      els.devices.appendChild(els.delivery);
    }
  
};

const els = {
  devices: document.querySelector('.devices'),
  refresh: document.querySelector('header')
};

const devices = {
  primary_lock: new Lock({name: 'Front Door', status: true}),
  plug: new Binary_Switch({name: 'Plug', status: false})
};

const code = {
    delivery: new DeliveryCode()
}

fns.load();



// Event Listeners
els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() );

devices.primary_lock.icon.addEventListener( 'click', () => devices.primary_lock.toggle(devices.primary_lock) );
devices.plug.icon.addEventListener( 'click', () => devices.plug.toggle(devices.plug) );

code.delivery.code_display.addEventListener('click', () => code.delivery.getCode() );
code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() )
