import { SmartRentAPI } from './SmartRentApi.js';
import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch}  from './deviceClass.js'
import { user } from './common.js'


const srapi = new SmartRentAPI();


const fns = {
/**
 * @summary fns (functions) object literal stores functions for the sake of 
 * organization.
 * @author George Schafer
 */

    async load(){
    /**
     * @function load() is run as soon as the page loads. It seeks out 
     * the devices in the Resident's unit and creates elements to
     * display and allow manipulation. 
     */

    
        const loadedUser = await srapi.loadUser();
        user.pref = loadedUser.pref;
        user.session = loadedUser.session;
        user.profile = loadedUser.profile;
        user.units = loadedUser.units;
        user.devices = [];

        if( user.units?.length != 0 ) {

            this.createUnitPicker();

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

    createDeviceListeners(element){
        listeners.push(element.icon.addEventListener('click'));
    },



    createUnitPicker(){
    /**
     * @todo 
     *  Write fns.createUnitPicker()
     *      Should be an input.type="select".
     *      After selecting the unit, the unit devices should be saved to common.js > user.devices
     */
    
        els.unitPicker = document.createElement('select');
        els.unitPicker.classList.add('selector');
        fns.createOption('', 'Select a unit' );
        user.units.forEach( unit => {
            const option = fns.createOption(unit.id, `${unit.marketing_name}, ${unit.group.marketing_name}`);
        } );
        els.devices.appendChild(els.unitPicker);
        listeners.push(els.unitPicker.addEventListener('change', () => { this.loadUnitDevices(els.unitPicker.value) }));

    },
    
    createOption(value, text){
        const option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        els.unitPicker.appendChild(option);
    },

    async loadUnitDevices(unit_id){
        
        const devices = await srapi.getDevices(unit_id);

        user.devices = devices;

        console.log('This unit has these devices:', user.devices)

        user.devices.forEach( (device) => {
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
    }
  
};

/**
 * @description
 * Els is a collection of html elements that can be refered to for 
 * other element functions such as document.createElement().
 */
const els = {
    devices: document.querySelector('.devices'),
    refresh: document.querySelector('header'),
    unitPicker: null,
    meta: null

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


