let btn=document.querySelector(".generate");
  btn.addEventListener("click",()=>{
    console.log("clicked");
    append();
  });
  
  function append(){
    fetch("/?section_id=template--17749530083564__custom_usp_6YwExV")
    .then(response=>response.text())
    .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText,'text/html');
        const container = document.getElementById("append_container");
        const content = html.querySelector("body")
        console.log(content);
        container.innerHTML = content.innerHTML;
    })
}