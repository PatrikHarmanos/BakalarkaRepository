import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
}

export const callRefreshToken = async () => {
    try {
        await SecureStore.getItemAsync('refresh').then(async (token) => {
            const url = 'http://147.175.150.96/api/accounts/token/refresh/'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'refresh': token })
            })
            const data = await response.json()
            if (data.code !== 'token_not_valid') {
                save('access' , data.access)
                save('refresh', data.refresh)
                return true // { success: true, new_access: data.access }
            } else {
                return { success: false }
            }
        })
    } catch (err) {
      console.log(err)
    }
}

export const callAPI = async (url, method, headers, body) => {
    try {
        let response
        if (body !== undefined && headers !== undefined) {
            response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            })
        } else if (body === undefined && headers !== undefined) {
            response = await fetch(url, {
                method: method,
                headers: headers
            })
        } else if (body !== undefined && headers === undefined) {
            response = await fetch(url, {
                method: method,
                body: body
            })
        } else {
            response = await fetch(url, {
                method: method
            })
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const FETCH = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    if (data.code === 'token_not_valid' || data.code == "bad_authorization_header") {
        const refresh = await SecureStore.getItemAsync('refresh')
        const url = 'http://147.175.150.96/api/accounts/token/refresh/'
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