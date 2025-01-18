function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('card-visible');
      observer.unobserve(entry.target);
    }
  });
}
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});
document.querySelectorAll('.card-experiences').forEach(card => {
  observer.observe(card);
});
