var droplist = document.querySelector( '#droplist' )
async function getDataName(){

    const response = await fetch('/files')
    const data = await response.json()
    for(let i in Object.keys(data)){
        console.log(Object.keys(data)[i] );
        droplist.innerHTML += `<li><span class="file"><a href="/upload/`+Object.keys(data)[i]+`" >` + Object.keys(data)[i] + `</a></span>
            <span><a href="/download/`+Object.keys(data)[i]+`" class="download">Download</a>` +
         ` <a href="/delete/`+Object.keys(data)[i]+`" class="delete">&#x2715</a> </span></li>`
          }
    
}

getDataName()
 





