
import { common, user } from './common.js'



const url = {

    base: 'https://d7167c60-a760-4d7d-9fdc-dff440526304.mock.pstmn.io',
    endpoint: null

};

export const SmartRentAPI = {
    
    resetEndpoint(){
        url.endpoint = null;
    },

    deliveryCode(){f
        return {code: 121212, type: 'delivery'};
    },

    session(email, password){

        url.endpoint = '/api/v1/sessions';

        fetch(`${url.base}${url.endpoint}`, { body: { email: email, password: password }})
            .then( (r) => {
                r = r.data.JSON();
                user.session = r;
                return r;
            } );
        
        this.resetEndpoint();
    },

    sessionFail(){

        /** @todo created a fail mock {endpoint: response} in Postman */

        const sessions = '/api/v1/sessions';
        const email = 'a@b.d';
        const password = '12345678'

        fetch(url.base+sessions, { body: { email: email, password: password }})
            .then( (r) => {
                r = r.data.JSON();
                user.session = r;
                return r;
            } 
        );
    },
    
    getUnits(){
    /** @todo ready for testing */

        url.endpoint = '/api/v2/units';

        fetch(url.base+url.endpoint)
            .then( (r) => {
                r = r.records.JSON();
                user.units = r;
            });
        
        this.resetEndpoint();
    },

    getDevices(user_id){
    /**
     * @todo ready for testing
     */
        url.endpoint = '';

        fetch(url.base+url.endpoint)
            .then( (r) => {
                r = r.json();
                user.devices = r;
            } 
        );

        this.resetEndpoint();

    },

    getDemoDevices(){

        const r = Math.floor( Math.random() * 2 );
        let toggled;

        r === 0
            ? toggled = false
            : toggled = true;

        if (toggled){
            return [
                {
                    type: "entry_control",
                    is_locked: false,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: true,
                    name: 'Plug'
                },
                {
                    type: 'binary_switch',
                    is_on: true,
                    name: 'Kitchen'
                },
                {
                    type: "entry_control",
                    is_locked: false,
                    name: "Bedroom"
                }
            ];  

        } else {
            return [
                {
                    type: "entry_control",
                    is_locked: true,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: false,
                    name: 'Plug'
                },
                {
                    type: 'binary_switch',
                    is_on: false,
                    name: 'Kitchen'
                },
                {
                    type: "entry_control",
                    is_locked: true,
                    name: "Bedroom"
                }
            ];    
        }

    }

}




