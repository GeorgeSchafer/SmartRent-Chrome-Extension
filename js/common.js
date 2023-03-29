export const user = {

    pref: { 
        /** 
         * @todo : add references to preferences from options.js
         * 
         */
            dark: true 
    }, 

    profile: {
        email: null,
        first_name: null,
        id: null,
        last_name: null,
        mobile_phone: null,
        tos_accepted_at: null,
        user_needs_to_accept_tos: null
    },

    session: {
        access_token: null,
        expires: null,
        refresh_token: null,
        user_id: null
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