import { SmartRentAPI as smart_rent_api } from './SmartRentApi.js';
import { fn as common, pref } from './common.js'

const fns = {
    load(){

        fns.createLoginForm();
        fns.createLoginInputs();
        fns.createUIForm();

    },
    
    createLoginForm(){
        els.login = document.createElement('form');
        els.login.id = 'login';
    },

    createLoginInputs(){

        els.email = document.createElement('label');
        els.email.appendChild(document.createElement('input'));
        els.email.querySelector('input').id = 'email';
        els.email.querySelector('input').type = 'email';
        els.email.querySelector('input').minlength = 5;
        els.email.querySelector('input').placeholder = 'eMail';
        els.email.querySelector('input').required = true;
        els.login.appendChild(els.email);

        els.password = document.createElement('label');
        els.password.appendChild(document.createElement('input'));
        els.password.querySelector('input').id = 'password';
        els.password.querySelector('input').type = 'password';
        els.password.querySelector('input').minlength = 8;
        els.password.querySelector('input').placeholder = 'Password';
        els.password.querySelector('input').required = true;
        els.login.appendChild(els.password);

        els.loginbtn = document.createElement('input');
        els.loginbtn.type = "submit";
        // els.loginbtn.classList.add('btn');
        els.loginbtn.id = 'loginbtn';
        els.loginbtn.textContent = 'Login';
        els.login.appendChild(els.loginbtn);
    },

    createUIForm(){
        els.ui_options = document.createElement('form');
        els.ui_options.id = 'ui_options';
        els.ui_options.appendChild(document.createElement('label'));

        els.dark_preference = document.createElement('input');
        els.dark_preference.type = 'checkbox';
        els.dark_preference.id = 'dark-preference';
        els.dark_preference.checked = true;
        els.ui_options.querySelector('label').appendChild(els.dark_preference);
        els.ui_options.querySelector('label').appendChild(document.createTextNode('Dark Mode'));

        els.save = document.createElement('input');
        els.save.type = 'submit';
        els.save.id = 'save';
        els.save.textContent = 'Save';
        els.ui_options.appendChild(els.save);

        els.options.appendChild(els.login);
        els.options.appendChild(els.ui_options);
    },

    login(){

        session.response = smart_rent_api.session(els.email.querySelector('input').value, els.password.querySelector('input').value);

        if(session.response.status === 201){
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

        } else {
            
            els.login.querySelector('#email').remove();
            els.login.querySelector('#password').remove();
            els.loginbtn.remove();
            els.perror = document.createElement('p');
            els.perror.classList.add('p-error');
            els.perror.classList.add('centered');
            els.perror.innerHTML = session.error;
            els.login.appendChild(els.perror);

            setTimeout(() => {
                els.perror.remove();
                fns.createLoginInputs();
                listeners.push( els.loginbtn.addEventListener('click', () => { fns.login();} ));
            } ,1000)
        }
    },

    // save options to storage - Google examples are not working - trying something else.
    save_options(){
    // /**
    //  *  chrome.storage.sync.set({ key: value }).then(() => {
    //         console.log('Value is set to ' + value);
    //     });
    // */
        common.updateDark(els.dark_preference.checked);
        els.save.textContent = 'Saved!';
        setTimeout(()=>{els.save.textContent = 'Save'}, 500);
    },
    restore_options(){
    /**
        chrome.storage.sync.get(['key']).then((result) => {
            console.log('Value currently is ' + result.key);
        });
     */
        
    }



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
