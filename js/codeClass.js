import { SmartRentAPI } from "./SmartRentApi.js";

const srapi = new SmartRentAPI();

class Code { 
    constructor(){
        this.r = null;
        this.srapi = new SmartRentAPI();

        this.code_wrapper = document.createElement('div');
        this.code_wrapper.classList.add('code-wrapper');

        this.code_display = document.createElement('div');
        this.code_display.classList.add('code');
        this.code_display.classList.add('centered');

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.img = document.createElement('img');
        this.img.classList.add('util-svg');

        this.code_wrapper.appendChild(this.code_display);
        this.code_wrapper.appendChild(this.icon);
        /**
         * @ img is NOT added to this.icon as it has no need to be displayed.
         */
    }
}

export class DeliveryCode extends Code {

    // r is the response from the Resident API with the information about the code.
    constructor(){

        super();

        this.code_display.textContent = "Request Delivery Code";

    }

    getCode(){

        this.r = srapi.deliveryCode();

        this.code_display.textContent = this.r.code;

        this.img.src = paths.clipboard.gray;

        this.icon.appendChild(this.img);

    }


    copy(){

        navigator.clipboard.writeText(this.code_display.textContent);
        this.img.src = paths.clipboard.check;
        setTimeout( () => {this.img.src = paths.clipboard.green}, 500 );
    
    }

}

const paths = {
    clipboard: {
        gray: './images/clipboard-gray.svg',
        check: './images/check-mark.svg',
        green: './images/clipboard-green.svg'
    }
};


