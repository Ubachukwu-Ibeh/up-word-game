const images = document.querySelectorAll('[data-src]');

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }
    img.src = src;
}
const imgObserver = new IntersectionObserver((e, i) => {
    e.forEach(e=>{
        if(!e.isIntersecting){
            return;
        }else{
            preloadImage(e.target);
            imgObserver.unobserve(e.target);
        }
    })
});

images.forEach(i =>{
    imgObserver.observe(i);
})
export let lazy;