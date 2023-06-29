import { SmartRentAPI } from './SmartRentApi.js';
import { common, user } from './common.js'


class Options {

    constructor(){

        this.srapi = new SmartRentAPI();

        this.els = {
            login: null,
            emailInput: null,
            passwordInput: null,
            loginbtn: null,
            unitPicker: null,
            options: document.querySelector('#options'), 
            dark_preference: document.querySelector('#dark-mode'),
            save: document.querySelector('#save'),
            perror: document.createTextNode('Login Error, invalid email or password')
        }

        // @todo Determine if neccessary
        // this.login = {};

        this.listeners = [
            /**
             *  document.addEventListener('DOMContentLoaded', restore_options())
             *  location: createLoginInputs()
             *      els.emailInput.addEventListener('blur', (e) => { enableLogin(e) } )
             *      els.passwordInput.addEventListener('blur', (e) => { enableLogin(e) } )
             *  els.loginbtn.addEventListener('click', async (e) => { e.preventDefault(); await login();} )
             *  els.save.addEventListener('click',(e) => { save_options(e); } )
             */
        ];

        // Load on creation.
        load();

        // Event Listeners
        this.listeners.push( document.addEventListener('DOMContentLoaded', restore_options()) );
        this.listeners.push( els.loginbtn.addEventListener('click', async (e) => { await login(e) } ));
        this.listeners.push( els.save.addEventListener('click',(e) => { save_options(e) } ));
    
    }

    load(){

        createLoginForm();
        createLoginInputs();
        createUIForm();

    }
    
    createLoginForm(){
        els.login = document.createElement('form');
        els.login.id = 'login';
    }

    createLoginInputs(){

        els.email = document.createElement('label');
        els.emailInput = document.createElement('input');
        els.email.appendChild(els.emailInput);
        els.emailInput.for = els.login;
        els.emailInput.autocomplete = true; // autocomplete
        els.emailInput.id = 'email';
        els.emailInput.type = 'email';
        els.emailInput.min = 5;
        els.emailInput.value = 'phy@sr.com'; // here for testing purposes
        els.emailInput.placeholder = 'eMail';
        els.emailInput.classList.add('textInput');
        els.emailInput.required = true;
        els.login.appendChild(els.email);

        els.password = document.createElement('label');
        els.passwordInput = document.createElement('input');
        els.passwordInput.autocomplete = true; // autocomplete
        els.password.appendChild(els.passwordInput);
        els.passwordInput.for = els.login;
        els.passwordInput = els.password.querySelector('input');
        els.passwordInput.id = 'password';
        els.passwordInput.type = 'password';
        els.passwordInput.value = 'Smartrent1!'; // here for testing purposes
        els.passwordInput.min = 8;
        els.passwordInput.placeholder = 'Password';
        els.passwordInput.classList.add('textInput');
        els.passwordInput.required = true;
        els.login.appendChild(els.password);

        els.loginbtn = document.createElement('input');
        els.loginbtn.type = "submit";
        els.loginbtn.id = 'loginbtn';
        els.loginbtn.value = 'Login';
        disable(els.loginbtn);
        els.login.appendChild(els.loginbtn);

        els.emailInput.addEventListener('blur', (e) => { enableLogin(e) } )
        els.passwordInput.addEventListener('blur', (e) => { enableLogin(e) } )
    }

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
        els.save.value = 'Save';
        els.ui_options.appendChild(els.save);

        els.options.appendChild(els.login);
        els.options.appendChild(els.ui_options);
    }

    enableLogin(e){
        /**
         * @todo Currently broken, fix
         */

        const criteria = 
            els.emailInput.value.length >= 5 && 
            els.passwordInput.value.length >= 8 &&
            els.emailInput.value.indexOf('@') != -1 &&
            els.emailInput.value.indexOf('.') != -1;

        if( criteria ){
            enable(els.loginbtn);
            els.save.classList.remove('disabled');
        }
    }

    async login(e){
        e.preventDefault();
        disable(els.loginbtn);

        await srapi.session(els.emailInput.value, els.passwordInput.value)
            .then( (status) => {
                if(status == 201){

                    this.removeLoginInputs();

                    els.greeting = document.createElement('p'); // document.createElement('div');
                    els.greeting.id = 'greeting';
                    els.greeting.textContent = `Welcome ${user.profile.first_name}`;
                    els.login.appendChild(els.greeting);
        
                } else {
                    
                    this.removeLoginInputs();
                    els.perror = document.createElement('p');
                    els.perror.classList.add('p-error');
                    els.perror.textContent = 'Login error: invalid email or password.';
                    els.login.appendChild(els.perror);
        
                    setTimeout(() => {
                        els.perror.remove();
                        createLoginInputs();
                        listeners.push( els.loginbtn.addEventListener('click', () => { login();} ));
                    } ,2000)
                }
            } );
        // end promise

    }

    disable(button){
        button.disabled = true;
    }

    enable(button){
        button.disabled = false;
    }
    
    removeLoginInputs(){
        els.login.querySelector('label').remove();
        els.login.querySelector('label').remove();
        els.loginbtn.remove();
    }

    save_options(e){
    ///**
    // * @todo save options to storage - Google examples are not working - trying something else.
    // * chrome.storage.sync.set({ key: value }).then(() => {
    //         console.log('Value is set to ' + value);
    //     });
    // */
        e.preventDefault();
        console.log('Saving preferences....')
        common.updateDark(els.dark_preference.checked);
        els.save.value = 'Saved!';
        this.disable(els.save);
        setTimeout(()=>{
            els.save.value = 'Save';
            enable(els.save);
        }, 5000);
    }

    restore_options(){
    /**
        chrome.storage.sync.get(['key']).then((result) => {
            console.log('Value currently is ' + result.key);
        });
    */
        
    }


}

