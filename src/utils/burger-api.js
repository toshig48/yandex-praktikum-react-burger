const URL_API = "https://norma.nomoreparties.space/api";

const checkResponce = (response) => {
    if (!response.ok) {
        throw new Error("Запрос вернул status = " + response.status);
    }
    else {
        return response.json();
    }
}

const checkSuccess = (data) => {
    if (data.success) {
        return data;
    }
    else {
        throw new Error("Json API вернул success != true" + JSON.stringify(data));
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