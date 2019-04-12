function timestamp(timestamp) {
  var date = new Date(+timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = change(date.getDate()) + ' ';
  var h = change(date.getHours()) + ':';
  var m = change(date.getMinutes()) + ':';
  var s = change(date.getSeconds());
  console.log(Y + M + D)
  return Y + M + D;
}
function change(t) {
  if (t < 10) {
      return "0" + t;
  } else {
      return t;
  }
}

export default timestamp