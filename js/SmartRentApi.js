
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
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJTbWFydFJlbnQiLCJleHAiOjE2Nzk5NDExNDEsImlhdCI6MTY3OTk0MDI0MSwiaXNzIjoiU21hcnRSZW50IiwianRpIjoiZDgyNzRlMmYtYjRiMy00OTczLThjOWYtMGRlNDM2OGYxYThlIiwibmJmIjoxNjc5OTQwMjQwLCJzdWIiOiJVc2VyOjE4NjE2IiwidHlwIjoiYWNjZXNzIn0.v1svkzH4iAFaP1iRHonuqp6_JUI9GTvH8hp4qfBs7-5uW5Ijf19l9cPeRYyvnw9P2LDvAh2Nu5xkBGGDNMX5mA`,
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

    #updateOptions(endpoint, method, bodyStr){
        this.#url.endpoint = endpoint;
        this.#options.method = method;

        if(user.session.access_token != null){
            this.#options.headers.Authorization = `Bearer ${user.session.access_token}`;
        }

        if (bodyStr == null) {
            delete this.#options.body;
            this.#options.headers['Content-Length'] = 0;
        } else if( typeof(bodyStr) == 'string' ){
            this.#options.body = bodyStr;
            this.#options.headers['Content-Length'] = bodyStr.length;
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
                    .then( (data) => {
                        user.units = data.records;
        
                        this.#storeUser();
                    } );
            });
            
        this.#reset();
    }

    async getDevices(unit_id){
    /**
     * @todo finish
     */
        const loadedUser = this.loadUser();

        this.#updateOptions(`/api/v3/units/${unit_id}/devices`, 'GET', null);

        const devices = await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( (response) => {
                const devices = response.json()
                    .then( (data) => {
                        user.devices = data.records;
                        return data.records
                    } );
                return devices;
            });

        user.devices = devices;


        this.#storeUser();
        this.#reset();
    }

    async #storeUser(){

        await chrome.storage.local.set({ 'user': user })  
            // add logic here.
            // .then( () => {
            //     console.log('user data stored:', user);
            // } )
            .catch(err => alert(err));

    }

    async nullStoredUser(){
        await chrome.storage.local.set({ 'user': null })  
        // add logic here.
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

        const loadedUser = await chrome.storage.local.get(["user"]).
            then((storedUser) => {
                return storedUser.user;
            })
            .catch(err => {alert(err)});
        
        return loadedUser;
    }



    deliveryCode(){
        return {code: 121212, type: 'delivery'};
    }

    async fetchDeliveryCode(unit_id){
        
        this.#updateOptions(`/api/v2/units/${unit_id}/building-access-codes`, 'GET', null);

        await fetch(this.#url.base+this.#url.endpoint, this.#options)
            .then( async (response) => {
                await response.json()
                    .then( (response) => {
                        user.code.delivery = response;
                    } );
            });
//  space

        this.#storeUser();

        this.#reset();

        console.log('delivery code:', user.code.delivery)

    }

}




