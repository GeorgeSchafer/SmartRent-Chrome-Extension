import { SmartRentAPI as smart_rent_api } from './SmartRentApi.js';
import { fns as common, pref } from './common.js'

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
        els.email.for = els.login;
        els.emailInput = els.email.querySelector('input');
        els.emailInput.id = 'email';
        els.emailInput.type = 'email';
        els.emailInput.min = 5; // @todo: figure out why this isn't working
        els.emailInput.placeholder = 'eMail';
        els.emailInput.classList.add('textInput');
        els.emailInput.required = true;
        els.login.appendChild(els.email);

        els.password = document.createElement('label');
        els.password.appendChild(document.createElement('input'));
        els.password.for = els.login;
        els.passwordInput = els.password.querySelector('input');
        els.passwordInput.id = 'password';
        els.passwordInput.type = 'password';
        els.passwordInput.min = 8; // @todo: figure out why this isn't working
        els.passwordInput.placeholder = 'Password';
        els.passwordInput.classList.add('textInput');
        els.passwordInput.required = true;
        els.login.appendChild(els.password);

        els.loginbtn = document.createElement('input');
        els.loginbtn.type = "submit";
        els.loginbtn.classList.add('disabled');
        els.loginbtn.id = 'loginbtn';
        els.loginbtn.value = 'Login';
        els.loginbtn.disabled = true;
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

    enableSubmit(){
        if( els.emailInput.value.length >= 5 || els.passwordInput.value.length >= 8  ){
            els.save.disabled = false;
            els.save.classList.remove('disabled');
        }
    },

    login(){
        // @todo fixe Smart_rent_api.session call.
        const srsession = smart_rent_api.session(els.emailInput.value, els.passwordInput.value);

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

    save_options(){
    ///**
    // * @todo save options to storage - Google examples are not working - trying something else.
    // * chrome.storage.sync.set({ key: value }).then(() => {
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
    login: null,
    emailInput: null,
    passwordInput: null,
    loginbtn: null,
    options: document.querySelector('#options'), 
    dark_preference: document.querySelector('#dark-mode'),
    save: document.querySelector('#save')
}

const session = {};

const listeners = [];

fns.load();



// Event Listeners
listeners.push( document.addEventListener('DOMContentLoaded', fns.restore_options()) );

/**
 * Add a css class to group these buttons together so I can listen for changes.
 */
// listeners.push( login.querySelectorAll('input').forEach( field => {
//     field.addEventListener('change', () => {
//         console.log('Login values: ', { "passwordLength": els.passwordInput.value.length, "\npasswordMinLength": field.min})

//         if( els.passwordInput.value.length >= field.min && els.emailInput.value.length >= els.emailInput.min ){
//             els.loginbtn.classList.remove('disabled');
//         }
//     } )
// }));



listeners.push( els.loginbtn.addEventListener('click', () => { fns.login();} ));
listeners.push( els.save.addEventListener('click',(e) => { e.preventDefault(); fns.save_options(); } ));


