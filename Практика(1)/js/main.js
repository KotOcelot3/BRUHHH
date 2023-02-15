let eventBus = new Vue()

Vue.component('product', {
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText"/>
            </div>
                <div class="product-info">
                        <h1>{{ title }}</h1>
                        <p v-if="inventory > 10">В наличии: {{inventory}} товаров</p>
                        <p v-else-if="inventory <= 10 && inventory > 0">Почти распроданно : {{inventory}} товаров</p>
                        <p :class="{ OutOfInventory: inventory <= 0 }" v-else="inventory">Нет в наличии</p>
                        <span v-show="OnSale && inventory > 0">{{ Sale }}</span> 
                        <p>Состав:</p>
                        <product-details></product-details>
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
            <div class="cart">
                <p>Товаров в корзине: {{ cart }}</p>
                <button :disabled="cart <= 0" :class="{ disabledButton: cart <= 0 }" @click ="deleteFromCart(cart)">Удалить товар</button>
                
            </div>
            <button :disabled="inventory <= 0" :class="{ disabledButton: inventory <= 0 }" @click="addToCart(cart)">Добавить в корзину</button>
               
             
        <product-tabs :reviews="reviews" :premium="premium"></product-tabs>
        </div>
    </div>
    
  `,
    data() {
        return {
            product: "Socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            brand: 'Vue Mastery',
            cart: 0,
            OnSale: true,
            reviews: [],
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [{variantId: 2234, variantColor: 'green', variantImage: "./assets/vmSocks-green-onWhite.jpg", variantQuantity: 15}, 
                        {variantId: 2235, variantColor: 'blue', variantImage: "./assets/vmSocks-blue-onWhite.jpg", variantQuantity: 5}],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
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
        },
    
        deleteFromCart() {
            this.cart -= 1
            this.variants[this.selectedVariant].variantQuantity += 1
            },
    
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },   
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
    
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        }, 
        inventory(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        Sale(){
            return "Проходит распродажа";
        },
        shipping() {  //Если в параметре this.premium хранится true — вычисляемое свойство shipping вернёт Free. В противном случае оно вернёт 2.99.
            if (this.premium) {
                return "бесплатно";
            } else {
                return 2.99
            }
         }  
    },    
 })
 
Vue.component('product-details', {
    template: `
        <ul>
            <li v-for="detail in details"> {{ detail }}</li>  <!-- v-for - перебирает массив -->
        </ul>
  `,
    data() {
        return {
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        }
    }
 })
 
 Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Исправьте ошибки:</b>
           <ul>
             <li v-for="error in errors">{{ error }}</li>
           </ul>
    </p>
  
  <div class="picked">
  
  <p>Рекомендовали-бы этот продукт?</p>
   <input type="radio" id="Yes" value="Yes" name="picked"  v-model="picked" />
          <label for="Yes">Да</label>
    <br />
    <input type="radio" id="No" value="No" name="picked" v-model="picked" />
          <label for="No">Нет</label>
    <br />
  
  </div>
  
   <p>
     <label for="name">Название:</label>
     <input id="name" v-model="name" placeholder="name">
   </p>
  
   <p>
     <label for="review">Комментарий:</label>
     <textarea id="review" v-model="review"></textarea>
   </p>
  
   <p>
     <label for="rating">Оценка:</label>
     <select id="rating" v-model.number="rating">
       <option>5</option>
       <option>4</option>
       <option>3</option>
       <option>2</option>
       <option>1</option>
     </select>
   </p>
  
   <p>
     <input type="submit" value="Подтвердить"> 
   </p>
</form>
  `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            picked: '',
        }
    },
    methods:{
        onSubmit() {
            if (this.name && this.review && this.rating && this.picked) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    picked: this.picked
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.picked = null
            } else {
                if (!this.name) this.errors.push("Необходимо название")
                if (!this.review) this.errors.push("Необходим комментарий")
                if (!this.rating) this.errors.push("Необходима оценка")
                if (!this.picked) this.errors.push("необходим выбор")
            }
        },


    },

})

Vue.component('product-tabs', {
    template: `
   <div>   
       <ul>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab">{{ tab }}
            </span>
       </ul>
       <div v-show="selectedTab == 'Отзывы'">
       
            <h2>Отзывы</h2>
            
            
                    <ul>
                      <li v-for="review in reviews">
                      <p>Название:{{ review.name }}</p>
                      <p>Рейтинг: {{ review.rating }}</p>
                      <p>Комментарий:{{ review.review }}</p>
                      <span>Вопрос: {{ review.picked }}</span>
                      </li>
                    </ul>
        </div>
            <div v-show="selectedTab === 'Оставить отзыв'">
                <product-review></product-review>
            </div>
        
            <div v-show="selectedTab === 'Доставка'">
                <p>Доставка: {{ shipping }}</p>
            </div>
        
            <div v-show="selectedTab === 'Информация'">
                <product-details/>
            </div>
        
     </div>
   
 `,
    data() {
        return {
            tabs: ['Отзывы', 'Оставить отзыв', 'Доставка', 'Информация'],
            selectedTab: 'Отзывы'  // устанавливается с помощью @click
        }
    },
    props: {

        reviews: {
            type: Array,
            required: false,
            },

        premium: {
            type: Boolean,
            required: true
        }
    },
    computed: {

        shipping() {
            if (this.premium) {
                return "Бесплатно";
            } else {
                return 2.99
            }
        }
    }

})


 let app = new Vue({
    el: '#app', 
    data: {
        premium: true,
    },
            
 })