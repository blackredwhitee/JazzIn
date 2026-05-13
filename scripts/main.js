/* ============================================================
   JAZZIN — СКРИПТЫ САЙТА
   Файл: scripts/main.js

   Здесь находится вся интерактивность сайта:
   1. Плавный параллакс на главном экране
   2. Подсветка навигации при прокрутке
   3. Анимация появления блоков
   ============================================================ */


/* ============================================================
   1. ПАРАЛЛАКС НА ГЛАВНОМ ЭКРАНЕ

   Фото на главном экране немного смещается при прокрутке —
   создаёт объёмный кинематографичный эффект.

   Убрать эффект: удалите весь этот блок
   Усилить: увеличьте 0.12 (например, до 0.25)
   Ослабить: уменьшите 0.12 (например, до 0.05)
   ============================================================ */

window.addEventListener('scroll', function () {
  var heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    var scrolled = window.scrollY;
    heroPhoto.style.transform = 'translateY(' + (scrolled * 0.12) + 'px)';
  }
});


/* ============================================================
   2. НАВИГАЦИЯ — ТЁМНЫЙ БОРДЕР ПРИ ПРОКРУТКЕ

   Когда пользователь прокручивает вниз — нижняя граница
   навигации становится чуть заметнее.
   ============================================================ */

window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  if (window.scrollY > 60) {
    nav.style.borderBottomColor = 'rgba(184, 152, 42, 0.28)';
  } else {
    nav.style.borderBottomColor = 'rgba(184, 152, 42, 0.15)';
  }
});


/* ============================================================
   3. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ

   Когда блок появляется в поле зрения при прокрутке —
   он плавно появляется снизу.

   Убрать анимацию: удалите весь этот блок.
   Изменить скорость: найдите '0.65s' и замените на другое
   значение (например, '0.4s' — быстрее, '1s' — медленнее).
   ============================================================ */

/* Список классов элементов, которые анимируются */
var animatedSelectors = [
  '.concept-card',
  '.zone-card',
  '.rev-card',
  '.tg-card',
  '.scene-copy',
  '.mat-card',
  '.tier',
  '.access-step',
  '.inv-point',
  '.inv-metric',
  '.biz-block'
].join(', ');

/* Применяем начальное состояние (невидимый, смещённый вниз) */
document.querySelectorAll(animatedSelectors).forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
});

/* Наблюдатель: как только блок попадает в экран — показываем его */
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      /* Отключаем наблюдение — чтобы анимация сработала только один раз */
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08  /* блок должен появиться хотя бы на 8% чтобы сработать */
});

document.querySelectorAll(animatedSelectors).forEach(function (el) {
  observer.observe(el);
});
