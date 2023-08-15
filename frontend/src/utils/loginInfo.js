export let setLoginInfo =(data)=>{
    localStorage.setItem("info",JSON.stringify(data))

}

export let getLoginInfo = ()=>{

   let data= localStorage.getItem("info")
   console.log('Login info',data)

   let parseData = JSON.parse(data)

   return(parseData)

}


export let removeLoginInfo = ()=>{
    localStorage.removeItem("info")
}