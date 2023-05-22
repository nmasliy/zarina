const videoWrapper = document.querySelector('.about__video-wrapper')

if (videoWrapper) {
  const video = videoWrapper.querySelector('video');

  videoWrapper.addEventListener('click', function() {
    if (video.paused) {
      videoWrapper.classList.add('is-active');
      video.play();
    } else {
      video.pause();
    }
  })
}
