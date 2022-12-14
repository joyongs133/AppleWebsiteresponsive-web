import joyongs from '../data/ipads.js'
import navigations from '../data/navigations.js'


//장바구니
const basketStartEl = document.querySelector('header .basket-starter')
const basketEl = basketStartEl.querySelector('.basket')


basketStartEl.addEventListener('click', function(event) {
  event.stopPropagation()
 if( basketEl.classList.contains('show')) {
  hideBasket()
 } else {
  showBasket()
 }
})

basketEl.addEventListener('click', function(event) {
  event.stopPropagation();
})

window.addEventListener('click', function() {
 basketEl.classList.remove('show')
})

function showBasket() {
  basketEl.classList.add('show')
}

function hideBasket() {
  basketEl.classList.remove('show')
   
}

//검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = document.querySelector('.search-wrap .search-closer')
const shadowEl = document.querySelector('.search-wrap .shadow')
const searchInputEl = document.querySelector('.search-wrap input');
const searchDelays = [...document.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation()
  hideSearch()
})
shadowEl.addEventListener('click', hideSearch)


function showSearch() {
  headerEl.classList.add('searching');
 
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });
  searchDelays.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelays.length + 's'
  })
 setTimeout(function () {
  searchInputEl.focus();
 }, 600)

}
function playScroll() {
 document.documentElement.remove('fixed')
}
function stopScroll() {
  document.documentElement.add('fixed')
}

function hideSearch() {
  headerEl.classList.remove('searching');

  headerMenuEls.reverse.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  });
  searchDelays.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelays.length + 's'
  });
  searchDelays.reverse();
  searchInputEl.value = '';
  }

  // 헤더 메뉴 토글!
  const menuStarterEl = document.querySelector('header .menu-starter') 
    menuStarterEl.addEventListener('click', function () {
      if(headerEl.classList.contains('menuing')) {
        headerEl.classList.remove('menuing');
        searchInputEl.value = '';
        playScroll()
      } else {
          headerEl.classList.add('menuing')
          stopScroll()
      }
    
    })
  

  //헤더 검색!
  const searchTextFiledEl = document.querySelector('header .textfield')
  const searchCancelEl = document.querySelector('header .search-caneler')
  searchTextFiledEl.addEventListener('click', function () {
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus()
  })
  searchCancelEl.addEventListener('click', function () {
  headerEl.classList.remove('searching--mobile');
})


window.addEventListener('resize', function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
  }  else {
    headerEl.classList.remove('searching--mobile')
  }

})


const navEl =  document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function() {
  if (navEl.classList.contains('menuing')) {
   addNavMenu()
  } else {
      hideNavMenu()
  }
})


navEl.addEventListener('click', function (event) {
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', function () {
  hideNavMenu()
})

window.addEventListener('click', function () {
 hideNavMenu();
})

function hideNavMenu() {
  navEl.classList.add('menuing')
}

function addNavMenu() {
  navEl.classList.remove("menuing")
}




  // 요소의 가시성 관찰

  const io = new IntersectionObserver(function (entries) {
   entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
   })
  })

  const inFoEls = document.querySelectorAll('.info')
  inFoEls.forEach(function (el) {
    io.observe(el)
  })


  // 비디오 재생

  const video = document.querySelector('.stage video');

  const playBtn = document.querySelector('.stage .controller--play')
  const pauseBtn = document.querySelector('.stage .controller--pause')

  playBtn.addEventListener('click', function () {
    video.play()
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
  })

  pauseBtn.addEventListener('click', function () {
    video.pause()
    playBtn.classList.remove('hide');
    pauseBtn.classList.add('hide');
  })

// 당신에게 맞는 iPad는?

const itemsEl = document.querySelector('section.compare .items')
joyongs.forEach(function (joyong) {
   const itemEl = document.createElement('div')
   itemEl.classList.add('item')
  
  let colorList = ''
  joyong.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color}"></li>`;
  })
  
  itemEl.innerHTML = /* html */`
   <div class="thumnail">
    <img src="${joyong.thumbnail}" alt="${joyong.name}" />
   </div>
   <ul class="colors">
    ${colorList}
   </ul>
   <h3 class="name">${joyong.name}</h3>
   <p class="tagline">${joyong.tagline}</p>
   <p class="price">₩${joyong.price.toLocaleString('en-US')}부터</p>
   <button class="btn">구입하기</button>
   <a href="${joyong.url}" class="link">더 알아보기</a>`
   
   itemsEl.append(itemEl)
})

const navigationsEl = document.querySelector('footer .navigations')

navigations.forEach(function (nav) {
   const mapEl = document.createElement('div')
   mapEl.classList.add('map')

   let mapList = ''
   nav.maps.forEach(function (map) {
    mapList += /* html */ `<li>
    <a href="${map.url}">${map.name}</a>
    </li>`
   })

   mapEl.innerHTML =/* html */ `
   <h3>
    <span class="text">${nav.title}</span>
</span>
<ul>
 ${mapList}
</ul>
`
navigationsEl.append(mapEl)
   
})

const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear()