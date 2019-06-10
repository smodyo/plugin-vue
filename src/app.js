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
        Vue.component('s-floating-menu',floating);
    }
};