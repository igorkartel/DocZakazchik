/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/HomePage.js":
/*!************************************!*\
  !*** ./src/components/HomePage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
function HomePage() {

  const cardbtnmore = document.querySelector('.cards__button_more'),
    cardbtnhide = document.querySelector('.cards__button_hide'),
    cardmore = document.querySelector('.cards__button_m'),
    cardhide = document.querySelector('.cards__button_h'),
    body = document.querySelector('body'),
    returnButton = document.querySelector('.return-button'),
    board = document.querySelector('.board__cards_container')


    returnButton.addEventListener('click', ()=>{
      window.scrollTo(0, 0)
    })

    cardbtnhide.addEventListener('click', ()=>{
      cardhide.classList.toggle('active')
      cardmore.classList.toggle('active')
      board.classList.toggle('full')
    })

    cardbtnmore.addEventListener('click', ()=>{
      cardhide.classList.toggle('active')
      cardmore.classList.toggle('active')
      board.classList.toggle('full')
    })

  return    
}


/***/ }),

/***/ "./src/components/videoplayer.js":
/*!***************************************!*\
  !*** ./src/components/videoplayer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoPlayer: () => (/* binding */ VideoPlayer)
/* harmony export */ });
function VideoPlayer() {

  const videoPlayer = document.querySelector('.video-player'),
    video = document.querySelector('.main-video'),
    progressAreaTime = document.querySelector('.progressAreaTime'),
    controls = document.querySelector('.controls'),
    propertyAreaTime = document.querySelector('.progressAreaTime'),
    progressArea = document.querySelector('.progress-area'),
    progressBar = document.querySelector('.progress-bar'),

    iconPlay = document.querySelector('.icon__play'),
    iconVolume = document.querySelector('.icon__volume'),
    iconFullscreen = document.querySelector('.icon__fullscreen'),

    current = document.querySelector('.current'),
    duration = document.querySelector('.duration'),

    volumeRange = document.querySelector('.volume_range')


  video.addEventListener('loadeddata', ()=>{
    let videoDuration = video.duration
    let totalMin = Math.floor(videoDuration / 60)
    let totalSec = Math.floor(videoDuration % 60)
    
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec
    duration.innerText = `${totalMin}:${totalSec}`
  })

  video.addEventListener('ended', ()=>{
    iconPlay.innerText = 'replay'
  })

  video.addEventListener('timeupdate', ()=>{
    let videoCurrentDuration = video.currentTime
    let videoDuration = video.duration
    let totalMin = Math.floor(videoCurrentDuration / 60)
    let totalSec = Math.floor(videoCurrentDuration % 60)
    
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec
    
    progressBar.style.width = `${(videoCurrentDuration / videoDuration) * 100}%`
    
    current.innerText = `${totalMin}:${totalSec}`
  })

  window.addEventListener('webkitfullscreenchange', ()=> {
    if(iconFullscreen.innerText === 'fullscreen'){
      iconFullscreen.innerText = 'fullscreen_exit'
    } else if(iconFullscreen.innerText === 'fullscreen_exit'){
      iconFullscreen.innerText = 'fullscreen'
    }
  })

  iconPlay.addEventListener('click', ()=>{
    if(iconPlay.innerText === 'play_arrow' || iconPlay.innerText === 'replay'){
      video.play()
      iconPlay.innerText = 'pause'
    } else if(iconPlay.innerText === 'pause'){
      video.pause()
      iconPlay.innerText = 'play_arrow'
    }
  })

  iconFullscreen.addEventListener('click', ()=>{
    if(iconFullscreen.innerText === 'fullscreen'){
      videoPlayer.webkitRequestFullscreen()
    } else if(iconFullscreen.innerText === 'fullscreen_exit'){
      document.webkitExitFullscreen()
    }
  })

  iconVolume.addEventListener('click', ()=>{
    if(volumeRange.value == '0'){
      volumeRange.value = '80'
      iconVolume.innerText = 'volume_up'
    }else{
      volumeRange.value = '0'
      iconVolume.innerText = 'volume_off'
    }
    video.volume = Number(volumeRange.value) / 100
  })

  volumeRange.addEventListener('change', ()=>{
    video.volume = Number(volumeRange.value) / 100
      if(Number(volumeRange.value) == 0) {
        iconVolume.innerText = 'volume_off'
      }else if(Number(volumeRange.value) < 40){
        iconVolume.innerText = 'volume_down'
      }else{
        iconVolume.innerText = 'volume_up'
      }
  })

  progressArea.addEventListener('mousemove', (e)=>{
    let progressWidthval = progressArea.clientWidth
    let x = e.offsetX
    propertyAreaTime.style.setProperty('--x', `${x}px`)
    propertyAreaTime.style.display = "block"

    let videoDuration = video.duration
    let progressTime = Math.floor((x/progressWidthval)*videoDuration)
    let currentMin = Math.floor(progressTime / 60)
    let currentSec = Math.floor(progressTime % 60)
    currentSec < 10 ? currentSec = "0" + currentSec: currentSec
    propertyAreaTime.innerText = `${currentMin}:${currentSec}`
  })

  progressArea.addEventListener('click', (e)=>{
    let progressWidthval = progressArea.clientWidth
    let videoDuration = video.duration
    let clickOffsetX = e.offsetX

    video.currentTime = (clickOffsetX / progressWidthval) * videoDuration
  })

  progressArea.addEventListener('mouseleave', ()=>{
    propertyAreaTime.style.display = "none"
  })

  

  return    
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _components_HomePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/HomePage */ "./src/components/HomePage.js");
/* harmony import */ var _components_videoplayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/videoplayer */ "./src/components/videoplayer.js");

 
 

