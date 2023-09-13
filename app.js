const carouselInner = document.querySelector('#carouselInner');
const carouselAll = document.querySelector('#carouselExample');
const topicsDiv = document.querySelector('#topicsDiv')
const linkObj = {
    gaming:'https://newsapi.org/v2/everything?q=gaming&apiKey=7f0899b71efe4a4e881adce41f37df97',
    music:'https://newsapi.org/v2/everything?q=music&apiKey=7f0899b71efe4a4e881adce41f37df97',
    movies:'https://newsapi.org/v2/everything?q=movies&apiKey=7f0899b71efe4a4e881adce41f37df97',
    science:'https://newsapi.org/v2/everything?q=science&apiKey=7f0899b71efe4a4e881adce41f37df97',
    hockey:'https://newsapi.org/v2/everything?q=hockey&apiKey=7f0899b71efe4a4e881adce41f37df97',
    technology:'https://newsapi.org/v2/everything?q=technology&apiKey=7f0899b71efe4a4e881adce41f37df97',
    food:'https://newsapi.org/v2/everything?q=food&apiKey=7f0899b71efe4a4e881adce41f37df97',
    health:'https://newsapi.org/v2/everything?q=health&apiKey=7f0899b71efe4a4e881adce41f37df97',
    entertainment:'https://newsapi.org/v2/everything?q=entertainment&apiKey=7f0899b71efe4a4e881adce41f37df97'
}


async function getArticles(topic){
    let res = await axios.get(linkObj[topic], {params:{pageSize:10}});


    let counter = 0
    let {articles} = res.data;

    for(let article of articles){
        createCarouselElement(article.urlToImage,article.title,article.description,article.url,counter);
        counter++;
    }


}



function createCarouselElement(img,head,body,url,c){
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('carousel-item');
    if(c === 0){
        itemDiv.classList.add('active');
    }
    let newImg = document.createElement('img');
    newImg.setAttribute('src',img);
    newImg.classList.add('carouselImg')
    itemDiv.append(newImg);
    let textDiv = document.createElement('div');
    textDiv.classList.add('carousel-caption');
    let h3 = document.createElement('h3');
    h3.append(createATag(url,head));
    h3.classList.add("text-bg-dark");
    let description = document.createElement('p');
    description.classList.add("text-bg-dark")
    description.append(createATag(url,body))
    textDiv.append(h3);
    textDiv.append(description);
    itemDiv.append(textDiv);
    carouselInner.append(itemDiv);
}


function createATag(url,innerText){
    let link = document.createElement('a');
    link.setAttribute('href',url);
    link.classList.add('anchorTag');
    link.innerText = innerText;
    return link;
}

topicsDiv.addEventListener('click',function(e){
    let topic;
    if(e.target.localName === 'img'){
        topic = e.target.alt
    }
    else if(e.target.localName === 'h5'){
        topic = e.target.innerText.toLowerCase();
    }
    else{
        topic = e.target.parentElement.parentElement.id;
    }
    carouselInner.innerHTML = ''
    getArticles(topic);
})

carouselAll.addEventListener('click',function(e){
    console.log(e);
})