import axios from 'axios'
import { mapGetters } from 'vuex';
import $ from 'jquery';
import moment from 'moment'
export default{
  name:'LoginView',
    data() {
        return {
     
            userLogin: {
                email: "",
                password: "",
            },
            moment:moment,
            loginStatus:false,
        }
    },
    computed: {
        ...mapGetters(["storageToken","storageUserData","storageOrderTotal"]),
        dataOrderList() {
            // Check if storageOrderTotal exists and is an array
            if (Array.isArray(this.storageOrderTotal)) {
              return this.storageOrderTotal.length;
            } else {
              return 0; // or any other default value you prefer
            }
          }
    },
    methods: {
        history(){
            event.preventDefault();
            this.$router.push({
                name: 'orderHistory'
              })
          },
          ordering(){
            const user_id= this.storageUserData.id;
            const token = this.storageToken;
            console.log(token);
            if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
            axios.get(`http://localhost:8000/api/realOrder/${user_id}`,{
                headers: {
                Authorization: `Bearer ${token}`
          }
          }).then((response) => {
            this.loginStatus = true;
             console.log(response.data.realOrderData);
              this.$store.dispatch("setOrderTotal", null);      
              this.cart();
            })
          }else{
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
        back(){
            history.back();
          },
        Home() {
            this.$router.push({
                name: 'BookCollection'
            })
        },
        signUp(){
            this.$router.push({
                name: 'signUp'
            })
        },
        Login(){
            this.$router.push({
                name: 'LoginView',
            })
        },
        login() {
            axios.post("http://localhost:8000/api/user/login", this.userLogin)
                .then((response) => {
                
                    if (response.data.token == null) {
                        console.log("There is no account!");
                        this.loginStatus = false;
                    } else {
                        this.storeUserInfo(response);
                        this.Home();
                        this.loginStatus = true;
                        console.log(this.storageToken);
                        console.log(this.storageUserData);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
          
        logout() {
            this.$store.dispatch("setToken", null);      
            this.loginStatus = false;
            this.$router.push({
                name: 'HomeView'
            })
        },
       
        storeUserInfo(response) {
            this.$store.dispatch('setToken',response.data.token);
            this.$store.dispatch('setUserData',response.data.user);
        },
        checkToken() {
            if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
                this.loginStatus = true;
            } else {
                this.loginStatus = false;
            }
        },
        
    },

    mounted() {
        // Your jQuery code goes here
        $('.sub-btn').click(function () {
            console.log($(this).next('.sub-menu'));
            $(this).next('.sub-menu').stop().slideToggle();
            $(this).find('.dropdown').toggleClass('rotate');
        });

        $('.menu-btn').click(function () {
            $('.side-bar').addClass('active');
            $('.menu-btn').css('visibility', 'hidden');
        });

        $('.close-btn').click(function () {
            $('.side-bar').removeClass('active');
            $('.menu-btn').css('visibility', 'visible');
        });

        this.orderLength = this.storageOrderTotal;
        this.user_name = this.storageUserData.name;
       
     
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