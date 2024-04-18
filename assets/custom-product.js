
let imageContainer =  document.querySelectorAll("#imageContainer");
let firstImage = document.querySelectorAll("#firstImage");    
let secondImage = document.querySelectorAll("#secondImage");  
let viewContainer = document.querySelectorAll(".custom-rings-product--view-container button");
let availableEl = document.querySelectorAll(".custom-rings-product--available");
let colorsContainer = document.querySelectorAll(".custom-rings-product--colors-container");
let radio = document.querySelectorAll(".custom-rings-product--radio");
let cardDetails = document.querySelectorAll(".custom-rings-product--card-details")


imageContainer.forEach((each,index)=>{
    each.addEventListener("mouseenter",function(){ 
        firstImage[index].style.display = "none";
        secondImage[index].style.display= "block";
        viewContainer[index].style.display = "block";
        availableEl[index].style.opacity = "0";
        colorsContainer[index].style.opacity = "1";
        colorsContainer[index].style.top = "0";
    })

    each.addEventListener("mouseleave",function(){
        firstImage[index].style.display = "block";
        secondImage[index].style.display= "none";
        viewContainer[index].style.display = "none";
        availableEl[index].style.opacity = "1";
        colorsContainer[index].style.opacity = "0";
        colorsContainer[index].style.top = "100%";
    })
})

cardDetails.forEach((each,index)=>{
    each.addEventListener("mouseenter",function(){ 
        viewContainer[index].style.display = "block";
        availableEl[index].style.opacity = "0";
        colorsContainer[index].style.opacity = "1";
        colorsContainer[index].style.top = "0";
    })

    each.addEventListener("mouseleave",function(){
        viewContainer[index].style.display = "none";
        availableEl[index].style.opacity = "1";
        colorsContainer[index].style.opacity = "0";
        colorsContainer[index].style.top = "100%";
    })
})


radio.forEach((eachradio)=>{
    eachradio.addEventListener("mouseenter",function(){
        let imageLink = eachradio.getAttribute("data-images");
        let imageElIndex = eachradio.getAttribute("data-imageindex") - 1;
        firstImage[imageElIndex].setAttribute("src",imageLink);
        console.log(eachradio);
    })
})
