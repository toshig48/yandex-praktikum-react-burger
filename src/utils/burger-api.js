import { URL_API } from './config'
import { GetRefreshToken, SaveTokens } from './token';

const fetchWithRefresh = async (url, params) => {
    try {
        const responce = await fetch(url, params);
        return await checkResponce(responce);
    }
    catch (ex) {
        if (ex.message === 'jwt malformed' || ex.message === 'jwt expired') {
            var refreshToken = GetRefreshToken();
            if (refreshToken) {
                const refreshData = await tokenUser(refreshToken);
                if (!refreshData.success) {
                    Promise.reject(refreshData);
                }
                else {
                    SaveTokens(refreshData.accessToken, refreshData.refreshToken);
                    params.headers.authorization = refreshData.accessToken;
                    const responce = await fetch(url, params);
                    return await checkResponce(responce);
                }
            }
            else {
                Promise.reject("RefreshToken no find on local storage");
            }
        }
        else {
            Promise.reject(ex);
        }
    }
}

const checkResponce = async (response) => {
    const data = response.json();
    if (!response.ok) {
        const result = await data.then(result => result);
        if (result.message) {
            throw new Error(result.message);
        }
        else {
            throw new Error("Запрос вернул status = " + response.status);
        }
    }
    else {
        return data;
    }
}

const checkSuccess = (data) => {
    if (data.success) {
        return data;
    }
    else {
        let error;
        if (data.message) {
            error = data.message;
        }
        else {
            error = "Json API вернул success != true" + JSON.stringify(data);
        }
        throw new Error(error);
    }
}

export const getIngredientsData = async () => {
    return await fetch(URL_API + "/ingredients")
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data.data;
        })
}

export const createOrder = async (data) => {
    return await fetch(URL_API + "/orders", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "ingredients": data
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data.order;
        })
}

export const registerUser = async (name, email, password) => {
    return await fetch(URL_API + "/auth/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const loginUser = async (email, password) => {
    return await fetch(URL_API + "/auth/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const forgotPasswordUser = async (email) => {
    return await fetch(URL_API + "/password-reset", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const resetPasswordUser = async (password, code) => {
    return await fetch(URL_API + "/password-reset/reset", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "token": code
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const logoutUser = async (refreshToken) => {
    return await fetch(URL_API + "/auth/logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": refreshToken,
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const tokenUser = async (refreshToken) => {
    return await fetch(URL_API + "/auth/token", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "token": refreshToken,
        })
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const getInfoUser = async (authToken) => {        
    return await fetchWithRefresh(URL_API + "/auth/user ", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authToken
        }
    })
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const setInfoUser = async (authToken, name, email, password) => {
    return await fetchWithRefresh(URL_API + "/auth/user ", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        })
    })
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}