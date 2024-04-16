import axios from 'axios'
import { mapGetters } from 'vuex';
import moment from 'moment'
import { useVuelidate } from '@vuelidate/core'
import { required} from '@vuelidate/validators'
import $ from 'jquery';

// import bcrypt from 'bcryptjs';

export default{
    setup () {
 
        return{
        v$ : useVuelidate(),
    
        }
      },
      validations() {
        return {
          newPassword: { required, $autoDirty: true },
          oldPassword: { required, $autoDirty: true },
          confirmPassword: {
            required,
            $autoDirty: true,
            // sameAs: sameAs(this.newPassword)
          }
        };
      },

    data(){
        return{
            getPw:'',
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            loginStatus: false,
            username:'',
            email:'',
            user_name:'',
            moment:moment,
            isPasswordMatched: false,
            formSubmitted: false,
            successStatus:false,
            successUserStatus:false,
            getUserData:{},
            srcImage:'',
        }
    },
    computed: {
     
        ...mapGetters(["storageToken","storageUserData","storageOrderTotal"]),
        dataOrderList() {
          return this.storageOrderTotal;
        },
        dataUserList() {
          return this.storageUserData;
        },
    },
    
    methods:{
      home(){
        if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
            this.$router.push({
                name: 'BookCollection',
            })
         }else{
            this.$router.push({
                name: 'LoginView',
            })
         }
    },
        handleFileUpload(event) {
            this.file = event.target.files[0];
          },
          submitForm(){

        const formData = new FormData();
        formData.append('image', this.file);
  
            let data={
             name:this.username,
             email:this.email,
             user_id:this.storageUserData.id,
             profile_image:formData.get('image'),
            }
            console.log(data);
            const token = this.storageToken;
            axios.post("http://localhost:8000/api/update/user",data,{
             headers: {
                'Content-Type': 'multipart/form-data',
             Authorization:`Bearer ${token}`
       }
     }).then((response)=>{
           response.data.getUserData.image = "http://localhost:8000/storage/" + response.data.getUserData.image;
           this.getUserData = response.data.getUserData;
           this.$store.dispatch('setUserData', response.data.getUserData);
           this.successUserStatus=true;
           this.file = null;
           this.srcImage = response.data.getUserData.image;
            })
         },
         checkToken() {
            if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
                this.loginStatus = true;
            } else {
                this.loginStatus =false;
            }
      },
