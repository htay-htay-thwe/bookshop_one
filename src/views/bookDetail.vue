<template>
    <div>
      <header style="">
          <div class="header-sub">
            <div class="heading-sub">
              <i class="p-2 fa-regular fa-clock"></i><span class="text">{{ moment().format('l') }} </span> <span class="line">/</span>
              <i class="p-2 fa-solid fa-right-to-bracket"></i>
      
     <span v-if="!loginStatus" type="button" class="mr-2 login text-danger"  @click="Login()" ><u class="">Login </u></span> 
     <span v-if="!loginStatus" type="button" class="ml-2 mr-2 signup text-danger" @click="signUp()"><u class="">/ Sign up</u></span>
     <span @click="logout()" v-if="loginStatus" type="button" class="ml-2 mr-2 text-danger"><u class="">Logout</u></span> / 
     <span v-if="loginStatus" type="button" class="ml-2 text-white"><u class=""> <i class="fa-solid fa-user"></i>  {{ user_name }}</u></span> 

     </div>  
            <div class="contact-group">
              <i class='bx bxl-facebook-circle'></i>
              <i class='bx bxl-instagram'></i>
              <i class='bx bxl-twitter'></i>
              <i class='bx bxl-youtube'></i>
              <i class='bx bx-envelope'></i>
            </div>
          </div>

                </header> 

                <div class="navbar" style="z-index:100;display:flex;">
          <div class="menu-btn">
        <i class="fas fa-bars"></i>
    </div>
    <div class="side-bar">
        <div class="close-btn">
            <i class="fas fa-times"></i>
        </div>
        <div class="menu">
            <div class="item"><a href="#"><i class="fas fa-desktop"></i>Dashboard</a></div>
            <div class="item"><a class="sub-btn" href="#"><i class="fas fa-table"></i>Table
            <i class="fas fa-angle-right dropdown"></i></a>
                <div class="sub-menu">
                    <a href="#" class="sub-item">Sun Item 01</a>
                    <a href="#" class="sub-item">Sun Item 02</a>
                    <a href="#" class="sub-item">Sun Item 03</a>
                </div>
        </div>
          
            <div class="item"><a href="#"><i class="fas fa-th"></i>Forms</a></div>
            <div class="item"><a class="sub-btn" href="#"><i class="fas fa-cogs"></i>Settings
                <i class="fas fa-angle-right dropdown"></i></a>
                <div class="sub-menu">
                    <a href="#" class="sub-item">Sun Item 01</a>
                    <a href="#" class="sub-item">Sun Item 02</a>
                    <a href="#" class="sub-item">Sun Item 03</a>
                </div>
                </div>
            <div class="item"><a href="#"><i class="fas fa-circle"></i>About</a></div>
        </div>
    </div>

          <ul class="nav-area">
            <div class="home"><a href="" class="nav-sub" @click.prevent="home()">HOME</a></div>
            <div class="home"><a href="" class="nav-sub">BOOKS</a></div>
            <div class=" dropdown home">
              <li class="text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Windows
              </li>
              <ul class="dropdown-menu dropdown-menu-dark " >
                <li><a class="dropdown-item text-dark" href="#">GALLERY</a></li>
                <li>
                  <hr class="dropdown-divider text-dark">
                </li>
                <li><a class="dropdown-item text-dark" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider text-dark">
                </li>
                <li><a class="dropdown-item text-dark" href="#">Something else here</a></li>
                <li>
                  <hr class="dropdown-divider text-dark">
                </li>
      
              </ul>
            </div>

            <div class=" dropdown home">
              <li class="text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Windows
              </li>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item text-dark" href="#">Action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item text-dark" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider text-dark">
                </li> 
                <li><a class="dropdown-item text-dark" href="#">Something else here</a></li>
                <li>
                  <hr class="dropdown-divider text-dark">
                </li>
                <li><a class="dropdown-item text-dark" href="#">Separated link</a></li>
              </ul>
            </div>
            <div class="home"><a href="" class="nav-sub">REVIEWS</a></div>
            <div class="home"><a href="" class="nav-sub">VIDEOS</a></div>
          </ul>
          
    <span type="button" class="position-relative cart">
      <button @click="cart()" class="cart-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="text-white fa-solid fa-cart-shopping"></i>
        <span class="top-0 position-absolute start-100 translate-middle badge rounded-pill bg-danger" v-if="loginStatus">
         {{  dataOrderList.length }}
    <span class="visually-hidden">unread messages</span>
  </span>
  </button>
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style="background:rgb(237, 237, 252);">
  <!-- start of loading -->
  <div class="mt-5 text-center" v-if="loadingStatus == true">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
 </div>
