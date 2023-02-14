let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        // inStock: false, 
        brand: 'Vue Mastery',
        inventory: 12,
        OnSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [{variantId: 2234, variantColor: 'green', variantImage: "./assets/vmSocks-green-onWhite.jpg"}, 
                  {variantId: 2235, variantColor: 'blue', variantImage: "./assets/vmSocks-blue-onWhite.jpg"}],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 1,
    },      
    methods: {  
    addToCart() {
        this.cart += 1
        this.inventory -= 1
    } ,

    deleteFromCart() {
        this.cart -= 1
        this.inventory += 1
        },

    updateProduct(variantImage) {
        this.image = variantImage
    }
},


    computed: {
    title() {
        return this.brand + ' ' + this.product;
    }
}
             
             
              
 })
 
 
//  Экземпляр Vue —  Этот объект содержит различные свойства и методы, которые дают экземпляру Vue возможность хранить данные и выполнять какие-то действия.


Vue.component('product', {
    template: `
    <div class="product">
     ...
    </div>
  `,
    data() {
        return {
            // тут будут данные
        }
    },
    methods: {
        // тут будут методы
    },
    computed: {
        // тут будут вычисляемые свойства
    }
 })
 
 