cart(){
  this.loadingStatus =true;
  const user_id= this.storageUserData.id;
  const token = this.storageToken;
  console.log(token);
  if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
  axios.get(`http://localhost:8000/api/order/cart/${user_id}`,{
      headers: {
      Authorization: `Bearer ${token}`
}
}).then((response) => {

    this.loginStatus = true;
    for (let i = 0; i < response.data.orderData.length; i++) {
      if (response.data.orderData[i].bookImage != null) {
        response.data.orderData[i].bookImage = "http://localhost:8000/storage/" + response.data.orderData[i].bookImage;
      }
    }
    this.order = response.data.orderData; 
    console.log(this.order); 
    this.loadingStatus =false,
    this.summaryCalculation();
  })
}else{
  this.loginStatus =false;
}
},
decreaseQuantity(index) {
let $parentNode = $(this).closest(".order-form-check");
let $qty = Number($parentNode.find('.quantity').text()) - 1;
if ($qty > 0) {
    this.order[index].quantity--;
    this.updateTotal(index);
} else {
    $parentNode.find('.minus-btn').attr("disabled", true);
}
},
updateTotal(index) {
const price = parseFloat(this.order[index].price);
const quantity = this.order[index].quantity;
const total = price * quantity;
this.order[index].total = total;
},
summaryCalculation(){
let $totalPrice = 0;
$('.offcanvas-end td').each(function(index,row){
   $totalPrice += Number($(row).find('#total').text().replace("kyats",""));
   console.log($totalPrice);
});
$("#subTotalPrice").text(`${$totalPrice} Kyats`);
$("#finalPrice").text(`${$totalPrice+3000} Kyats`);
},
remove(id,index){
console.log(index);
this.order.splice(index,1);
console.log('press remove');

let data={
    book_id:id,
    user_id:this.storageUserData.id,
   }
   console.log(data);
   const token = this.storageToken;
   axios.post("http://localhost:8000/api/remove/order",data,{
    headers: {
    Authorization:`Bearer ${token}`
}
}).then((response)=>{
   
this.$store.dispatch('setOrderTotal', response.data.updateOrderTotal);
console.log(response.data.updateOrderTotal);
console.log(this.storageOrderTotal);
 this.summaryCalculation();     
   })
},
editPage(){
this.$router.push({
    name: 'Edit_profile'
})
},
      Login() {
        this.$router.push({
            name: 'LoginView',
        })
    },
    signUp(){
        this.$router.push({
            name: 'signUp'
        })
    },
    logout(){
        this.$store.dispatch("setToken", null);      
        this.loginStatus = false;
        this.$router.push({
            name: 'HomeView'
        })
        this.$store.dispatch('clearOrderList');
    },
    },
    mounted(){
        this.username = this.storageUserData.name;
        this.email  = this.storageUserData.email;
        this.user_name=this.storageUserData.name;
        this.checkToken();
        console.log(this.storageToken);
        
        if (this.storageUserData.image && this.storageUserData.image.startsWith("http://localhost:8000/storage/")) {
          this.srcImage = this.storageUserData.image;
        }else if(this.storageUserData.image === null) {
          this.srcImage = "book/default.png";
        }else{
          this.srcImage = "http://localhost:8000/storage/" + (this.storageUserData.image || "");
        }

    this.orderLength = this.storageOrderTotal;
    this.user_name = this.storageUserData.name;
    this.srcImage = "http://localhost:8000/storage/" + this.storageUserData.image;
    console.log(this.storageToken);
 
   $(document).ready(function(){
       $('.sub-btn').click(function(){
           $(this).next('.sub-menu').stop().slideToggle();
           $(this).find('.dropdown').toggleClass('rotate');

       });
       $('.menu-btn').click(function(){
           $('.side-bar').addClass('active');
           $('.menu-btn').css('visibility','hidden');
       });
       $('.close-btn').click(function(){
           $('.side-bar').removeClass('active');
           $('.menu-btn').css('visibility','visible');
       })
       $(document).on('click', '.plus-btn', function () {
           console.log("Plus button clicked");
           let $parentNode = $(this).closest(".order-form-check");
           console.log("$parentNode:", $parentNode);
   
           let $price = parseFloat($parentNode.find('.price').val());
           console.log("$price:", $price);
   
           let $qty = Number($parentNode.find('.quantity').text()) + 1;
           $parentNode.find('.quantity').text($qty);
           console.log("$qty:", $qty);
          
   
           let $total = $price * $qty;
           console.log("$total:", $total);
   
           $parentNode.find('#total').text($total + " kyats");
           summaryCalculation();
           
         });

         $(document).on('click', '.minus-btn', function () {
           console.log("Plus button clicked");
           let $parentNode = $(this).closest(".order-form-check");
           let $price = parseFloat($parentNode.find('.price').val());
           let $qty = Number($parentNode.find('.quantity').text()) ;
           if ($qty > 0) {
               $qty--; // Decrement quantity
               $parentNode.find('.quantity').text($qty);
           }
           let $total = $price * $qty;    
           console.log("$total:", $total); 
           $parentNode.find('#total').text($total + " kyats");          
           summaryCalculation();
         });
           $('.profile').click(function(){
               $(this).next('#subMenu').slideToggle();
           });
         function summaryCalculation(){
           let $totalPrice = 0;
           console.log("$totalPrice:", $totalPrice);
          $('.offcanvas-end td').each(function(index,row){
               console.log(row);
              $totalPrice += Number($(row).find('#total').text().replace("kyats",""));
              console.log($totalPrice);
          });
          $("#subTotalPrice").text(`${$totalPrice} Kyats`);
          $("#finalPrice").text(`${$totalPrice+3000} Kyats`);
         }
   })
}
}