

export const SmartRentAPI = {
    deliveryCode(){
        return {code: 121212, type: 'delivery'};
    },

    session(email, password){
        if( email == 'george.schafer@smartrent.com' && password == 'Smartrent1!' ){
            return {status: 201, user_id: 1111, first_name: 'Jaded', access_token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"};
        } else {
            return {status: 401, error: 'Login failed, check your email and password.'}
        }
    },

    getDevices(){

        const r = Math.floor( Math.random() * 2 );
        let toggled;

        r === 0
            ? toggled = false
            : toggled = true;

        if (toggled){
            return [
                {
                    type: "entry_control",
                    is_locked: false,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: true,
                    name: 'Plug'
                },
                {
                    type: 'binary_switch',
                    is_on: true,
                    name: 'Kitchen'
                },
                {
                    type: "entry_control",
                    is_locked: false,
                    name: "Bedroom"
                }
            ];  

        } else {
            return [
                {
                    type: "entry_control",
                    is_locked: true,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: false,
                    name: 'Plug'
                },
                {
                    type: 'binary_switch',
                    is_on: false,
                    name: 'Kitchen'
                },
                {
                    type: "entry_control",
                    is_locked: true,
                    name: "Bedroom"
                }
            ];    
        }

    }

}




