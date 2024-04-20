import axios from 'axios'
import { mapGetters } from 'vuex';
import moment from 'moment'// "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue' 
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import $ from 'jquery';


export default{


    setup () {
        const state= reactive({
            comment:'',
         
        });
        const rules = computed(() => {
            return {
               comment:{required},
              
            }
        })
       
       const v$ = useVuelidate(rules,state)
       return { state, v$ }
      },
    name:'bookDetail',
    data(){
        return{
            comments:[],
            newReply: '',
            activeInput: null,
            orderTotal:[],
            bookDetailId:0,
            books:{},
            loginStatus: false,
            moment: moment,
            user_name:"",  
            getComment:{},  
            postId:0,
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
            },
            previewImage:null,
            comment_image:'',
            userName:'',
            view:[],
            loadingStatus:false,
            text:'',
            showStatus:false,
            replyData:[],
            filterPrice:[],
            filterGenre:[],
            filterWriter:[],
            filterGenrePrice:[],
            dataEmpty:false,
            order:{},
            orderCount:0,
            counts:{},
            orderLength:[],
            srcImage:"",
        }
        },
        validations(){
            return {
                comment:{required}
            }
        },
    computed: {
        ...mapGetters(["storageToken","storageUserData","storageOrderTotal"]),
        dataOrderList() {
          // Check if storageOrderTotal exists and is an array
          if (Array.isArray(this.storageOrderTotal)) {
            return this.storageOrderTotal;
          } else {
            return 0; // or any other default value you prefer
          }
        }
    },
    methods:{
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
        createInputBox() {
            let div = document.createElement("div");
            div.setAttribute("class", "comment-details");
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "add text here");
            input.classList.add("input");
            let button = document.createElement("button");
            button.setAttribute("class", "btn submit");
            button.textContent = "Submit";
            button.addEventListener("click", this.handleSubmit);
            div.appendChild(input);
            div.appendChild(button);
            return div;
          },
          
        addReply(text) {
          console.log(text);
            let reply = document.createElement("div");
            reply.classList.add("all-comment")
            reply.innerHTML = `
              <div class="card-sm p-3 mb-3"> 
                <span class="text">${text.reply}</span> 
                <div class="reaction mt-2">
                <span class="likes-icon"><i class="fa-regular fa-thumbs-up"></i> <span class="comment-number">22</span></span>
                <span class="ml-4 likes-icon"><i class="fa-regular fa-thumbs-down"></i> <span class="comment-number">10</span></span>
                <span class="ml-4 reply">Add Reply</span>
                </div>
              </div>`;
            let replyButton = reply.querySelector(".reply");
            replyButton.addEventListener("click", this.handleReplyClick);
            return reply;
          }, 
          handleReplyClick(event) {
            const closestCard = event.target.closest(".all-comment");
            closestCard.appendChild(this.createInputBox());
          },
          handleSubmit(event) {
            const closestCard = event.target.closest(".all-comment");
            const inputBox = closestCard.querySelector(".comment-details");
            const inputField = closestCard.querySelector(".input");
            const inputValue = inputField.value.trim();
            if (inputValue) {
                let data ={
                           reply:inputValue,
                           replied_user_name:this.storageUserData.name,
                           replied_user_id:this.storageUserData.id,
                          }
                          const token = this.storageToken;
                          axios.post("http://localhost:8000/api/reply",data,{
                           headers: {
                           Authorization:`Bearer ${token}`
                     }
                   }).then((response)=>{
                    this.replyData = response.data.reply;
                    const newReply = this.addReply(response.data.reply);
                    closestCard.appendChild(newReply);
                    inputField.value = "";
                    inputBox.parentNode.removeChild(inputBox);
                          })
                          // inputField.parentNode.removeChild(inputField);
                          // event.target.parentNode.removeChild(event.target);
                        }
                      
              else{
                inputBox.parentNode.removeChild(inputBox); 
              }
            },
            getReply(){
              const token = this.storageToken;
              axios.get("http://localhost:8000/api/getReply",{
              headers: {
              Authorization: `Bearer ${token}`
        }
      }).then((response) => {

                     console.log(response.data.reply);
                    })
                      .catch((error) => {
                          console.log(error);
                  })
          },
        moveCursor() {
            if (event.keyCode === 13) {
                event.target.style.height = (event.target.scrollHeight + 20) + 'px';
            }
            // Move cursor to the end of the text
            const textarea = this.$refs.commentTextarea;
            textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        },
        selectImage(){
         this.$refs.fileInput.click()
        },
        pickFile(){
            let input =this.$refs.fileInput
            let file = input.files 
            if(file && file[0]){
                let reader = new FileReader
                reader.onload = e =>{
                    this.previewImage =e.target.result
                    this.$forceUpdate();
                }
                reader.readAsDataURL(file[0])
              
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click()
          },
        back(){
            history.back();
          },
        logout(){
            this.$store.dispatch("setToken", null);      
            this.loginStatus = false;
            this.$router.push({
                name: 'HomeView'
            })
            this.$store.dispatch('clearOrderList');
        },
        AddToCart(id){
           let data={
            book_id:id,
            user_id:this.storageUserData.id,
           }
           const orderTotal = this.storageOrderTotal;
           console.log(orderTotal);
           const token = this.storageToken;
           axios.post("http://localhost:8000/api/add/cart",data,{
            headers: {
            Authorization:`Bearer ${token}`
      }
    }).then((response)=>{
                 console.log(response.data.addToCart);
                 console.log(response.data.orderTotal);
                 this.orderTotal=response.data.orderTotal;
                 this.$store.dispatch('setOrderTotal',response.data.orderTotal);
           })
        },
        bookDetailData(id){
            if(this.storageToken){
                this.loadingStatus = true;
                }
            this.viewCount(id);
                  let book={
                      bookDetailId:id
                  };
                  const token = this.storageToken;
                  axios.post("http://localhost:8000/api/book/detail",book,{
                    headers: {
                    Authorization:`Bearer ${token}`
              }
            })
                  .then((response)=>{
                       
                    this.loadingStatus = false;
                      this.loginStatus = true;
                      response.data.bookData.bookImage = "http://localhost:8000/storage/" + response.data.bookData.bookImage;
                      this.books = response.data.bookData;
                     this.user_name= this.storageUserData.name;
                    
                  })
                        .catch((error) => {
                          console.log('need something');
                          console.log(error);
                  })
              },
              viewCount(id){
                console.log(id);
                 let data ={
                    user_id:this.storageUserData.id,
                    post_id:id
                 }
                 const token = this.storageToken;
                 axios.post("http://localhost:8000/api/viewCount",data,{
                   headers: {
                   Authorization:`Bearer ${token}`
             }
           })
                 .then((response)=>{
                     this.loginStatus = true;
                     console.log(response.data.view);
                     this.view =response.data.view.length;
                   
                 })
                       .catch((error) => {
                         console.log('need something');
                         console.log(error);
                 })
              },
              commentFunc(id,e){
                e.preventDefault();
                
                console.log(this.v$.$validate())
                if(this.v$.$error){
               console.log('Form  error.')
                }else{
                    let image = new FormData();
                    const fileInput = document.getElementById('image-url'); // Assuming 'image-url' is the id of your file input
                    if (fileInput.files.length > 0) {
                        const file = fileInput.files[0];
                        console.log(file);
                        image.append('file', file);
                        console.log(image.get('file'));
                    }
                let data={
                    comment:this.state.comment,
                    book_id:id,
                    user_id:this.storageUserData.id,
                    user_name:this.storageUserData.name,
                    comment_image:image.get('file')
                   }
                   console.log(data);
                
                   const token = this.storageToken;
                   axios.post("http://localhost:8000/api/comment",data,{
                    headers: {
                    'content-type' : 'multipart/form-data',
                    Authorization:`Bearer ${token}`
              }
            }).then((response)=>{
                         this.state.comment="";
                         console.log(response.data.commentData);
                         this.previewImage = ''; 
                         this.getCommentData();
                   })
                }
              },
              getCommentData(){
                const token = this.storageToken;
                axios.get("http://localhost:8000/api/get/comment",{
                  headers: {
                  Authorization: `Bearer ${token}`
            }
          }).then((response) => {
                 
                      this.loginStatus = true;
                      const urlParams = new URLSearchParams(window.location.search);
                      // Get the value of the 'id' parameter from the URL
                      this.postId = urlParams.get('bookId');
                      console.log(this.postId);

                      for (let i = 0; i < response.data.getCommentData.length; i++) {
                        if (response.data.getCommentData[i].comment_image != null) {
                            response.data.getCommentData[i].comment_image = "http://localhost:8000/storage/" + response.data.getCommentData[i].comment_image;
                          }
                          this.postId = urlParams.get('bookId');
                           console.log(this.postId);
                            if(this.postId === response.data.getCommentData[i].book_id){
                            this.getComment = response.data.getCommentData.filter(comment => comment.book_id === this.postId);
                           }
                      }
                      console.log(this.getComment);
                          })
                          .catch((error) => {
                              console.log(error);
                      })
              },
            
              //reply-parentId
              replyParentId(id){
                let data={
                    comment:this.state.comment,
                    replied_user_id:id,
                    user_id:this.storageUserData.id,
                    user_name:this.storageUserData.name,
                   }
                   const orderTotal = this.storageOrderTotal;
                   console.log(orderTotal);
                   const token = this.storageToken;
                   axios.post("http://localhost:8000/api/comment",data,{
                    headers: {
                    Authorization:`Bearer ${token}`
              }
            }).then((response)=>{
                         this.state.comment="";
                         console.log(response.data.commentData);
                         this.getCommentData();
                       
                         
                   })
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
        signUp(){
            this.$router.push({
                name: 'signUp'
            })
        },
           
     
    },
    mounted(){
      
        this.bookDetailId = this.$route.query.bookId;
        this.bookDetailData(this.bookDetailId);
        this.checkToken();
        this.getCommentData();
        this.getReply();
        console.log(this.storageToken);
        console.log(this.storageUserData);
        this.orderLength = this.storageOrderTotal;
        this.user_name = this.storageUserData.name;
        console.log(this.storageToken);
        if (this.storageUserData.image && this.storageUserData.image.startsWith("http://localhost:8000/storage/")) {
          this.srcImage = this.storageUserData.image;
        } else if(this.storageUserData.image === null) {
          this.srcImage = "book/default.png";
        }else{
          this.srcImage = "http://localhost:8000/storage/" + (this.storageUserData.image || "");
        }
        console.log(this.srcImage);

     
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