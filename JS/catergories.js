let catergories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
];

let catdiv = document.querySelector('.catergories')

catergories.forEach(function(catergory,index){
    let bt = document.createElement('button')
    bt.id = `button${index}`
    bt.classList.add('btn','bt')
    bt.innerText = catergory
    catdiv.appendChild(bt)
})