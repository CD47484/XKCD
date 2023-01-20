//Vad som ska hända när man laddar in på sidan och vad knapparna ska göra
window.onload =function(){
    document.maxComic = -1;
    getComic("latest");
    
    document.getElementById('forsta').addEventListener('click',function(){getComic(1)})
    document.getElementById('slumpa').addEventListener('click',function(){getComic(Math.floor(Math.random() * document.maxComic)-1)})
    document.getElementById('sista').addEventListener('click',function(){getComic("latest")})
    //If satsen är där så att om man går ett steg tillbaka från sida 1 så kommer man till den senaste sidan
    document.getElementById('forra').addEventListener('click',function(){if(document.currentComic==1){
        getComic("latest");
    }else(getComic(document.currentComic-1))
    })
    //If satsen är där så att om man går ett steg fram från den senaste sidan så kommer man till sida 1
    document.getElementById('nasta').addEventListener('click',function(){if(document.currentComic==document.maxComic){
        getComic(1);
    }else(getComic(document.currentComic+1))
    })
    }
//den tar in de olika "Comics" via xkcd sidan + "which" som är vilket omslag det är 
function getComic(which){
    fetch('https://xkcd.vercel.app/?comic='+which)
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        if(document.maxComic<data.num){
            document.maxComic=data.num;
        }
        appendComic(data);
    })
}


//Den tar in data från sidan och lägger in det i html
function appendComic(data){
    let text = document.createElement('h2');
    text.innerHTML = data.title;

    let mainComic = document.getElementById('mainComic');
    mainComic.innerHTML="";
    mainComic.appendChild(text);

    document.currentComic = data.num;


    //Tar in bilden
    let fig = document.createElement("figure");

    let image = document.createElement("img");
    image.src = data.img;
    image.alt;

    let cap = document.createElement("figcaption");
    cap.innerHTML = "Bild " +data.num;

    fig.appendChild(image);
    fig.appendChild(cap);

    mainComic.appendChild(fig);


    //Tar in datumet när bilden blev gjord 
    let dateElement = document.createElement("h3");
    let datum = new Date(data.year, data.month-1, data.day);
    
    dateElement.innerHTML = datum.toLocaleDateString();
    mainComic.appendChild(dateElement);
}


