export const user = {

    pref: { 
        /** 
         * @todo : add references to preferences from options.js
         * "dark": {type: boolean}
         * 
         */
            dark: true 
    }, 

    profile: {
        /**
         * "email": { "type": "string" },
         * "first_name": { "type": "string" },
         * "id": { "type": "number" },
         * "last_name": { "type": "string" },
         * "mobile_phone": { "type": "string" },
         * "tos_accepted_at": { "type": "string" },
         * "user_needs_to_accept_tos": { "type": "boolean" }*/
    },

    session: {
    /**
        "access_token": {type: string}},
        "expires": {type: number},
        "refresh_token": {type: string},
        "user_id": {type: number} */
    },
    
    units: {
        /** 
         * {} */
    },


    devices: null
        /**
         * @todo : Add listDevices 
         */
 }

export const common = {

    load(){
    
    },
    
    darkMode(){

        els.dark = document.createElement('link');
        els.dark.href = './styles/mode-dark.css';
        els.dark.rel ='stylesheet';
        els.dark.classList.add('dark');
        user.pref.dark = true;

        els.head = document.querySelector('head');
        els.head.appendChild(els.dark);

    },


    updateDark( dark ) {
        user.pref.dark = dark;
        if(!user.pref.dark){
            document.querySelector('.dark')?.remove();
        } else {
            const present = document.querySelector('.dark');

            if (present === null){
                els.dark = document.createElement('link');
                els.dark.href = './styles/mode-dark.css';
                els.dark.rel ='stylesheet';
                els.dark.classList.add('dark');
                els.head = document.querySelector('head');
                els.head.appendChild(els.dark);
            } else {
                return;
            }
        }
    }
}

const els = {};

const listeners = [];

common.load();

// Event Listeners
if( user.pref.dark ){
    listeners.push( document.addEventListener('DOMContentLoaded', common.darkMode()) );
}