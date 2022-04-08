'use strict'

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!', event);
  
    /*[DONE] remove class 'active' from all article links  */
const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    /*[DONE] add class 'active' to the clicked link */
    console.log('clickedElement', clickedElement)
    clickedElement.classList.add('active');
  
    /*[DONE] remove class 'active' from all articles */
const activeArticles = document.querySelectorAll('.post.active');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
  
    /*[DONE] get 'href' attribute from the clicked link */
const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
  
    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /*[DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);
titleList.innerHTML = '';
console.log(titleList)
  /* for each article */
const articles = document.querySelectorAll(optArticleSelector + customSelector);
let html = '';
console.log(html);
for (let article of articles){

    /* get the article id */
const articleId = article.getAttribute('Id');
console.log(articleId);
    /* find the title element */

    /* get the title from the title element */
const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
const linkHTMLData = {id: articleId, title: articleTitle};
const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
console.log(linkHTML, linkHTMLData);
}
    /* insert link into titleList */
titleList.innerHTML = html;
const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links){
    link.addEventListener('click', titleClickHandler);
}
}

generateTitleLinks();


