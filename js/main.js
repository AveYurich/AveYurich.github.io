if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cache.js')
      .then( reg => console.log('SW registered') )
      .catch( err => (`SW error ${err}`) )
  });
}