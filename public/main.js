var droplist = document.querySelector( '#droplist' )
async function getDataName(){

    const response = await fetch('/files')
    const data = await response.json()
    for(let i in data){
        console.log(data);
        droplist.innerHTML += '<li>' + data[i].toString() + `<a href="/uploads" download=`+data[i]+`>Download</a>` + ` <a href="/delete/`+data[i]+`" class="delete">Delete</a> </li>`
          }
    
}

getDataName()
 





