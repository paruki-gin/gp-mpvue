function timestamp(timestamp) {
  const change = function (t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
  }
  let date = new Date(+timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = change(date.getDate()) + ' ';
  let h = change(date.getHours()) + ':';
  let m = change(date.getMinutes()) + ':';
  let s = change(date.getSeconds());
  return (Y + M + D + h + s);
}

export default timestamp