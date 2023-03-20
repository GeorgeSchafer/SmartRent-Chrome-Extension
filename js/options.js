import { SmartRentAPI as srapi } from './SmartRentApi.js';
import { fn } from './common.js'

const fns = {
    load(){

        els.login = document.createElement('form');
        els.login.id = 'login';

        els.email = document.createElement('label');
        els.email.appendChild(document.createElement('input'));
        els.email.querySelector('input').type = 'email';
        els.email.querySelector('input').placeholder = 'eMail';
        els.email.querySelector('input').required = true;
        els.login.appendChild(els.email);

        els.password = document.createElement('label');
        els.password.appendChild(document.createElement('input'));
        els.password.querySelector('input').type = 'password';
        els.password.querySelector('input').placeholder = 'Password';
        els.password.querySelector('input').required = true;
        els.login.appendChild(els.password);

        els.loginbtn = document.createElement('button');
        els.loginbtn.id = 'loginbtn';
        els.loginbtn.textContent = 'Login';
        els.login.appendChild(els.loginbtn);

        els.ui_options = document.createElement('form');
        els.ui_options.id = 'ui_options';
        els.ui_options.appendChild(document.createElement('label'));

        els.dark_preference = document.createElement('input');
        els.dark_preference.type = 'checkbox';
        els.dark_preference.id = 'dark-preference';
        els.dark_preference.checked = true;
        els.ui_options.querySelector('label').appendChild(els.dark_preference);
        els.ui_options.querySelector('label').appendChild(document.createTextNode('Dark Mode'));

        els.save = document.createElement('div');
        els.save.classList.add('btn')
        els.save.id = 'save';
        els.save.textContent = 'Save';
        els.ui_options.appendChild(els.save);

        els.options.appendChild(els.login);
        els.options.appendChild(els.ui_options);

    },

    login(){

        const srsession = srapi.session();
        session.user_id = srsession.user_id;
        session.access_token = srsession.access_token;
        session.first_name = srsession.first_name;

        els.login.querySelector('label').remove();
        els.login.querySelector('label').remove();
        els.loginbtn.remove();

        els.greeting = document.createElement('div');
        els.greeting.id = 'greeting';
        els.greeting.appendChild(document.createElement('p'));
        els.greeting.querySelector('p').textContent = `Welcome ${session.first_name}`;
        els.login.appendChild(els.greeting);

        srapi.logged_in = true;
    },

    // save options to storage - Google examples are not working - trying something else.
    save_options(){
        fn.toggleDark();
        els.save.textContent = 'Saved!';
    },
    // /**
    //  *  chrome.storage.sync.set({ key: value }).then(() => {
    //         console.log('Value is set to ' + value);
    //     });
    // */
    restore_options(){

        
    }

    /**
        chrome.storage.sync.get(['key']).then((result) => {
            console.log('Value currently is ' + result.key);
        });
     */

};


const els = {
    options: document.querySelector('#options'), 
    dark_preference: document.querySelector('#dark-mode'),
    save: document.querySelector('#save')
}

const session = {};

const listeners = [];

fns.load();



// Event Listeners
listeners.push( document.addEventListener('DOMContentLoaded', fns.restore_options()) );
listeners.push( els.save.addEventListener('click',() => { fns.save_options()} ));
listeners.push( els.loginbtn.addEventListener('click', () => { fns.login();} ));
