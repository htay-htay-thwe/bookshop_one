<template>
        <div>
                <header>
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
            <div class="home"><a href="" class="nav-sub" @click="history()">BOUGHT</a></div>
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
      <button @click="ordering()" type="button" class="mt-3 fw-3 btn btn-success col">Order</button>
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

                <h2 class="mt-3 mb-4 text-center" style="color:chocolate;font-weight:900;">Bought Items' Lists</h2>
                <div class=" grid-container split" style="margin-bottom:120px;">
                  <div v-for="(order,index) in orderHistory" :key="index" class="ml-5 mr-3">
                    <h5 class="mt-3">{{ order.created_at }}</h5>
                    <div class="row boundary">   
                <div class="mt-3 mb-3 col-3">
                    <img :src="order.bookImage" class="w-100"/>
                </div>
                <div class="mt-3 col-6">
                    <h5 style="font-size:13px;">{{ order.bookName }}</h5>
                    <p style="font-weight:500;color:brown;">{{ order.price }}</p>
                </div>
                <div class="mt-3 mb-2 mr-auto col-2">
                   <span style="color:chocolate;font-weight:600;">quantity </span><span style="font-weight:500;">{{ order.quantity }}</span>
                   <div style="margin-top:20px;">
                        <small value="true" v-if="order.selected == 'true'" class="text-success">Sent</small>
                        <small value="false" v-if="order.selected == 'false'" class="text-warning">Pending...</small>
                        <small value="cancel" v-if="order.selected == 'cancel'" class="text-danger">Cancel</small>
                      </div> 
                </div>
          </div>
                  </div>
               </div>
    </div>
</template>
<script src="../js/orderHistory.js"></script>


