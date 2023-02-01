/** @format */

let videos = document.getElementsByClassName('story-video');

function playPause(event) {
  let btn = event.target;
  let video = btn.nextElementSibling;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// * slide show

let storyIndex = 1;
showStories(storyIndex);

// function plusstories(n) {
//   showStories((storyIndex += n));
// }

function currentStory(n) {
  showStories((storyIndex = n));
}

function showStories(n) {
  let i;
  let stories = document.getElementsByClassName('story-card');
  let dots = document.getElementsByClassName('story-dot');
  if (n > stories.length) {
    storyIndex = 1;
  }
  if (n < 1) {
    storyIndex = stories.length;
  }
  for (i = 0; i < stories.length; i++) {
    stories[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  stories[storyIndex - 1].style.display = 'grid';
  dots[storyIndex - 1].className += ' active';
}
