const floating = {
    template:`
    <div id="floatingMenu">
        <div class="main-button" id="floating-menu" @click="openClose">
            <i class="str-floating-menu"></i>
        </div>

        <nav class="side-navigation" :class="{active:status}">	
            <ul ref="fab">
                <li  v-for="(item,index) in items" :style="active ? estilos[index] : 'bottom:0'" class="menu-item" :class="classActive ? 'active' : 'deactive'">
                    <a @click.prevent="actions(item.type,item.value)"> #{item.title} <span :class="item.iconClass"></span></a>
                </li>
            </ul>
        </nav>
    </div>`,

    data: function(){
        return {
            status: false,
            classActive:false,
            duration:100,
            styles:[]
        };
    },

    computed: {
        items: function(){
            return this.menu.length > 0 ? this.menu.reverse() : [];
        },

        itemsActive: function(){
            return this.menu.length > 0 ? true : false;
        },

        active: function(){
            return this.classActive;
        },

        estilos: function(){
            return this.styles;
        }
    },

    mounted:function(){
        var self = this;
        var interval =  setInterval(function(){
            if(self.itemsActive){
                clearInterval(interval);
                self.items.map((e,index) => {
                    if(index == 0){
                        self.styles.push('bottom: 100px;');
                    } else {
                        self.styles.push('bottom: ' + ((60*index) + 100)  + 'px;')
                    }
                });
            }
        },1);
    },

    props:{
        menu:{type:Array},
    },

    methods:{
        openClose: function(){
            var self = this;
            self.status = !self.status,self.duration;
            if(self.status){
                setTimeout(() => {self.classActive = true;},self.duration)
            } else {
                self.classActive = false;
            }
        },

        actions: function(type,value){
            switch(type){
                case 'action':
                    value();
                    break;
                case 'ancla':
                    $("html, body").animate({scrollTop: $(value).offset().top - 80}, 2000);
                    break;
                case 'url':
                    window.open(value, '_self');
                    break;
            }
        }
    }
};