<!-- end of loading -->

  <div class="offcanvas-header" v-else style="z-index:100;">
    <h4 id="offcanvasRightLabel" style="font-size:22px;color:brown;font-weight:800;">Items in Cart</h4>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
 
  <tr class="offcanvas-body" v-if="loginStatus" style="margin-bottom:70px;">
    <div v-for="(orderCart,index) in order" :key="orderCart.id" class="order-form-check">
      <td>
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate">
        </div>
  <div>
  <div class=" one-chart">
        <div class="cart-photo"> <img v-bind:src="orderCart.bookImage" class="w-75"/></div>
        <div class="icon-letter">
            <p style="font-size:15px;">{{ orderCart.bookName }}</p>
            <input type="hidden" :value="orderCart.price" class="price"/>
            <span style="font-size:18px;font-weight:700;" id="total">{{ orderCart.price }}</span>
        </div>
        <button @click="remove(orderCart.id,index)" type="button" class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"  style="color:black;font-size:23px;margin-top:-3px;max-height:50px;">
          <i class="fa-solid fa-trash-can"></i>
         </button>
     </div>
  
     
     <div class="increase">
        <button class="btn btn-primary btn-sm plus-btn" ><i class="fa-solid fa-plus"></i></button>
        <span class="p-2 quantity">{{ orderCart.quantity }}</span>
        <button class="btn btn-danger btn-sm minus-btn"><i class="fa-solid fa-minus"></i></button>
     </div>
     <div class="mb-4" style=" display: block;border: 0.3px solid black;"></div>
     </div>
    </td>
   
     </div>

     <div class="total">
        <h5 style="color:brown;" >Subtotal</h5>
        <h5 id="subTotalPrice"></h5>
      </div>
 
    
     <div class="total">
        <h5 style="color:brown;">Delivery</h5>
        <h5 id="">3000kyats</h5>
      </div>

      <div class="total">
        <h5 style="color:brown;">Total</h5>
        <h5 id="finalPrice"></h5>
      </div>
     </tr>
  
     <div v-else>There is no data!!</div>
</div>
    </span>
<!-- img-profile-dropdown -->

<img :src="srcImage" class="profile"  v-if="loginStatus">
<div class="sub-menu-wrap" id="subMenu">
    <div class="sub-menu-profile">
        <div class="user-info">
            <img :src="srcImage" style="width:70px;">
            <h3 style="font-weight:400;">{{ user_name }}</h3>
        </div>
        <hr/>
        <a href="#" class="sub-menu-link">
          <i class="fa-regular fa-user"></i>
            <p @click="editPage()">Edit Profile</p>
            <span><i class="fa-solid fa-angle-right"></i></span>
        </a>

        <a href="#" class="sub-menu-link">
          <i class="fa-solid fa-power-off"></i>
            <p>Change Password</p>
            <span><i class="fa-solid fa-angle-right"></i></span>
        </a>
    </div>
