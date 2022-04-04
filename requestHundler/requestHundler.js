// import { Refresh_token } from '../store/features/token/Token'



export const requestHundler = (fetchData, fetchUrl, callback, state = null, met = "POST") => {
    var f = true
    fetch(fetchUrl, {
        method: met,
        headers: {
            'Content-Type': 'application/json',
        },
        // headers: new Headers({
        //     'Content-Type': 'application/json',
        // }),
        body: fetchData
    }).then(response => response.json())
        .then(data => {
            if(data) callback(data)
        }).catch(e => {
            return e
        })
}

export const requestGet = (url, head,call) => {
    fetch(url, {
        method: 'GET', 
        // headers : head
    }).then(response => response.json())
        .then(data => {
            if (data.code) {
                //console.log(data.code)
                return
            }
            if (call) call(data)
        }).catch(e => {
            return e
        })
}










