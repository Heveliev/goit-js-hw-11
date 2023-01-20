import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/createMarkup';
import { getApi } from './js/getApi';
import { createMarkup } from './js/createMarkup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let lightbox = new SimpleLightbox('.gallery a',{captionsData:'data-user',captionDelay:250,captionPosition: 'bottom',});



const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

let pageNow = 0;
const totalPages= 40;
let inputVal = '';

const optionsInfinityScroll = {
    root: null,
    rootMargin: '400px',
    threshold : 1.0
};
const observer = new IntersectionObserver(onInfinityScroll,optionsInfinityScroll);



form.addEventListener('submit', onSubmit);


async function onSubmit (evt) {
    gallery.innerHTML = '';
    evt.preventDefault();
    pageNow = 1
 inputVal =  form.elements.searchQuery.value.trim();

if (!inputVal) {
    Notify.failure('Search is empty, can you write something!')
    return 
}

try {
 const getApiArr = await getApi(inputVal,pageNow,totalPages);
if (!getApiArr.total) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return
} else{Notify.success(`Hooray! We found ${getApiArr.totalHits} images.`) }

gallery.insertAdjacentHTML('beforeend',createMarkup(getApiArr.hits));
observer.observe(guard);
lightbox.refresh();
    } catch (err) {
    console.log(err)
}
};
async function onInfinityScroll(entr,obs){
    pageNow +=1;

    const getApiArr = await getApi(inputVal,pageNow,totalPages);
    const maxCard = pageNow * totalPages / getApiArr.totalHits;
    entr.forEach(ent => {
        if (inputVal === inputVal){if(ent.isIntersecting){
    try { 
        if(maxCard >=1){    
        obs.unobserve(guard);
        Notify.info("We're sorry, but you've reached the end of search results.");
} else{
    gallery.insertAdjacentHTML('beforeend',createMarkup(getApiArr.hits));
        lightbox.refresh();

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
          });
        }  
    }
    catch (err) {console.log(err)}
} 
    }});

};