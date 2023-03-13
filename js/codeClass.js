import { SmartRentAPI as srapi } from "./SmartRentApi.js";

class Code { 
    constructor(){
        this.code = null;
        this.type = null;
    }
}

export class DeliveryCode extends Code {

    // r is the response from the Resident API with the information about the code.
    constructor(){

        super();

        this.code_wrapper = document.createElement('div');
        this.code_wrapper.classList.add('code-wrapper');

        this.code_display = document.createElement('div');
        this.code_display.classList.add('delivery');
        this.code_display.classList.add('centered');
        this.code_display.textContent = "Request Delivery Code";

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.img = document.createElement('img');
        this.img.classList.add('util-svg');

        this.code_wrapper.appendChild(this.code_display);
        this.code_wrapper.appendChild(this.icon);
        // img is NOT added to this.icon as it has no need to be displayed.

    }

    getCode(){

        const r = srapi.deliveryCode();

        this.code_display.textContent = r.code;

        this.img.src = paths.clipboard.gray;

        this.icon.appendChild(this.img);

    }


    copy(){

        this.img.src = paths.clipboard.green;

    }


}

const paths = {
    clipboard: {
        gray: './images/clipboard-gray.svg',
        green: './images/clipboard-green.svg'
    }
};


