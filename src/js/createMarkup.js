
function createMarkup(arr) {
 const mark = arr.reduce(
    (acc,{webformatURL,largeImageURL,tags,likes,views,comments,downloads,user}) => acc +`<a href="${largeImageURL}"><div class="photo-card">
<img src="${webformatURL}" alt="${tags}" data-user="Author: ${user}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes: ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views: ${views}</b>
  </p>
  <p class="info-item">
    <b>Comments: ${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: ${downloads}</b>
  </p>
</div>
</div></a>`,' ');
return mark
};

export {createMarkup};