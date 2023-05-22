const $timers = document.querySelectorAll('.timer');

if ($timers.length > 0) {
  $timers.forEach($timer => {
    // получаем элементы, содержащие компоненты даты
  const $hours = $timer.querySelector('.timer__item--hours');
  const $minutes = $timer.querySelector('.timer__item--minutes');
  const $seconds = $timer.querySelector('.timer__item--seconds');

  // конечная дата
  const deadline = new Date($timer.dataset.deadline);
  // id таймера
  let timerId = null;
  // склонение числительных
  function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    const diff = deadline - new Date();

    if (diff <= 0) {
      clearInterval(timerId);
    }
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $hours.textContent = hours;
    $minutes.textContent = minutes;
    $seconds.textContent = seconds;
    $hours.dataset.title = declensionNum(hours, ['Час', 'Часа', 'Часов']);
    $minutes.dataset.title = declensionNum(minutes, [
      'Минута',
      'Минуты',
      'Минут',
    ]);
    $seconds.dataset.title = declensionNum(seconds, [
      'Секунда',
      'Секунды',
      'Секунд',
    ]);
  }
  // вызываем функцию countdownTimer
  countdownTimer();
  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 1000);
  })
}
