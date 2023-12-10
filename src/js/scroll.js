export function scrollToTop(duration) {
  const scrollHeight = window.scrollY;
  const scrollStep = Math.PI / (duration / 15);
  const cosParameter = scrollHeight / 2;

  let scrollCount = 0;
  let scrollMargin;

  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      scrollCount += 1;
      scrollMargin =
        cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      window.scrollTo(0, scrollHeight - scrollMargin);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}
