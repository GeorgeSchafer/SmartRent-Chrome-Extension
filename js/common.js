 

const fns = {

    load(){

        fns.darkMode()
    
    },
    
    darkMode(){
        els.head = document.querySelector('head');
        els.styles = document.createElement('link');
        els.styles.href = './mode-dark.css';
        els.styles.rel='stylesheet';
        els.head.appendChild(els.styles);
    }
}

const els = {};

const pref = {
    dark_preference: null
};

fns.load();

// Event Listeners
document.addEventListener('DOMContentLoaded', fns.darkMode());
