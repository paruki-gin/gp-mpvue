function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function debounce(method,delay) {
  let timer = null;
  return function () {
      let self = this,
          args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
          method.apply(self,args);
      },delay);
  }
}

export function throttle(method, mustRunDelay) {
  let timer,
      args = arguments,
      start;
  return function loop() {
      let self = this;
      let now = Date.now();
      if(!start){
          start = now;
      }
      if(timer){
          clearTimeout(timer);
      }
      if(now - start >= mustRunDelay){
          method.apply(self, args);
          start = now;
      }else {
          timer = setTimeout(function () {
              loop.apply(self, args);
          }, 50);
      }
  }
}

export default formatNumber;