</div>

                </div>  
         <!-- body-detail -->
      <div style="margin-bottom:100px;z-index:-1;">
        <!-- start of loading -->
        <div class="mt-5 text-center" v-if="loadingStatus == true">
         <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
        </div>
       </div>
       <!-- end of loading -->
       <div class="" v-else>
        <div v-if="loginStatus">
          <!-- bookDetail image and text -->
        <div class="container mt-5 book-detail">
        <div class="row">
             <div class="col-lg-5 col-md-5">
                <img v-bind:src="books.bookImage" />
            </div>
           <div class="col-lg-7 col-md-7">
                <h1 class="book-title" style="color:bisque;">{{ books.bookName }}</h1>
                <p style="color:white;" class="mt-5">By <span style="color:black;"> {{ books.writerName }}</span></p>
                <h2 class="mt-5 bolder" style="color:azure;">{{ books.price }}</h2>
                <span class="text-warning"> 
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </span>
                <span style="color:coral;">
                    (120 Review)
                </span>
                <span style=" color:black;margin-left:10px;font-size:20px;">
                    <i class="fa-solid fa-eye"></i> {{ view }}
                </span>
                <br>
                    <button  @click="AddToCart(books.id)" class="mt-3 add-btn bolder" style="font-size: 15px;">ADD TO CART</button>
            </div> 
        </div>
        </div>
         <!-- bookDetail image and text -->

    <div class="container text-white">
    <!-- scrolling  -->
    <div class="mb-3 detail-nav" id="navbar-example2">
        <div>  <a class="nav-link" href="#scrollspyHeading1">Description</a></div>
        <div>  <a class="nav-link" href="#scrollspyHeading2">Author</a></div>
        <div><a class="nav-link" href="#scrollspyHeading3">Comment</a></div>
        <div><a class="nav-link" href="#scrollspyHeading4">Review</a></div>
    </div>
    
    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" class="mt-5 scrolling">
        <h2 id="scrollspyHeading1" style="color:brown;">{{books.bookName}}</h2>
        <p class="mt-5 bookDescription" style="text-align:justify;color:black;">{{ books.description }}</p>
        <h4 id="scrollspyHeading2" style="color:brown;">{{ books.writerName }}</h4>
        <p></p>
        <h2 id="scrollspyHeading3"></h2>
    </div>
    <!-- scrolling  -->
       
        <!-- comment-section -->
        <div class="container">
        <div class="something" >
        <h3 class="mt-5">What do you think?</h3>
        <p>393 response</p>
        <div class="icon-gp ">
            <div>
            <img src="book/like.svg" class="like" />
            </div>
            <div>
            <img src="book/haha.svg" class="haha" />
            <label for="Funny"></label>
            </div>
            <div>
            <img src="book/love.svg" class="love">
            <label for="Love"></label>
            </div>
            <div><img src="book/wow.svg" class="wow" /></div>
            <div><img src="book/angry.svg" class="angry"/></div>
            <div><img src="book/sad.svg" class="sad"></div>
        </div>
    
        <!-- list of comments -->
        <div class="container">
        <div class="comment">
            <div class="">173 Comments</div>
            <div class="">
                <span><i class="fa-solid fa-comment"></i></span>
                <span>{{ user_name }}</span>
                <span><i class="fa-solid fa-caret-down"></i></span>
            </div>
        </div>
        </div>
        <hr/>
          <!-- list of comments -->
        <div class="container text-comment">
            <div class="pp"><button class=" btn btn-secondary">H</button></div>
           
            <form enctype="multipart/form-data" class="comment-box ">
                <span class="" id="image-icon" @click="triggerFileInput()" style="font-size:33px;"><i class="fa-solid fa-image"></i></span>
               <textarea ref="commentTextarea" v-model="state.comment" class="mb-3 form-control comment-textarea" placeholder="Leave a comment here" style="height:100px;z-index: -10;"  @keyup.enter="moveCursor"></textarea>         
                <!-- previewImage -->
                <label for="floatingInput d-none"></label>
                 <!-- File input -->
                 <input ref="fileInput" @input="pickFile" type="file" id="image-url"  class="d-none">

                <img @click="selectImage()" :src="previewImage" style="max-width:100%; max-height:40px;z-index:2;top:-60px;left:0;position:relative;pointer-events: none;">
                 <!-- validate -->
                <div style="margin-top:-30px;max-height:20px;" class="text-danger" v-for="error in v$.comment.$errors" :key="error.$uid">
                  <i class="fa-solid fa-circle-exclamation"></i>Please Enter feedback!!
                </div>
                 <!-- validate -->
                <button type="button"  class="btn btn-danger comment-button"  @click="commentFunc(books.id,$event)">Comment</button>
            </form>
        </div>
        <!-- sorting -->
        <div class="container">
        <div class="sorting">
            <div>Newest</div>
            <div>Oldest</div>
        </div>
        </div>
        <!-- sorting -->
        
        <div class="mt-3 container-fluid" style="margin-bottom:50px;">
          <div class="row" v-for="(Data,book_id) in getComment" :key="book_id">
            <div class="col-1">
            <a class="pr-3" href="#">
            <div class="profile-comment"><button class=" btn btn-secondary">H</button></div>
            </a>
            </div>
            <div class="col-11">
             <div class="card col"> 
              <div class="card-body">
              <h5 class="mt-0" style="color:grey;">{{ Data.user_name }}</h5>
              {{ Data.comment }}
              <div>
              <img v-bind:src="Data.comment_image" class="card-img-top" alt="...">
              </div>
              <div class="all-comment">
              <span class="ml-4 reply" @click="handleReplyClick">Add Reply</span>
              </div>
               <div>aaaaaaaaaaaaaaaaa</div> 
              <div class="p-3 mb-3 card-sm"  v-for="(reply,index) in replyData" :key="index"> 
                <span class="text">{{ reply.reply }}</span> 
                <div class="mt-2 reaction">
                <span class="likes-icon"><i class="fa-regular fa-thumbs-up"></i> <span class="comment-number">22</span></span>
                <span class="ml-4 likes-icon"><i class="fa-regular fa-thumbs-down"></i> <span class="comment-number">10</span></span>
                <span class="all-comment"><span class="ml-4 reply" @click="handleReplyClick">Add Reply</span></span>
                </div> 
               </div> 
              </div>
               <div>
                </div> 
             </div> 

        </div>
        <hr>
        </div>
        </div>
        </div>
        </div>
       </div>
      </div>

      <div v-else class="mt-3 mb-5 offset-5">
        <h2 class="btn btn-danger" @click="Login()">Login Again</h2>
    </div>

      </div>
    </div>
    </div>

   
     
</template>
 <script src="../js/bookDetail.js"></script>

