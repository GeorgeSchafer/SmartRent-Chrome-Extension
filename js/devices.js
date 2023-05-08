/**
 * @author George Schafer
 */
import { SmartRentAPI } from './SmartRentApi.js';
import { DeliveryCode } from './codeClass.js';
import { Lock, Binary_Switch }  from './deviceClass.js'
import { user } from './common.js'

const srapi = new SmartRentAPI();

/**
 * @description
 * Els is a collection of html elements that can be refered to for 
 * other element functions such as document.createElement().
 */
const els = {
    devices: document.querySelector('.devices'),
    refresh: document.querySelector('header'),
    unitPicker: null,
    unit_id: null,
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
};

/**
 * @description
 * listeners stores event listeners so that created listeners can be
 * stored and activated.
 */
const listeners = [
    /**
     * @summary These are event listeners which are created in the body of the code above.
     * 
     * els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() ),
     * code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() ),
     * code.delivery.code_display.addEventListener('click', () => fns.getDeliveryCode() )
     */
];

/**
 * @todo Write a function that determines if the user is logged out.
 */
const fns = {
/**
 * @summary fns (functions) object literal stores functions for the sake of 
 * organization.
 */

    async load(){
    /**
     * @function load() is run as soon as the page loads. It seeks out 
     * the devices in the Resident's unit and creates elements to
     * display and allow manipulation. 
     */

        // await this.nullUserValues(); // For testing purposes, remove when testing is done.

        await this.updateUser();

        if(     user.units?.length != 0          &&
                typeof user.units != 'undefined' &&
                user.units != null                  ) {

            this.createUnitPicker();

        } else {

         // redirect to options
            els.meta = document.createElement('meta');
            els.meta.httpEquiv = 'Refresh';
            els.meta.content='0; URL=./options.html';
            document.querySelector('head').appendChild(els.meta);

        }
    },

    async nullUserValues(){
    /**
     * @summary nullUserValues() assigns null to properties inside the user object
     * The aim is to test the case of a brand new user.
     * This is for TESTING purposes only.
     */
        user.pref = null;
        user.session = null;
        user.profile = null;
        user.units = null;
        user.devices = [];
        await srapi.nullStoredUser();
    },
    
    async updateUser(){
        const loadedUser = await srapi.loadUser();

        if(     
                loadedUser != undefined &&
                loadedUser.session != null &&
                loadedUser.session != undefined && 
                user.session != null                ){
            user.pref = loadedUser.pref;
            user.session = loadedUser.session;
            user.profile = loadedUser.profile;
            user.units = loadedUser.units;
            user.code = loadedUser.code;
            user.devices = [];
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
        els.unitPickerInstruction = fns.createOption('', 'Select a unit' );
        user.units?.forEach( unit => {
            const option = fns.createOption(unit.id, `${unit.marketing_name}, ${unit.group.marketing_name}`);
        } );
        els.devices.appendChild(els.unitPicker);
        listeners.push(els.unitPicker.addEventListener('change', () => { this.selectUnit() }));

    },
    
    createOption(value, text){
        const option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        els.unitPicker.appendChild(option);
        return option;
    },

    selectUnit(){

        els.unitPickerInstruction?.remove();
        this.loadUnitDevices(els.unitPicker.value);

        els.delivery = code.delivery.code_wrapper;
        listeners.push(code.delivery.code_display.addEventListener('click', () => fns.getDeliveryCode() ));
        els.devices.appendChild(els.delivery);
        
    },

    async loadUnitDevices(unit_id){

        await srapi.getDevices(unit_id);
        /**
         * @todo  Possibly an uneeded step, verify.  */
        await srapi.loadUser();

        document.querySelectorAll('.device-wrapper > div').forEach( device => {device.remove()})

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
    },

    async getDeliveryCode(){
    /**
     * Implement check for expired delivery codes
     */
        await srapi.fetchDeliveryCode(els.unitPicker.value);
        await fns.updateUser();
        console.log('user.code.delivery.code:', user.code.delivery.code);
        code.delivery.code_display.textContent = user.code.delivery.code;
        // els.delivery.querySelector('.code').textContent = user.code.delivery.code;
    }

};

fns.load();



/**
 * @description
 * Event Listeners are generated last after other elements they 
 * refer to are created. They are stored in the listeners variable above.
 */
listeners.push(els.refresh.querySelector('.icon').addEventListener('click', () => location.reload() ));
listeners.push(code.delivery.icon.addEventListener( 'click', () => code.delivery.copy() ));


