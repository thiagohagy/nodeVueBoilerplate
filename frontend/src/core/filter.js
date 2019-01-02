
import Vue from 'vue';
import moment from 'moment';

Vue.filter('datetime',  (value) => {
  return value ? moment(value).format('DD/MM/YYYY HH:mm') : value;
});

Vue.filter('date',  (value) => {
  return value ? moment(value).format('DD/MM/YYYY') : value;
});

Vue.filter('time', (value) => {
  return value ? moment(value).format('HH:mm') : value;
});

Vue.filter('money',  (value) => {
  return value ? value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL' }) : 'R$0,00';
});

Vue.filter('phone', (value) => {
  if (value) {
    const newValue = value.toString();
    if (newValue.length === 11) {
      return newValue.replace(/(\d\d)(\d\d\d\d\d)(\d\d\d\d)/, '($1)$2-$3');
    } else if (newValue.length === 10) {
      return newValue.replace(/(\d\d)(\d\d\d\d)(\d\d\d\d)/, '($1)$2-$3');
    }
  } else {
    return value;
  }
});

Vue.filter('cpfcnpj',  (value) => {
  if (value) {
    return value.toString().replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
  }
});
