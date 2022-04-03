export const callRefreshToken = async (refreshToken) => {
    try {
      const url = 'http://147.175.150.96/api/accounts/token/refresh/'
      const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "refresh": refreshToken })
      })
      const data = await response.json()
      return data
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
