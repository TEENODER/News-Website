let news = document.getElementById('news')
let bts = document.getElementsByClassName('bt')
let loader = document.createElement('div')
loader.id = 'loader'

for(let buttonindex = 0;buttonindex<bts.length;buttonindex++){

    bts[buttonindex].addEventListener('click',function(event){
        news.innerHTML = null
        newschannel.retriveData(bts[buttonindex].innerHTML)
        localStorage.setItem('cat',bts[buttonindex].innerHTML)
    })
}
class VpmNews{
    constructor(){
        
    }


    retriveData(catergory){
        let xhr = new XMLHttpRequest();

        xhr.open('GET',`https://newsapi.org/v2/top-headlines?category=${catergory}&language=en&apiKey=27307d17aa0d466291c9b426d7c40b38&pageSize=100`,true);

        xhr.onload = function(){
            loader.remove()
            let dataobj = JSON.parse(xhr.responseText)
            VpmNews.displaydata(dataobj);
        }

        xhr.onprogress = function(){
            news.appendChild(loader)
        }

        xhr.send();

    }

    static displaydata(obj){
        let newsarray = obj['articles']
        newsarray.forEach(function(object){
            let newscontainer = document.createElement('div')
            newscontainer.className = 'news-container'
            let newscard_front = document.createElement('div')
            newscard_front.classList.add('newscard','news-card-front')

            let newscard_back = document.createElement('div')
            newscard_back.innerHTML  = `
            <a target='_blank' href='${object.url}'>Know More...</a>
            `
            newscard_back.classList.add('newscard','news-card-back')


            let img = document.createElement('img')

            img.setAttribute('alt','icon')

            img.setAttribute('src',object.urlToImage)

            img.className = 'image'

          

            let content_container = document.createElement('div')

            content_container.className = 'content_container'

            let headline_title = document.createElement('div')
            headline_title.className = 'headline-title'
            headline_title.innerHTML = `${object.title}`

            let headline_desc = document.createElement('div')
            headline_desc.className = 'headline-desc'
            headline_desc.innerHTML = `${object.description}`

            let headline_info = document.createElement('div')
            headline_info.className = 'headline_info'
            headline_info.innerHTML = `<br>- From ${object.source.name}<br>- By ${object.author}`
            
            
            content_container.appendChild(headline_title)
            content_container.appendChild(headline_desc)
            headline_desc.appendChild(headline_info)
            newscard_front.appendChild(img)
            newscard_front.appendChild(content_container)
            newscontainer.appendChild(newscard_front)
            newscontainer.appendChild(newscard_back)
            
            news.appendChild(newscontainer)



            if(img.src=='http://127.0.0.1:5500/HTML/null'){
                img.src = '/IMAGES/alert.png'
            }
        })
    }
}
window.onload = function(){
    let cat  = localStorage.getItem('cat')
    if(cat!=null){
        news.innerHTML = null
        newschannel.retriveData(cat)
    }
}
let newschannel = new VpmNews()
