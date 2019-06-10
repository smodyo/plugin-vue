//prototypes
import sync from './prototypes/sync';
import random from './prototypes/random';
//methods and properties
import modyo from './modyo';
//filters
import capitalize from './filters/capitalize';
//directives
import onlyNumbers from './directives/onlyNumbers';
import rut from './directives/rut';
//components
import header from './components/header';
import footer from './components/footer';
import floatingMenu from './components/floatMenu';

const $modyoSantander = {
    install(Vue, options) {
        // prototypes generales
        Array.prototype.sync = sync;
        Array.prototype.random = random;

        // methodos o propiedades personalizadas
        Vue.prototype.$modyo = modyo;

        // filtros
        Vue.filter('capitalize', capitalize);

        // directivas
        Vue.directive('only-numbers', onlyNumbers);
        Vue.directive('rut', rut);

        // componentes
        Vue.component('s-header', header);
        Vue.component('s-footer', footer);
        Vue.component('s-floating-menu',floatingMenu);
    }
};