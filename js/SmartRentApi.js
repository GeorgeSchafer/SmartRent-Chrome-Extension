

export const SmartRentAPI = {
    deliveryCode(){
        return {code: 121212, type: 'delivery'};
    },

    session(){
        return {user_id: 1111, first_name: 'Jaded', access_token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"};
    },

    getDevices(toggled){

        if (toggled){
            return [
                {
                    type: "lock",
                    is_locked: false,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: false,
                    name: 'Plug'
                }
            ];  

        } else {
            return [
                {
                    type: "lock",
                    is_locked: true,
                    name: "Front Door"
                },
                {
                    type: 'binary_switch',
                    is_on: true,
                    name: 'Plug'
                }
            ];    
        }

    }
}





