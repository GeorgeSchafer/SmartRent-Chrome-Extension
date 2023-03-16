 

const fns = {

    load(){
    
    },
    
    darkMode(){

        els.styles = document.createElement('link');
        els.styles.href = './mode-dark.css';
        els.styles.rel='stylesheet';

        els.head = document.querySelector('head');
        els.head.appendChild(els.styles);
    }
}

const els = {};

const pref = {
    dark_preference: null
};

const listeners = [];

fns.load();

// Event Listeners
listeners.push( document.addEventListener('DOMContentLoaded', fns.darkMode()) );
