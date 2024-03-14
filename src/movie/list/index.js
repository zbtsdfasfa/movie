import $ from 'jquery'
import styles from './index.module.less'
let container;
function init() {
    container = $('<div>').addClass(styles.container).appendTo('#app');
}

init()


//根据传入的电影数组，创建元素，    填充到容器中，
export function createMovies(movies) {
    const result = movies.map(
        (m) => `<div>
  <a href="${m.url}" target="_blank"><img src="${m.cover}"></a>
  <a href="${m.url}" target="_blank"><p class="${styles.title}">${m.title}</p></a>
  <p class="${styles.rate}">${m.rate}</p>
  </div>`
    )
        .join('');
    container.html(result);
}