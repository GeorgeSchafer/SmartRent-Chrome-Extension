import { SmartRentAPI as smart_rent_api } from './SmartRentApi.js';
import { common, user } from './common.js'



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
        els.emailInput = document.createElement('input');
        els.email.appendChild(els.emailInput);
        els.emailInput.for = els.login;
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
        // els.loginbtn.disabled = true;
        // els.loginbtn.classList.add('disabled');
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

        smart_rent_api.session(els.emailInput.value, els.passwordInput.value)
            .then( response => {
                if(response.status === 201){
                    login.user_id = response.user_id;
                    login.access_token = response.access_token;
                    login.first_name = response.first_name;
        
                    this.removeLoginChilds();
        
                    els.greeting = document.createElement('p'); // document.createElement('div');
                    els.greeting.id = 'greeting';
                    els.greeting.textContent = `Welcome ${login.first_name}`;
                    els.login.appendChild(els.greeting);
                    // els.login.appendChild(fns.createUnitPicker());
        
                } else {
                    
                    this.removeLoginChilds();
                    els.perror = document.createElement('p');
                    els.perror.classList.add('p-error');
                    els.perror.innerHTML = els.perror;
                    els.login.appendChild(els.perror);
        
                    setTimeout(() => {
                        els.perror.remove();
                        fns.createLoginInputs();
                        listeners.push( els.loginbtn.addEventListener('click', () => { fns.login();} ));
                    } ,2000)
                }
            } );
        // @todo fix Smart_rent_api.session call.
        // const response = smart_rent_api.session(els.emailInput.value, els.passwordInput.value);
        // console.log('response is: ', response);

        // if(response.status === 201){
        //     login.user_id = response.user_id;
        //     login.access_token = response.access_token;
        //     login.first_name = response.first_name;

        //     this.removeLoginChilds();

        //     els.greeting = document.createElement('p'); // document.createElement('div');
        //     els.greeting.id = 'greeting';
        //     els.greeting.textContent = `Welcome ${login.first_name}`;
        //     els.login.appendChild(els.greeting);
        //     // els.login.appendChild(fns.createUnitPicker());

        // } else {
            
        //     this.removeLoginChilds();
        //     els.perror = document.createElement('p');
        //     els.perror.classList.add('p-error');
        //     els.perror.innerHTML = els.perror;
        //     els.login.appendChild(els.perror);

        //     setTimeout(() => {
        //         els.perror.remove();
        //         fns.createLoginInputs();
        //         listeners.push( els.loginbtn.addEventListener('click', () => { fns.login();} ));
        //     } ,2000)
        // }
    },
    
    removeLoginChilds(){
        els.login.querySelector('label').remove();
        els.login.querySelector('label').remove();
        els.loginbtn.remove();
    },

    createUnitPicker(){
    /**
     * @todo 
     *  Write fns.createUnitPicker()
     *      Should be an input.type="select".
     *      After selecting the unit, the unit devices should be saved to common.js > user.devices
     */

        els.unitPicker = document.createElement('input');
        els.unitPicker.type = 'select';
        els.unitPicker.classList.add('selector');
        fns.createOption('', 'Select a unit' );
        user.units.forEach( unit => {
            els.unitPicker.appendChild(createOption(unit.id, `${unit.marketing_name}, ${unit.group.marketing_name}`));
        } );

    },

    createOption(value, text){
        const option = document.createElement('option');
        option.value = value;
        option.innerText = text;
        els.unitPicker.appendChild(option);
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
    unitPicker: null,
    options: document.querySelector('#options'), 
    dark_preference: document.querySelector('#dark-mode'),
    save: document.querySelector('#save'),
    perror: document.createTextNode('Login Error, invalid email or password')
}

const login = {};

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



listeners.push( els.loginbtn.addEventListener('click', (e) => { e.preventDefault(); fns.login();} ));
listeners.push( els.save.addEventListener('click',(e) => { e.preventDefault(); fns.save_options(); } ));


