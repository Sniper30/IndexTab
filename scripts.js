
console.log('klk mio')

  chrome.runtime.onMessage.addListener(
    function(request) {
     console.log(request)
    }
  );

