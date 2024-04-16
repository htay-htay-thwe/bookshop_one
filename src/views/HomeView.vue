<template>
     <header style="">
          <div class="header-sub">
            <div class="heading-sub">
              <i class="p-2 fa-regular fa-clock"></i><span class="text">{{ moment().format('l') }} </span> <span class="line">/</span>
              <i class="p-2 fa-solid fa-right-to-bracket"></i>
      
     <span v-if="!loginStatus" type="button" class="mr-2 login text-danger"  @click="Login()" ><u class="">Login </u></span> / 
     <span v-if="!loginStatus" type="button" class="ml-2 mr-2 signup text-danger" @click="signUp()"><u class="">Sign up</u></span>
     <span @click="logout()" v-if="loginStatus" type="button" class="ml-2 mr-2 text-danger"><u class="">Logout</u></span> /
     <span v-if="loginStatus" type="button" class="ml-2 text-white"><u class=""> <i class="fa-solid fa-user"></i>  {{ user_name }}</u></span> 
     </div>  
            <div class="contact-group">
              <i class='bx bxl-facebook-circle'></i>
              <i class='bx bxl-twitter'></i>
              <i class='bx bxl-youtube'></i>
              <i class='bx bxl-instagram'></i>
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
         
    <div style="background:rgb(237, 237, 252);">
  <!-- updated -->
  <div class="text-white container-fluid best-book" style="z-index:-1;margin-top:25px;">
    <div class="row">
      <div class="col-lg-8 col-md-6 col-sm-12">
        <div class="row">
          <div class="mt-5 col-lg-5 book-updated col-md-5 col-sm-4">
            <img src="book/nay-kyar-pann.png" class="shadow-sm " />
          </div>
          <div class="mt-3 col-lg-6 col-md-6 col-sm-8">
            <p class="book-title">HERE'S AN HOUR OF SIDE-QUESTS FROM THE OUTER WORLDS...</p>
            <div class="title-sub">
              <span>by</span> <span class="admin">Admin</span> / <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i
                  class="fa-regular fa-comment"></i> 20
            </div>
            <div class="script">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices...
            </div>
          </div>

          <!-- updated -->
          <div class="mt-5 col-lg-5 book-updated col-md-5 col-sm-4">
            <img src="book/nay-kyar-pann.png" class="shadow-sm" />
          </div>
          <div class="mt-5 col-lg-6 col-md-6 col-sm-8">
            <p class="book-title">HERE'S AN HOUR OF SIDE-QUESTS FROM THE OUTER WORLDS...</p>
            <div class="title-sub">
              <span>by </span><span class="admin">Admin</span> / <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i
                  class="fa-regular fa-comment"></i> 20
            </div>
            <div class="script">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices...
            </div>
          </div>

          <div class="mt-5 col-lg-5 book-updated col-md-5 col-sm-4">
            <img src="book/nay-kyar-pann.png" class="shadow-sm" />
          </div>
          <div class="mt-5 col-lg-6 col-md-6 col-sm-8">
            <p class="book-title">HERE'S AN HOUR OF SIDE-QUESTS FROM THE OUTER WORLDS...</p>
            <div class="title-sub">
              <span>by</span> <span class="admin">Admin</span> / <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i
                  class="fa-regular fa-comment"></i> 20
            </div>
            <div class="script">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices...
            </div>
          </div>


          <div class="mt-5 col-lg-5 book-updated col-md-5 col-sm-4 d-md-none d-lg-block">
            <img src="book/nay-kyar-pann.png" class="shadow-sm" />
          </div>
          <div class="mt-5 col-lg-6 col-md-6 col-sm-8 d-md-none d-lg-block">
            <p class="book-title">HERE'S AN HOUR OF SIDE-QUESTS FROM THE OUTER WORLDS...</p>
            <div class="title-sub">
              <span>by</span> <span class="admin">Admin</span> / <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i
                  class="fa-regular fa-comment"></i> 20
            </div>
            <div class="script">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Quis ipsum suspendisse ultrices...
            </div>
          </div>
        </div>
      </div>
      <!-- trending -->
      <div class="mt-3 col-lg-4 col-md-5 col-sm-12 trending">
        <div class="trending-sub">
          <span class="trending-title">
            <div class="box"></div>
            <span class="post-title">Trending Books</span>
            <span></span>
          </span>
 
          <div class=" trending-books">
                <swiper
                :options="swiperOptions1"
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
        class="mySwiper"
      >
              <swiper-slide>
                <div class="container ">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                </div>
                </div>
              </swiper-slide>

              <!-- slide-two -->
              <swiper-slide>
                    <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>
                </div>
                </div>
              </swiper-slide>

              <swiper-slide>
                    <div class="container ">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-6 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-6 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-6 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 col-sm-5">
                    <img src="book/nay-kyar-pann.png" class="shadow-sm" />
                  </div>
                  <div class="col-lg-6 col-md-5 col-sm-5">
                    <p>DOWNWELL AND SPACE HULK: TACTICS ARE COMING TO XBOX GAME PASS FOR PC</p>
                    <div class="time">
                      <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                    </div>
                  </div>
                </div>
                </div>
              </swiper-slide>
              </swiper>

          </div>
          
        </div>
   
        <span class="trending-best">
          <div class="box"></div>
          <span class="post-title">BEST OF</span>
          <span></span>
        </span>
        <div class="container best-trend">
          <div class="row">
            <div class="col-3">
              <div class="number">9.5</div>
            </div>
            <div class="mt-3 col-9 best">
              <p>THIS GAMING LAPTOP WITH A GTX 1660...</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>


            <!-- best of -->
            <div class="col-3">
              <div class="number">9.5</div>
            </div>
            <div class="col-9 best">
              <p>THIS GAMING LAPTOP WITH A GTX 1660...</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>


            <!-- best of -->
            <div class="col-3">
              <div class="number">9.5</div>
            </div>
            <div class="col-9 best">
              <p>THIS GAMING LAPTOP WITH A GTX 1660...</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>



        </div>
      </div>
      <!-- trendingend -->
    </div>
  </div>

  <!-- latest preview -->
  <div class="latest container-fluid" style="background:rgb(237, 237, 252);">
    <div class="swiper-one cardSwiper">
      <div class="trending-sub ">
            <span class="trending-title">
              <div class="box"></div>
              <span class="post-title">Trending Books</span>
              <span></span>
            </span>
 
            <div class="trending-books">
                 <swiper
                 :options="swiperOptions2"
        :slidesPerView="4"
        :spaceBetween="10"
        :loop="true"

         :autoplay="{
           delay: 2000,
           disableOnInteraction: false,
         }"
          :breakpoints="{
      '0': {
            slidesPerView: 1,
          },
          '500':{
             slidesPerView: 2,
          },
        '740': {
            slidesPerView: 3,
          },
        '850': {
            slidesPerView: 3,
            },
        '950': {
               slidesPerView: 3,
            },
        '990': {
                slidesPerView: 3,
            },
        '1120': {
            slidesPerView: 4,
          }
          }"
        :pagination="true"
        :modules="modules"
        class="cardSwiper"
      >
        <swiper-slide>
          <div class="card" style="width: 15rem;height:22rem;">
            <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
            <div class="card-body">
              <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>
        </swiper-slide>


        <swiper-slide>
          <div class="card" style="width: 15rem;height:22rem;">
            <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
            <div class="card-body">
              <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>
        </swiper-slide>


        <swiper-slide >
          <div class="card" style="width: 15rem;height:22rem;">
            <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
            <div class="card-body">
              <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
          <div class="card" style="width: 15rem;height:22rem;">
            <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
            <div class="card-body">
              <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>
            <div class="card" style="width: 15rem;height:22rem;">
              <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
              <div class="card-body">
                <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
                <div class="time">
                  <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
                </div>
              </div>
            </div>
          </swiper-slide>

         <swiper-slide>
          <div class="card" style="width: 15rem;height:22rem;">
            <img src="book/nay-kyar-pann.png" class="card-img-top w-100" alt="..." style="height:200px;">
            <div class="card-body">
              <p class="card-text card-letter">Some quick example text to build on the card title and make up the bulk</p>
              <div class="time">
                <i class="fa-regular fa-clock"></i> Aug 01,2019 / <i class="fa-regular fa-comment"></i> 20
              </div>
            </div>
          </div>
        </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <div></div>
  </div>


  <div class="subscribe-div page-wrapper">
        <div class="container subscribe-insta">
          <div class="row">

            <div class="overflow-hidden col-lg-4 col-md-6 input">
              <span class="instagram">
                <div class="box"></div>
                <span class="text-white post-title">SUBSCRIBE</span>
                <span></span>
              </span>
              <div class="para col-lg-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, eiusmod tempor.</div>
              <ul class="subscribe">
                <div class="parallelogram"><input type="text" placeholder="Name"></div>
                <div class="parallelogram"><input type="text" placeholder="Email"></div>
                <a class="button parallelogram" href="#"><button class="skew-fix">Subscribe</button></a>
              </ul>
            </div>
            <div class="overflow-hidden col-lg-4 col-md-6">
              <span class="instagram">
                <div class="box"></div>
                <span class="text-white post-title">Instagram</span>
                <span></span>
              </span>

              <div class="row four-books row-cols-2 row-cols-lg-3 gx-0 g-lg-2">
                <div class="col-6 d-flex justify-content-end">
                  <img src="book/book_six.png" />
                </div>
                <div class="col-6">
                  <img src="book/book_six.png" />
                </div>
                <div class="col-6 d-flex justify-content-end">
                  <img src="book/book_six.png" />
                </div>
                <div class="col-6">
                  <img src="book/book_six.png" />
                </div>
              </div>

            </div>
            <div class="mb-4 col-lg-4">
           
              <span class="mt-5 tags">
                <div class="box"></div>
                <span class="text-white post-title">TAGS CLOUD</span>
                <span></span>
              </span>

              <div class="row">
                <div class="mt-2 genrePage">
                  <div class="col parallelogram">
                    <div class="p-1 genre"><span>Comedy</span></div>
                  </div>
                  <div class="col parallelogram">
                    <div class="p-1 genre"><span>Love</span></div>
                  </div>
                  <div class="col parallelogram">
                    <div class="p-1 genre"><span>Dramatic</span></div>
                  </div>
                </div>

                <div>
                  <div class="mt-2 genrePage">
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Comedy</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Love</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Dramatic</span></div>
                    </div>
                  </div>

                  <div class="mt-2 genrePage">
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Comedy</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Love</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Dramatic</span></div>
                    </div>
                  </div>

                  <div class="mt-2 genrePage">
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Scientific</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Romantic</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Love</span></div>
                    </div>
                  </div>

                  <div class="mt-2 genrePage">
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>History</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Love</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Dramatic</span></div>
                    </div>
                  </div>

                  <div class="mt-2 genrePage">
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Comedy</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Love</span></div>
                    </div>
                    <div class="col parallelogram">
                      <div class="p-1 genre"><span>Dramatic</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
</div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import moment from 'moment'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';




export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
  
  },
  data(){
    return{
      moment:moment,
   
        modules: [Autoplay, Pagination, Navigation],
    
    }
  },
  methods:{
    Login() {
            this.$router.push({
                name: 'LoginView',
            })
        },
        signUp(){
            this.$router.push({
                name: 'signUp',
            })
        },
  },

 
}


</script>



