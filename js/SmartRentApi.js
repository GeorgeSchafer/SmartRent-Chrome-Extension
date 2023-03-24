
import { common, user } from './common.js'



export const SmartRentAPI = {

    constructor() {
        this.base_url = 'https://d7167c60-a760-4d7d-9fdc-dff440526304.mock.pstmn.io';
        this.endpoint = null;
    },
    
    resetEndpoint(){
        this.endpoint = null;
    },

    deliveryCode(){f
        return {code: 121212, type: 'delivery'};
    },

    session(email, password){

        /** @description: sessions endpoint */
        this.endpoint = '/api/v1/sessions';

        fetch(`${this.base_url}${this.endpoint}`, { body: { email: email, password: password }})
            .then( (r) => {
                r = r.data.JSON();
                user.session = r;
                return r;
            } )
            .then( (r) => {
                // Replace the code here.
                r = r;
            } );
        
        this.resetEndpoint();
    },

    sessionFail(){

        /** @todo created a fail mock {endpoint: response} in Postman */

        /** @description: sessions endpoint */
        const sessions = '/api/v1/sessions';
        const email = 'a@b.d';
        const password = '12345678'

        fetch(`${this.base_url}${sessions}`, { body: { email: email, password: password }})
            .then( (r) => {
                r = r.data.JSON();
                user.session = r;
                return r;
            } )
            .then( (r) => {
                // Replace the code here.
                r = r;
            } );
    },
    
    getUnits(){

        this.endpoint = '/api/v2/units';
    },

    getDevices(unit_id){

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




