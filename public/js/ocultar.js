let ver = () =>{
    document.getElementById("inicio").style.display = "block";
}

(ver)();

function muestraTabs(evt,seccion){
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("nav-link");
    
    for(i=0;i< tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    for(i=0; i< tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace("active","");
    }

    document.getElementById(seccion).style.display = "block";
    evt.currentTarget.className += " active";
}

