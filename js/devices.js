import { SmartRentAPI as srapi } from './SmartRentApi.js';
import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'
import { common, user } from './common.js'



/**
 * @summary fns (functions) object literal stores functions for the sake of 
 * organization.
 * @author George Schafer
 */
const fns = {
  
    /**
     * @function load() is run as soon as the page loads. It seeks out 
     * the devices in the Resident's unit and creates elements to
     * display and allow manipulation. 
     */
    load(){
        
        if( user.devices != null ) {

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
                      els[`${devices[`${name}`].name}`] = binary_switch.device_wrapper;
                      els.devices.appendChild(els[`${devices[`${name}`].name}`]);
                      listeners.push(devices[`${name}`].icon.addEventListener('click', () => {devices[`${name}`].toggle()} ));
                }
            } );

            els.delivery = code.delivery.code_wrapper;
            els.devices.appendChild(els.delivery);

        } else {

          // redirect to options
          els.meta = document.createElement('meta');
          els.meta.httpEquiv = 'Refresh';
          els.meta.content='0; URL=./options.html';
          document.querySelector('head').appendChild(els.meta);

        }
    },

    createListeners(element){
      listeners.push(element.icon.addEventListener('click'));
    }
  
};

/**
 * @description
 * Els is a collection of html elements that can be refered to for 
 * other element functions such as document.createElement().
 */
const els = {
    devices: document.querySelector('.devices'),
    refresh: document.querySelector('header')
};

/**
 * @description
 * devices holds the devices in order to call methods inside devices.
 */
const devices = {};

/**
 * @description
 * code holds the individual codes which are requested from the SR API.
 */
const code = {
    delivery: new DeliveryCode()
}

/**
 * @description
 * listeners stores event listeners so that created listeners can be
 * stored and activated.
 */
const listeners = [];


fns.load();




/**
 * @description
 * Event Listeners are generated last after other elements they 
 * refer to are created. They are stored in the listeners variable above.
 */
listeners.push(els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() ));
listeners.push(code.delivery.code_display.addEventListener('click', () => code.delivery.getCode() ));
listeners.push(code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() ));


