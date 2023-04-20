document.querySelector('form').addEventListener("submit", submitForm)

const url = "https://1589dbb9-350b-40d2-9f8f-dd9df788b78f.mock.pstmn.io/login"

async function submitForm(e) {
    e.preventDefault()
    const fields = Array.from(new FormData(e.target))
    
    await fetch(url,{
        method: 'post',
        body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
    })
}
