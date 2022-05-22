const URL_API = "https://norma.nomoreparties.space/api";

const checkResponce = (response) => {
    const data = response.json();
    if (!response.ok && response.status >= 500) {
        throw new Error("Запрос вернул status = " + response.status);
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

export const resetPasswordUser = async (password, token) => {
    return await fetch(URL_API + "/password-reset/reset", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": password,
            "token": token
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
    return await fetch(URL_API + "/auth/user ", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',            
            'authorization': 'Bearer ' + authToken
        }
    })
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}

export const setInfoUser = async (authToken, name, email, password) => {
    return await fetch(URL_API + "/auth/user ", {
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
        .then(checkResponce)
        .then(checkSuccess)
        .then((data) => {
            return data;
        })
}