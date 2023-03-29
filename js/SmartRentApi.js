
import { user } from './common.js'

// resetting user.session to start from the beginning
// user.session = {};
// user.session.Authorization = 'Bearer ';

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
            'method': null,
            'headers': {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer `,
                'Content-Length': 'calculated in method',
                'Host': this.#url.host,
                'Connection': 'keep-alive'
            },
            'body': null
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

        const body = JSON.stringify({ 
            'email': email, 
            'password': password 
        });

        this.#setupRequest('/api/v1/sessions','POST', body);

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
        await this.getUnits();
        await this.#storeUser();

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

        this.#reset();
    }


    async getUnits(){
    /** @todo finishing */

        this.#setupRequest('/api/v2/units', 'GET', null);

        await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( (response) => {
                        user.units = response.records
                    } );
            });

        this.#storeUser();
            
        this.#reset();
    }

    getDevices(unit_id){
    /**
     * @todo finish
     */
        this.#url.endpoint = `/api/v3/units/${unit_id}/devices`;

        fetch(this.#url.base+this.#url.endpoint)
            .then( (r) => {
                r = r.json();
                user.devices = r.records;
            }
        );

        this.#storeUser();

        this.#reset();

    }

    async #storeUser(){

        await chrome.storage.session.set({ 'user': user })  
            .then( () => {
                console.log('user data stored:', user);
            } );
    }

    async loadUser(){
    /** @todo write this */
        chrome.storage.session.get(["user"]).then((result) => {
            // result = result.user;
            console.log('result is:', result)
            user.pref = result.pref;
            user.session = result.session;
            user.profile = result.profile;
            user.units = result.units;
        });
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
                    type: 'entry_control',
                    is_locked: false,
                    name: 'Front Door'
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
                    type: 'entry_control',
                    is_locked: false,
                    name: 'Bedroom'
                }
            ];  

        } else {
            return [
                {
                    type: 'entry_control',
                    is_locked: true,
                    name: 'Front Door'
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
                    type: 'entry_control',
                    is_locked: true,
                    name: 'Bedroom'
                }
            ];    
        }

    }

}




