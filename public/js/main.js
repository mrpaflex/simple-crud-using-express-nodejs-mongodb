
const deletext = document.querySelectorAll('.fa-trash')
const thumlike = document.querySelectorAll('.fa-thumbs-up')
const dislike = document.querySelectorAll('.fa-flip-horizontal')



Array.from(dislike).forEach((Element)=>{
    Element.addEventListener('click', removeLike)
})

Array.from(deletext).forEach((Element)=>{
    Element.addEventListener('click', deleteOnePersonFuction)
})

Array.from(thumlike).forEach((Element)=>{
    Element.addEventListener('click', addlikes)
})




async function deleteOnePersonFuction (){
    const bjsName = this.parentNode.childNodes[1].innerText
    const bjsquotes = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('deleteOnePerson', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'useName': bjsName,
                'useQoute': bjsquotes
            })
        })

        const data = await response.json(
            location.reload()
        )
    }catch(error){
        console.log(error)
    }
}


//add like function
async function addlikes(){
    const bjsName = this.parentNode.childNodes[1].innerText
    const bjsquotes = this.parentNode.childNodes[3].innerText
    const bjslike = Number(this.parentNode.childNodes[5].innerText)

    try{
        const response = await fetch('addlikeToLikes', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'useName': bjsName,
                'useQoute': bjsquotes,
                'useLikes': bjslike
            })
        })
        const data = await response.json()
        location.reload()

    }catch(error){
        console.log(error);
    }
}

//for dislike functio
async function removeLike(){
    const bjsName = this.parentNode.childNodes[1].innerText
    const bjsquotes = this.parentNode.childNodes[3].innerText
    const bjslike = Number(this.parentNode.childNodes[5].innerText)

    try{
        const response = await fetch('removelikeFromLikes', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'useName': bjsName,
                'useQoute': bjsquotes,
                'useLikes': bjslike
            })
        })
        const data = await response.json()
        location.reload()

    }catch(error){
        console.log(error);
    }
}
