const cep = document.querySelector("#cep")

const fillData = (result) => {
    for (const field in result) {
        if (document.querySelector("#" + field)) {
            document.querySelector("#" + field).value = result[field]
        }
    }
}

function callAPI(cep) {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`, options)
        .then(response => {
            response.json()
                .then(data => {
                    fillData(data)
                    document.querySelector("#numero").focus()
                })
        })
        .catch(e => console.log('error: ' + e.message))
}

cep.addEventListener("blur", (e) => {
    let cleanCep = cep.value.replace("-", "")
    if (cleanCep) {
        callAPI(cleanCep)
    }
})