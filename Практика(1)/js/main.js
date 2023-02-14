//  Экземпляр Vue —  Этот объект содержит различные свойства и методы, которые дают экземпляру Vue возможность хранить данные и выполнять какие-то действия.
Vue.component('product', {
    template: `
        <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            
            <!-- <p v-if="inStock">In Stock</p> -->
            <p v-if="inventory > 10">В наличии: {{inventory}} товаров</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Почти распроданно : {{inventory}} товаров</p>
            <p :class="{ OutOfInventory: inventory <= 0 }" v-else="inventory">Нет в наличии</p>
            <span v-show="OnSale && inventory > 0"><p> {{ sale }}</p></span> 
            <p>Состав:</p>

            <ul>
                <li v-for="detail in details"> {{ detail }}</li>  <!-- v-for - перебирает массив -->
                <p>Доставка: {{ shipping }}</p>

            </ul>

            <p>Размеры:</p>
            
            

            <ul>
                <li v-for="size in sizes "> {{ size }}</li>
            </ul>
            
            <div
            class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor:variant.variantColor }"  
            @mouseover="updateProduct(index)">  <!-- @ = v-on -->
            </div>
            <p>Доставка: {{shipping}}</p>
            <div class="cart">
                <p>Товаров в корзине: {{ cart }}</p>
                <button :disabled="cart <= 0" :class="{ disabledButton: cart <= 0 }" @click ="deleteFromCart(cart)">Удалить товар</button>
                
            </div>

            <button :disabled="inventory <= 0" :class="{ disabledButton: inventory <= 0 }" @click="addToCart(cart)">Добавить в корзину</button>
        </div>
    </div>
  `,
    data() {
        return {
        product: "Socks",
        selectedVariant: 0,
        altText: "A pair of socks",
        // inStock: false, 
        brand: 'Vue Mastery',
        // inventory: 12,
        OnSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [{variantId: 2234, variantColor: 'green', variantImage: "./assets/vmSocks-green-onWhite.jpg", variantQuantity: 10}, 
                  {variantId: 2235, variantColor: 'blue', variantImage: "./assets/vmSocks-blue-onWhite.jpg", variantQuantity: 5}],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
        }
    },
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    
    methods: {
        addToCart() {
            this.cart += 1
            this.variants[this.selectedVariant].variantQuantity -= 1
        } ,
    
        deleteFromCart() {
            this.cart -= 1
            this.variants[this.selectedVariant].variantQuantity += 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
            }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].variantImage;
         },
        
        title() {
            return this.brand + ' ' + this.product;
        },
        inventory(){
            return this.variants[this.selectedVariant].variantQuantity
         },
         
        sale() {
              return ' Распродажа!'
        },
        shipping() {
            if (this.premium) {
                return "Бесплатно";
            } else {
                return 2.99
            }
        }
    },
        
 }),

 
 


 Vue.component('product-details', {
    template: `
        <ul>
            <li v-for="detail in details"> {{ detail }}</li>
        </ul>
        `,
         data() {
            return {
                details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            }
        },

        methods:{
            onSubmit() {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.name = null
                this.review = null
                this.rating = null
            }
        }
 })

Vue.component('product-review', {
    template: `
    <input>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    }
    
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
    cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        }
    }
    })