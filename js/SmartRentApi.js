
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
                'Host': this.#url.host,
                'Connection': 'keep-alive'
            },
            "body": null
        };        
        
    }

    #resetEndpoint(){
        this.#url.endpoint = null;
    }

    #resetOptions() {
        this.#options.method = null;
        this.#options.body = null;
    }

    #reset(){
        this.#resetEndpoint();
        this.#resetOptions();
    }

    deliveryCode(){
        return {code: 121212, type: 'delivery'};
    }

    #setupRequest(endpoint, method, bodyObj){
        this.#url.endpoint = endpoint;
        this.#options.method = method;
        this.#options.Authorization = `Bearer ${user.session.access_token}`;

        if (bodyObj == null) {
            delete this.#options.body;
        } else if( typeof(bodyObj) == 'string' ){
            this.#options.body = bodyObj;
        } else {
            throw new Error('Invalid Argument Exception:\n' +
                            'body must be an string or null');
        }
    }

    async session(email, password){

        const body = { 
            "email": email, 
            "password": password 
        };

        this.#setupRequest('/api/v1/sessions','POST', JSON.stringify(body));

        this.#options.headers['Content-Length'] = this.#options.body.length;

        const result = await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( async (body) => {
                        user.session = await body.data;
                        this.#options.headers.Authorization = `Bearer ${body.data.access_token}`;
                    } );

                return response.status ;
            } );
        
        await this.#getProfile();
        this.#reset();

        return result;
    }

    /**
    *  sessionFail(){
    *  @todo created a fail mock {endpoint: response} in Postman
    *  },
    */

    async #getProfile(){ // has to be called within session
    /**
     * @todo finish
     */
        this.#setupRequest('/api/v1/users/me','GET', null);

        await fetch(this.#url.base + this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( async (body) => {
                        body = await body;
                        user.profile = body;
                    } )
            } );

    }


    async getUnits(){
    /** @todo finish */

        this.#setupRequest('/api/v2/units', 'GET', null);

        await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( (response) => {
                        console.log(response);
                        user.units = response.records
                    } );
            });
        
        this.reset();
    }

    getDevices(user_id){
    /**
     * @todo finish
     */
        this.#url.endpoint = '/api/v3/units/:unit_id/devices';

        fetch(this.#url.base+this.#url.endpoint)
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




