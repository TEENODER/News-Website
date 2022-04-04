let progressbar = document.createElement('div')
progressbar.id = 'progress-bar'
document.querySelector('body').appendChild(progressbar)
document.body.onscroll = function(){
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let percent = ((winScroll/height)*100);
    document.getElementById('progress-bar').style.width = `${percent}%` 
    console.log(percent);
}