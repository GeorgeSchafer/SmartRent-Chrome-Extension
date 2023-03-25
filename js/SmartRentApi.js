
import { user } from './common.js'



const url = {

    https: 'https://',
    base: 'control.smartrent-qa.com',
    endpoint: null

};

const options = {

    "method": 200,
    "headers": {
        'Content-Type': 'application/json',
        'Content-Length': null,
        'Host': url.base,
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Authorization': user.session.access_token
    },
    "body": null
    
};

export const SmartRentAPI = {
    
    resetEndpoint(){
        url.endpoint = null;
    },

    deliveryCode(){f
        return {code: 121212, type: 'delivery'};
    },

    async session(email, password){

        url.endpoint = '/api/v1/sessions';

        options.body = { 
            "email": email, 
            "password": password 
        };

        options.headers['Content-Length'] = JSON.stringify(options.body).length;

        await fetch(`${url.https}${url.base}${url.endpoint}`, options)
            .then( (response) => {
                // response = response.JSON();
                console.log('Response:', response);
                const r = response.data;/** data is already in json, remove comment when going live *///.json();
                r.status = response.status;
                user.session = r;
            } );
        
        this.resetEndpoint();
    },
    sessionFail(){

        /** @todo created a fail mock {endpoint: response} in Postman */

        const sessions = '/api/v1/sessions';
        const email = 'a@b.d';
        const password = '12345678'

        fetch(url.base+sessions, `{ method: POST, headers: ${headers}, body: { email: email, password: password }}`)
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
        url.endpoint = '/api/v3/units/:unit_id/devices';

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




