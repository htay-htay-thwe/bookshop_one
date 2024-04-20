import { mapGetters } from 'vuex';
import moment from 'moment'
import axios from 'axios'
import $ from 'jquery';
import { format } from 'date-fns';



export default{
name:'orderHistory',
data(){
    return{
        order:{},
        moment: moment,
        bookDetailId:0,
        orderCount:0,
        orderTotal:[],
        counts:{},
        orderLength:[],
        srcImage:"",
        orderHistory:{},
        loginStatus:false,
       loadingStatus:false,
       user_name:'',
       DateFormat:'',
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
   realOrderHistory(){
      const user_id= this.storageUserData.id;
      const token = this.storageToken;
      console.log(token);
      if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
      axios.get(`http://localhost:8000/api/realOrder/history/${user_id}`,{
          headers: {
          Authorization: `Bearer ${token}`
    }
    }).then((response) => {
      this.loginStatus = true;
       console.log(response.data.orderHistory.created_at);
       this.loginStatus = true;
       for (let i = 0; i < response.data.orderHistory.length; i++) {
         if (response.data.orderHistory[i].bookImage != null) {
           response.data.orderHistory[i].bookImage = "http://localhost:8000/storage/" + response.data.orderHistory[i].bookImage;
         }
         response.data.orderHistory[i].created_at= format(new Date(response.data.orderHistory[i].created_at), 'dd-MM-yyy');
       }
       this.orderHistory = response.data.orderHistory;
        })
   }
  },
    editPage(){
        this.$router.push({
            name: 'Edit_profile'
        })
      },
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
      history(){
        this.$router.push({
            name: 'orderHistory'
          })
      },
          back(){
            history.back();
          },
          Page() {
            this.$router.push({
                  name: 'HomeView'
              })
                },
                bookDetailData(id){
               this.$router.push({
              name:'bookDetail',
              query:{
                bookId : id
              }
           }) 
          },
          logout() {
            this.$store.dispatch("setToken", null);
            this.loginStatus = false;
            this.$router.push({
                name: 'HomeView'
            })
            console.log(this.storageToken);
        },
       checkToken() {
            if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
                this.loginStatus = true;
            } else {
                this.loginStatus =false;
            }
      },
      Login() {
        this.$router.push({
            name: 'LoginView',
        })
    },
    signUp() {
      this.$router.push({
        name: 'signUp'
      })
  }, 
},
mounted(){
  this.realOrderHistory();
    this.checkToken();
    this.orderLength = this.storageOrderTotal;
    this.user_name = this.storageUserData.name;
    this.srcImage = "http://localhost:8000/storage/" + this.storageUserData.image;
    console.log(this.srcImage);
    console.log(this.storageToken);

    if (this.storageUserData.image && this.storageUserData.image.startsWith("http://localhost:8000/storage/")) {
      this.srcImage = this.storageUserData.image;
    }else if(this.storageUserData.image === null) {
      this.srcImage = "book/default.png";
    }else{
      this.srcImage = "http://localhost:8000/storage/" + (this.storageUserData.image || "");
    }

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
                $qty--; 
                $parentNode.find('.quantity').text($qty);
            }
            let $total = $price * $qty;    
            console.log("$total:", $total); 
            $parentNode.find('#total').text($total + " kyats");
            summaryCalculation();
 
          });
      
            $('.profile').click(function(){
                $(this).next('#subMenu').slideToggle();
            })
       
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