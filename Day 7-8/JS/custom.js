var slideIndex = 1;
var totalSlideCount=5;
var body = document.getElementById("slideshow-container");

function addSlideButton(){
    var slideBtn = document.getElementById("slideBTN");
    for (var i = 1; i <=totalSlideCount; i++) {
        var spanField = document.createElement("span");
        spanField.className="slide";
        spanField.setAttribute("id","slide"+i);
        spanField.setAttribute("value",i);
        slideBtn.appendChild(spanField);

        spanField.addEventListener("click", function () {
            currentSlide(this.getAttribute("value"));
        });
    }
}

window.addEventListener('load', function () {

    for (var i = 1; i <=totalSlideCount; i++) {
        var div = document.createElement("div");

        var childDiv = document.createElement("div");
        childDiv.style.width = "100%";
        childDiv.style.background = "#2F4357";
        childDiv.setAttribute("id", "childDiv");

        var parentButtonDiv = document.createElement("div");
        parentButtonDiv.style.width = "100%";
        parentButtonDiv.className = "middle";
        parentButtonDiv.setAttribute("id","parentButtonDiv");

        var button = document.createElement("button");
        button.innerHTML = 'Button ' + i;
        button.setAttribute("id","button"+i);

        div.className = "mySlides fade";
        div.setAttribute("id","slideDiv"+i);

        parentButtonDiv.appendChild(button);

        div.appendChild(childDiv);
        div.appendChild(parentButtonDiv);

        body.appendChild(div);
        button.addEventListener("mouseup", function () {
            alert(this.innerHTML);
        });
    }
    addSlideButton();
    showSlides(slideIndex);
});

function buttonClick(){

}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex=n);
}

var showSlides = function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";

    var slide = document.getElementsByClassName("slide");
    for (i = 0; i < slide.length; i++) {
        slide[i].className = slide[i].className.replace(" active", "");
    }
    slide[slideIndex - 1].className += " active";
}

function removeSlide(event){
    var slide = document.getElementsByClassName("slide");
    var slideLen=slide.length;
    var activeSlideId;
    var activeSlideValue;
    for(var  i=0;i<slideLen;i++){
        if(slide[i].className=="slide active"){
            activeSlideId=slide[i].getAttribute("id");
            activeSlideValue=slide[i].getAttribute("value");
            break;
        }
    }
    document.getElementById(activeSlideId).remove();
    document.getElementById("slideDiv"+activeSlideValue).remove();
    currentSlide(1);
    console.log(this);
    //document.getElementById("myDIV").removeEventListener("mousemove", myFunction);
}