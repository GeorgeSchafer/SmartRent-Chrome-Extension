
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

    #updateOptions(endpoint, method, bodyObj){
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

        this.#updateOptions('/api/v1/sessions','POST', body);

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
        await this.loadUser();

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
        this.#updateOptions('/api/v1/users/me','GET', null);

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

        this.#updateOptions('/api/v2/units', 'GET', null);

        await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( (response) => {
                        user.units = response.records
                    } );
            });
            
        this.#reset();
    }

    async getDevices(unit_id){
    /**
     * @todo finish
     */

        this.#updateOptions(`/api/v3/units/${unit_id}/devices`, 'GET', null);

        await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( (r) => {
                r = r.json();
                r = r.records;
                user.devices = r;
            }
        );

        await this.#storeUser();

        this.#reset();

    }

    async #storeUser(){

        await chrome.storage.local.set({ 'user': user })  
            // .then( () => {
            //     console.log('user data stored:', user);
            // } )
            .catch(err => alert(err));

    }

    async loadUser(){
    /** @todo write this */
    // await chrome.storage.local.get(["key"]).then((result) => {
    //      console.log("Value currently is " + result.key);
    // }); // from Chrome documentation -- yay it is working finally~

        const result = await chrome.storage.local.get(["user"]).
            then((result) => {
                return result.user;
                // user.pref = result.pref;
                // user.session = result.session;
                // user.profile = result.profile;
                // user.units = result.units;
                // user.devices = result.devices;
            })
            .catch(err => {alert(err)});

        return result;
    }

    // getDemoDevices(){ // used for pre-api hookup

    //     const r = Math.floor( Math.random() * 2 );
    //     let toggled;

    //     r === 0
    //         ? toggled = false
    //         : toggled = true;

    //     if (toggled){
    //         return [
    //             {
    //                 type: 'entry_control',
    //                 is_locked: false,
    //                 name: 'Front Door'
    //             },
    //             {
    //                 type: 'binary_switch',
    //                 is_on: true,
    //                 name: 'Plug'
    //             },
    //             {
    //                 type: 'binary_switch',
    //                 is_on: true,
    //                 name: 'Kitchen'
    //             },
    //             {
    //                 type: 'entry_control',
    //                 is_locked: false,
    //                 name: 'Bedroom'
    //             }
    //         ];  
    //     } else {
    //         return [
    //             {
    //                 type: 'entry_control',
    //                 is_locked: true,
    //                 name: 'Front Door'
    //             },
    //             {
    //                 type: 'binary_switch',
    //                 is_on: false,
    //                 name: 'Plug'
    //             },
    //             {
    //                 type: 'binary_switch',
    //                 is_on: false,
    //                 name: 'Kitchen'
    //             },
    //             {
    //                 type: 'entry_control',
    //                 is_locked: true,
    //                 name: 'Bedroom'
    //             }
    //         ];    
    //     }
    // }

}




