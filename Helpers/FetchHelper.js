import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../cofig'

async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
}

export const FETCH = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.code === 'token_not_valid' || data.code == "bad_authorization_header") {
        const refresh = await SecureStore.getItemAsync('refresh')
        const url = `${BASE_URL}/accounts/token/refresh/`
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'refresh': refresh })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (data.code !== 'token_not_valid') {
            save('access' , data.access)
            save('refresh', data.refresh)
            return { message: 'new_token', new_access: data.access }
        } else {
            return { message: 'logout_user' }
        }
    } else {
        return data
    }
}