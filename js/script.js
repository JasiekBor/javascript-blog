'use strict'

const optArticleSelector = '.post',
    optActiveArticlesSelector = '.post.active',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optTitleLinksSelector = '.titles a',
    optActiveTitleLinksSelector = '.titles a.active',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    activeTagSelector = 'a.active[href^="#tag-"]',
    optTagLinksSelector = '.post-tags ul li a',
    optSideLinksSelector = '.list.tags a',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.list.authors',
    optAuthorLinksSelector = '.list.authors a',
    optActiveAuthorLinksSelector = 'a.active[href^="#author-"]';

    

    function titleClickHandler(event){
        event.preventDefault ();
        console.log('Link was clicked!', event);
        const clickedElement = this;
      
        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll(optActiveTitleLinksSelector);
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');
        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll(optActiveArticlesSelector);
        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');
        console.log(articleSelector);
        /* find the correct article using the selector (value of 'href' attribute) */
        const selectedArticle = document.querySelector(articleSelector);
        console.log(selectedArticle);
        /* add class 'active' to the correct article */
        selectedArticle.classList.add('active');
      }
      
      const links = document.querySelectorAll('.titles a');
      
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
      }

    function generateTitleLinks (customselector = ''){

    /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
    /* for each article */
    const articles = Array.from(document.querySelectorAll(optArticleSelector.trim() + customselector));
       
    /* create HTML of the link */
const markup = articles
.map(
    (article) =>
    `<li><a href="#${article.getAttribute('id')}"><span>${
        article.querySelector(optTitleSelector).innerText
      }</span></a></li>`
)
      .join ('');
    /* insert link into titleList */  
      titleList.innerHTML = markup;
      // add event listeners to JS-generated links
      const links = document.querySelectorAll(optTitleLinksSelector);
      for(let link of links){
          link.addEventListener('click', titleClickHandler);
      }
    };
    generateTitleLinks();

    function generateTags(){
        let allTags = [];
        /* find all articles */
        const articles = Array.from(document.querySelectorAll(optArticleSelector));
        console.log(articles);
        /* START LOOP: for every article: */
        for(let article of articles){
          /* find tags wrapper */
        const tagWrapper = article.querySelector(optArticleTagsSelector);
          /* make html variable with empty string */
        let html = '';
          /* get tags from data-tags attribute */
      
          /* split tags into array */
        const tags = article.getAttribute('data-tags').split(' ');
        console.log(tags);
          /* START LOOP: for each tag */
        for(let tag of tags){
            /* generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            /* add generated code to html variable */
        html +=linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
          /* END LOOP: for each tag */
        }}
          /* insert HTML of all the links into the tags wrapper */
        tagWrapper.insertAdjacentHTML('afterbegin', html);
        /* END LOOP: for every article: */
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector);

        /* [NEW] add html from allTags to tagList */
        tagList.innerHTML = allTags.join(' ');  
      } 
    }
      
      generateTags();

      function tagClickHandler(event){
        /*[DONE] prevent default action for this event */
        event.preventDefault();
        /*[DONE] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /*[DONE] make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll(activeTagSelector);
        /* START LOOP: for each active tag link */
        for(let activeTagLink of activeTagLinks){
          /* remove class active */
        activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
      }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const foundLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for(let foundLink of foundLinks){
          /* add class active */
        foundLink.classList.add('active');
        /* END LOOP: for each found tag link */
        }  
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    
        };

      
      function addClickListenersToTags(){
        /* find all links to tags */
        const tagLinks = Array.from(document.querySelectorAll(optTagLinksSelector));
        const sideLinks = Array.from(document.querySelectorAll(optSideLinksSelector));
        console.log(tagLinks, sideLinks);
        /* START LOOP: for each link */
        /* add tagClickHandler as event listener for that link */
        tagLinks.forEach(link => link.addEventListener('click', tagClickHandler));
        sideLinks.forEach(link => link.addEventListener('click', tagClickHandler));
        /* END LOOP: for each link */
         
    };
      
      addClickListenersToTags();

      function generateAuthors(){
        const articles = Array.from(document.querySelectorAll(optArticleSelector));
        //Add author names to each articcle
        let authorNames = {};
        articles.forEach(article => {
          const author = article.getAttribute('data-author');
          const authorElement = article.querySelector(optArticleAuthorSelector);
          authorElement.innerText = author;
          if (!authorNames[author]){
            authorNames[author] = 1;
          } else {
            authorNames[author] ++;
          }
        });
        let html = '';
        Object.keys(authorNames).forEach(name => {
          html += `<li>
                      <a href="#author-${name.split(' ').join('-')}" class="author-link">
                      <span class="author-name">${name}</span>
                      </a>(${authorNames[name]})</li>`;
        });
        const authorNameWrapper = document.querySelector(optAuthorListSelector);
        authorNameWrapper.insertAdjacentHTML('afterbegin', html);
      };
        generateAuthors();

        const authorClickHandler = function(event) {
          event.preventDefault();
          const clickedElement = this;
          const href = clickedElement.getAttribute('href');
          const author = clickedElement.innerText.trim();
          const activeAuthorLinks = document.querySelectorAll(optActiveAuthorLinksSelector);
          activeAuthorLinks.forEach(link => link.classList.remove('active'));
          const foundLinks = document.querySelectorAll('a[href="' + href + '"]');
          foundLinks.forEach(link => link.classList.add('active'));
          generateTitleLinks('[data-author="' + author + '"]');
        };
      
        const addClickListenersToAuthors = function (){
          const authorLinks = Array.from(document.querySelectorAll(optAuthorLinksSelector));
          authorLinks.forEach(link => link.addEventListener('click', authorClickHandler));  
        };
          addClickListenersToAuthors();
