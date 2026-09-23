document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    // Keep navigation lightweight: no framework required.
  });
});
