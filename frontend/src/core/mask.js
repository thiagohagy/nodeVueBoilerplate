import Vue from 'vue';

Vue.directive('mask', (el, binding) => {
  if (typeof binding.value === 'object') {
    console.log('é objeto');
  } else if (binding.value == 'phone') {
    if (el.value && el.value.length > 0) {
      el.value = el.value.replace(/[^\d]/g, '');
      el.value = '(' + el.value;

      if (el.value.length > 3) {
        el.value = [el.value.slice(0, 3), ') ', el.value.slice(3)].join('');
      }

      if (el.value.length > 12) {
        if (el.value.length > 13) {
          el.value = [el.value.slice(0, 10), '-', el.value.slice(10)].join('');
        } else {
          el.value = [el.value.slice(0, 9), '-', el.value.slice(9)].join('');
        }
      }

      if (el.value.length > 15) {
        el.value = el.value.substr(0, 13);
      }
    }
  }
});

function mtel(v) {
  v = v.replace(/D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/^(d{2})(d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(d)(d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
  console.log(v);
  return v;
}
