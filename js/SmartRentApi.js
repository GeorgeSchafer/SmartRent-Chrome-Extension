
import { user } from './common.js'



export class SmartRentAPI {

    #url;
    #options;

    constructor(){
        this.#url = {
            base: 'https://control.smartrent-qa.com',
            endpoint: null,
            host: 'control.smartrent-qa.com'
        };
        
        this.#options = {
            "method": null,
            "headers": {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJTbWFydFJlbnQiLCJleHAiOjE2Nzk5NDEwNjUsImlhdCI6MTY3OTk0MDE2NSwiaXNzIjoiU21hcnRSZW50IiwianRpIjoiMTY1N2MxNjUtNjQwOC00ZDE5LTk3NzktZDAzOTNkOTcxM2EyIiwibmJmIjoxNjc5OTQwMTY0LCJzdWIiOiJVc2VyOjE4NjE2IiwidHlwIjoiYWNjZXNzIn0._xymzJRIZabw9nLlVLlFtg8JpBZz_gdG0QC3Jb2dqDbDN-XeIMaZQGK-QPEaG1c7ZHoVktIq72hGUDxm-rlgEw`,
                'Content-Length': 'calculated in method',
                'Host': url.#host,
                'Connection': 'keep-alive'
            },
            "body": null
        };        
        
    }

    resetEndpoint(){
        url.#endpoint = null;
    }

    resetOptions() {
        options.method = null;
        options.body = null;
    }

    reset(){
        this.resetEndpoint();
        this.resetOptions();
    }

    deliveryCode(){
        return {code: 121212, type: 'delivery'};
    }

    async session(email, password){

        url.#endpoint = '/api/v1/sessions';

        options.method = 'POST';
        options.body = JSON.stringify({ 
            "email": email, 
            "password": password 
        });

        options.headers['Content-Length'] = options.body.length;

        await fetch(url.#base+url.#endpoint, options)
            .then( (response) => {
                const text = response.text();
                return { body: text, status: response.status}
            } )
            .then( (response) => {
                console.log('response is:' , response);
                const r = JSON.parse(response.body);
                r = r.data;
                r.status = response.status;
                return r;
            } );
        
        this.reset();
    }

    /**
    *  sessionFail(){
    *  @todo created a fail mock {endpoint: response} in Postman
    *  },
    */


    getUnits(){
    /** @todo ready for testing */

        url.#endpoint = '/api/v2/units';

        fetch(url.#base+url.#endpoint)
            .then( (r) => {
                r = r.records.JSON();
                user.units = r;
            });
        
        this.reset();
    }

    getDevices(user_id){
    /**
     * @todo ready for testing
     */
        url.#endpoint = '/api/v3/units/:unit_id/devices';

        fetch(url.#base+url.#endpoint)
            .then( (r) => {
                r = r.json();
                user.devices = r;
            } 
        );

        this.reset();

    }

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




