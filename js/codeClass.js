class Code { 
    constructor(r){
        this.code = r.code;
        this.type = r.type;
    }
}

export class DeliveryCode extends Code {

    constructor(r){

        super(r);

        this.code_wrapper = document.createElement('div');
        this.code_wrapper.classList.add('code-wrapper');

        this.code_display = document.createElement('div');
        this.code_display.classList.add('delivery')
        this.code_display.textContent = `Delivery Code: ${this.code}`;

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.img = document.createElement('img');
        this.img.classList.add('util-svg');
        this.img.src = './images/clipboard-gray.svg';

        this.code_wrapper.appendChild(this.code_display);
        this.code_wrapper.appendChild(this.icon);
        this.icon.appendChild(this.img);

    }

    copy(){
        console.log('Copying ...');
        this.img.src = './images/clipboard-geen.svg';
        console.log('I should turn green.')
    }
}

export class DeliveryMenu {
    constructor(){
        this.code_wrapper = document.createElement('div');
        this.code_wrapper.classList.add('code-wrapper');
        
        this.request_code = document.createElement('div');
        this.request_code.classList.add('delivery');
        this.request_code.classList.add('centered');
        this.request_code.textContent = "Request Delivery Code";

        this.icon = document.createElement('div');
        this.icon.classList.add('icon');

        this.code_wrapper.appendChild(this.request_code);
        this.code_wrapper.appendChild(this.icon);
    }
}