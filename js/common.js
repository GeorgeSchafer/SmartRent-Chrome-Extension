 

export const fn = {

    load(){
    
    },
    
    darkMode(){

        els.dark = document.createElement('link');
        els.dark.href = './styles/mode-dark.css';
        els.dark.rel ='stylesheet';
        pref.dark = true;

        els.head = document.querySelector('head');
        els.head.appendChild(els.styles);

    }


    toggleDark() {
        pref.dark = !prefer.dark;
        if(!prefer.dark){
            els.dark = document.createElement('link');
            els.dark.href = './styles/mode-dark.css';
            els.dark.rel ='stylesheet';
        } else {
            els.dark = document.createElement('link');
            els.dark.href = './styles/mode-dark.css';
            els.dark.rel ='stylesheet';
            els.head = document.querySelector('head');
            els.head.appendChild(els.styles);
        }
    }
}

const els = {};

export const pref = {
    dark: null
};

const listeners = [];

fns.load();

// Event Listeners
if( pref.dark || pref.dark == null){
    listeners.push( document.addEventListener('DOMContentLoaded', fn.darkMode()) );
}