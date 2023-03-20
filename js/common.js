 

export const fn = {

    load(){
    
    },
    
    darkMode(){

        els.dark = document.createElement('link');
        els.dark.href = './styles/mode-dark.css';
        els.dark.rel ='stylesheet';
        els.dark.classList.add('dark');
        pref.dark = true;

        els.head = document.querySelector('head');
        els.head.appendChild(els.dark);

    },


    updateDark( dark ) {
        pref.dark = dark;
        if(!pref.dark){
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

export const pref = {
    dark: true
};

const listeners = [];

fn.load();

// Event Listeners
if( pref.dark ){
    listeners.push( document.addEventListener('DOMContentLoaded', fn.darkMode()) );
}