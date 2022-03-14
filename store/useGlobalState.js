import { useState } from 'react'

const useGlobalState = () => {
    const [state, setState] = useState(
        {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            is_courier: false
        }
    );

    const actions = (actions) => {
        const { type, payload } = actions;
        switch (type) {
            case 'setState':
                return setState(payload);
            default:
                return state;
        }
    }

    return { state, actions }
}

export default useGlobalState;