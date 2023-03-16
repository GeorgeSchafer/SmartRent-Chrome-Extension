function load(){

    chrome.storage.local.get(["dark_preference"], (items) => {
        pref.dark_preference = items.dark_preference;
    });
    
    pref.dark_preference === null || pref.dark_preference
        ? fns.darkMode()
        : false ;
}

const fns = {

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

load();

// Event Listeners
document.addEventListener('DOMContentLoaded', fns.darkMode());