addEventListener("DOMContentLoaded", (event) => {
    (0,_components_HomePage__WEBPACK_IMPORTED_MODULE_1__.HomePage)()
    ;(0,_components_videoplayer__WEBPACK_IMPORTED_MODULE_2__.VideoPlayer)()
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZV9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ0FPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFNBQVMsR0FBRyxTQUFTO0FBQ2pELEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDZDQUE2QztBQUM5RTtBQUNBLDJCQUEyQixTQUFTLEdBQUcsU0FBUztBQUNoRCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVyxHQUFHLFdBQVc7QUFDN0QsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUMzSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQzJCO0FBQ007QUFDdEQ7QUFDQTtBQUNBLElBQUksOERBQVE7QUFDWixJQUFJLHFFQUFXO0FBQ2YsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaG9tZV9wYWdlLy4vc3JjL2luZGV4LnNjc3M/YTVkZSIsIndlYnBhY2s6Ly9ob21lX3BhZ2UvLi9zcmMvY29tcG9uZW50cy9Ib21lUGFnZS5qcyIsIndlYnBhY2s6Ly9ob21lX3BhZ2UvLi9zcmMvY29tcG9uZW50cy92aWRlb3BsYXllci5qcyIsIndlYnBhY2s6Ly9ob21lX3BhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaG9tZV9wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ob21lX3BhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ob21lX3BhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ob21lX3BhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGZ1bmN0aW9uIEhvbWVQYWdlKCkge1xyXG5cclxuICBjb25zdCBjYXJkYnRubW9yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc19fYnV0dG9uX21vcmUnKSxcclxuICAgIGNhcmRidG5oaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzX19idXR0b25faGlkZScpLFxyXG4gICAgY2FyZG1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHNfX2J1dHRvbl9tJyksXHJcbiAgICBjYXJkaGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc19fYnV0dG9uX2gnKSxcclxuICAgIGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JyksXHJcbiAgICByZXR1cm5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV0dXJuLWJ1dHRvbicpLFxyXG4gICAgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmRfX2NhcmRzX2NvbnRhaW5lcicpXHJcblxyXG5cclxuICAgIHJldHVybkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGJvZHkub2Zmc2V0VG9wID0gMFxyXG4gICAgfSlcclxuXHJcbiAgICBjYXJkYnRuaGlkZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGNhcmRoaWRlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGNhcmRtb3JlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2Z1bGwnKVxyXG4gICAgfSlcclxuXHJcbiAgICBjYXJkYnRubW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGNhcmRoaWRlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGNhcmRtb3JlLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGJvYXJkLmNsYXNzTGlzdC50b2dnbGUoJ2Z1bGwnKVxyXG4gICAgfSlcclxuXHJcbiAgcmV0dXJuICAgIFxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBWaWRlb1BsYXllcigpIHtcclxuXHJcbiAgY29uc3QgdmlkZW9QbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tcGxheWVyJyksXHJcbiAgICB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXZpZGVvJyksXHJcbiAgICBwcm9ncmVzc0FyZWFUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzQXJlYVRpbWUnKSxcclxuICAgIGNvbnRyb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2xzJyksXHJcbiAgICBwcm9wZXJ0eUFyZWFUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzQXJlYVRpbWUnKSxcclxuICAgIHByb2dyZXNzQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1hcmVhJyksXHJcbiAgICBwcm9ncmVzc0JhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKSxcclxuXHJcbiAgICBpY29uUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pY29uX19wbGF5JyksXHJcbiAgICBpY29uVm9sdW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmljb25fX3ZvbHVtZScpLFxyXG4gICAgaWNvbkZ1bGxzY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbl9fZnVsbHNjcmVlbicpLFxyXG5cclxuICAgIGN1cnJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudCcpLFxyXG4gICAgZHVyYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVyYXRpb24nKSxcclxuXHJcbiAgICB2b2x1bWVSYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVfcmFuZ2UnKVxyXG5cclxuXHJcbiAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsICgpPT57XHJcbiAgICBsZXQgdmlkZW9EdXJhdGlvbiA9IHZpZGVvLmR1cmF0aW9uXHJcbiAgICBsZXQgdG90YWxNaW4gPSBNYXRoLmZsb29yKHZpZGVvRHVyYXRpb24gLyA2MClcclxuICAgIGxldCB0b3RhbFNlYyA9IE1hdGguZmxvb3IodmlkZW9EdXJhdGlvbiAlIDYwKVxyXG4gICAgXHJcbiAgICB0b3RhbFNlYyA8IDEwID8gdG90YWxTZWMgPSBcIjBcIiArIHRvdGFsU2VjIDogdG90YWxTZWNcclxuICAgIGR1cmF0aW9uLmlubmVyVGV4dCA9IGAke3RvdGFsTWlufToke3RvdGFsU2VjfWBcclxuICB9KVxyXG5cclxuICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpPT57XHJcbiAgICBpY29uUGxheS5pbm5lclRleHQgPSAncmVwbGF5J1xyXG4gIH0pXHJcblxyXG4gIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCAoKT0+e1xyXG4gICAgbGV0IHZpZGVvQ3VycmVudER1cmF0aW9uID0gdmlkZW8uY3VycmVudFRpbWVcclxuICAgIGxldCB2aWRlb0R1cmF0aW9uID0gdmlkZW8uZHVyYXRpb25cclxuICAgIGxldCB0b3RhbE1pbiA9IE1hdGguZmxvb3IodmlkZW9DdXJyZW50RHVyYXRpb24gLyA2MClcclxuICAgIGxldCB0b3RhbFNlYyA9IE1hdGguZmxvb3IodmlkZW9DdXJyZW50RHVyYXRpb24gJSA2MClcclxuICAgIFxyXG4gICAgdG90YWxTZWMgPCAxMCA/IHRvdGFsU2VjID0gXCIwXCIgKyB0b3RhbFNlYyA6IHRvdGFsU2VjXHJcbiAgICBcclxuICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYCR7KHZpZGVvQ3VycmVudER1cmF0aW9uIC8gdmlkZW9EdXJhdGlvbikgKiAxMDB9JWBcclxuICAgIFxyXG4gICAgY3VycmVudC5pbm5lclRleHQgPSBgJHt0b3RhbE1pbn06JHt0b3RhbFNlY31gXHJcbiAgfSlcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCAoKT0+IHtcclxuICAgIGlmKGljb25GdWxsc2NyZWVuLmlubmVyVGV4dCA9PT0gJ2Z1bGxzY3JlZW4nKXtcclxuICAgICAgaWNvbkZ1bGxzY3JlZW4uaW5uZXJUZXh0ID0gJ2Z1bGxzY3JlZW5fZXhpdCdcclxuICAgIH0gZWxzZSBpZihpY29uRnVsbHNjcmVlbi5pbm5lclRleHQgPT09ICdmdWxsc2NyZWVuX2V4aXQnKXtcclxuICAgICAgaWNvbkZ1bGxzY3JlZW4uaW5uZXJUZXh0ID0gJ2Z1bGxzY3JlZW4nXHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgaWNvblBsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgaWYoaWNvblBsYXkuaW5uZXJUZXh0ID09PSAncGxheV9hcnJvdycgfHwgaWNvblBsYXkuaW5uZXJUZXh0ID09PSAncmVwbGF5Jyl7XHJcbiAgICAgIHZpZGVvLnBsYXkoKVxyXG4gICAgICBpY29uUGxheS5pbm5lclRleHQgPSAncGF1c2UnXHJcbiAgICB9IGVsc2UgaWYoaWNvblBsYXkuaW5uZXJUZXh0ID09PSAncGF1c2UnKXtcclxuICAgICAgdmlkZW8ucGF1c2UoKVxyXG4gICAgICBpY29uUGxheS5pbm5lclRleHQgPSAncGxheV9hcnJvdydcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBpY29uRnVsbHNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICBpZihpY29uRnVsbHNjcmVlbi5pbm5lclRleHQgPT09ICdmdWxsc2NyZWVuJyl7XHJcbiAgICAgIHZpZGVvUGxheWVyLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcclxuICAgIH0gZWxzZSBpZihpY29uRnVsbHNjcmVlbi5pbm5lclRleHQgPT09ICdmdWxsc2NyZWVuX2V4aXQnKXtcclxuICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIGljb25Wb2x1bWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgaWYodm9sdW1lUmFuZ2UudmFsdWUgPT0gJzAnKXtcclxuICAgICAgdm9sdW1lUmFuZ2UudmFsdWUgPSAnODAnXHJcbiAgICAgIGljb25Wb2x1bWUuaW5uZXJUZXh0ID0gJ3ZvbHVtZV91cCdcclxuICAgIH1lbHNle1xyXG4gICAgICB2b2x1bWVSYW5nZS52YWx1ZSA9ICcwJ1xyXG4gICAgICBpY29uVm9sdW1lLmlubmVyVGV4dCA9ICd2b2x1bWVfb2ZmJ1xyXG4gICAgfVxyXG4gICAgdmlkZW8udm9sdW1lID0gTnVtYmVyKHZvbHVtZVJhbmdlLnZhbHVlKSAvIDEwMFxyXG4gIH0pXHJcblxyXG4gIHZvbHVtZVJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT57XHJcbiAgICB2aWRlby52b2x1bWUgPSBOdW1iZXIodm9sdW1lUmFuZ2UudmFsdWUpIC8gMTAwXHJcbiAgICAgIGlmKE51bWJlcih2b2x1bWVSYW5nZS52YWx1ZSkgPT0gMCkge1xyXG4gICAgICAgIGljb25Wb2x1bWUuaW5uZXJUZXh0ID0gJ3ZvbHVtZV9vZmYnXHJcbiAgICAgIH1lbHNlIGlmKE51bWJlcih2b2x1bWVSYW5nZS52YWx1ZSkgPCA0MCl7XHJcbiAgICAgICAgaWNvblZvbHVtZS5pbm5lclRleHQgPSAndm9sdW1lX2Rvd24nXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGljb25Wb2x1bWUuaW5uZXJUZXh0ID0gJ3ZvbHVtZV91cCdcclxuICAgICAgfVxyXG4gIH0pXHJcblxyXG4gIHByb2dyZXNzQXJlYS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcclxuICAgIGxldCBwcm9ncmVzc1dpZHRodmFsID0gcHJvZ3Jlc3NBcmVhLmNsaWVudFdpZHRoXHJcbiAgICBsZXQgeCA9IGUub2Zmc2V0WFxyXG4gICAgcHJvcGVydHlBcmVhVGltZS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS14JywgYCR7eH1weGApXHJcbiAgICBwcm9wZXJ0eUFyZWFUaW1lLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcclxuXHJcbiAgICBsZXQgdmlkZW9EdXJhdGlvbiA9IHZpZGVvLmR1cmF0aW9uXHJcbiAgICBsZXQgcHJvZ3Jlc3NUaW1lID0gTWF0aC5mbG9vcigoeC9wcm9ncmVzc1dpZHRodmFsKSp2aWRlb0R1cmF0aW9uKVxyXG4gICAgbGV0IGN1cnJlbnRNaW4gPSBNYXRoLmZsb29yKHByb2dyZXNzVGltZSAvIDYwKVxyXG4gICAgbGV0IGN1cnJlbnRTZWMgPSBNYXRoLmZsb29yKHByb2dyZXNzVGltZSAlIDYwKVxyXG4gICAgY3VycmVudFNlYyA8IDEwID8gY3VycmVudFNlYyA9IFwiMFwiICsgY3VycmVudFNlYzogY3VycmVudFNlY1xyXG4gICAgcHJvcGVydHlBcmVhVGltZS5pbm5lclRleHQgPSBgJHtjdXJyZW50TWlufToke2N1cnJlbnRTZWN9YFxyXG4gIH0pXHJcblxyXG4gIHByb2dyZXNzQXJlYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgbGV0IHByb2dyZXNzV2lkdGh2YWwgPSBwcm9ncmVzc0FyZWEuY2xpZW50V2lkdGhcclxuICAgIGxldCB2aWRlb0R1cmF0aW9uID0gdmlkZW8uZHVyYXRpb25cclxuICAgIGxldCBjbGlja09mZnNldFggPSBlLm9mZnNldFhcclxuXHJcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IChjbGlja09mZnNldFggLyBwcm9ncmVzc1dpZHRodmFsKSAqIHZpZGVvRHVyYXRpb25cclxuICB9KVxyXG5cclxuICBwcm9ncmVzc0FyZWEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpPT57XHJcbiAgICBwcm9wZXJ0eUFyZWFUaW1lLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gIH0pXHJcblxyXG4gIFxyXG5cclxuICByZXR1cm4gICAgXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9pbmRleC5zY3NzJ1xyXG5pbXBvcnQgeyBIb21lUGFnZSB9IGZyb20gJy4vY29tcG9uZW50cy9Ib21lUGFnZScgXHJcbmltcG9ydCB7IFZpZGVvUGxheWVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3ZpZGVvcGxheWVyJyBcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIChldmVudCkgPT4ge1xyXG4gICAgSG9tZVBhZ2UoKVxyXG4gICAgVmlkZW9QbGF5ZXIoKVxyXG59KTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==