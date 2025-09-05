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
 
  <div class="offcanvas-body" v-if="loginStatus" style="margin-bottom:70px;">
    <div v-for="(orderCart,index) in order" :key="orderCart.id" class="order-form-check">
      <div>
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
  <button class="btn btn-primary btn-sm" @click="incrementQuantity(index)">
    <i class="fa-solid fa-plus"></i>
  </button>     
  <span class="p-2 quantity">{{ orderCart.quantity }}</span>
  <button class="btn btn-danger btn-sm" @click="decrementQuantity(index)">
    <i class="fa-solid fa-minus"></i>
  </button>     
</div>


     <div class="mb-4" style=" display: block;border: 0.3px solid black;"></div>
     </div>
    </div>
   
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
     </div>
  
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
  
 <div class="container-fluid bookCollection" style="margin-top:20px;margin-bottom:100px;" v-if="loginStatus">
  <!-- start of loading -->
  <div class="mt-5 text-center" v-if="loadingStatus == true">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
 </div>
<!-- end of loading -->
                            <div class="row " v-else>
                                    <div class="mt-5 col-xxl-2 col-lg-4 col-md-4 filter">
                                    <div class="shadow-sm card side-card" style="border:1px solid blueviolet;">
                                        <h4 class="mt-3" style="color:brown;">Filter By Genre</h4>
                                        <div class="form-check" v-for="(genre,index) in bookGenre" :key="index">
                                        <input :checked="Selected(genre)" @click="filter(showRange,genre,writer)"   :value="genre" class="form-check-input" type="checkbox" name="exampleRadios" id="exampleRadios1" >
                                        <label class="form-check-label" for="exampleRadios1">
                                            {{ genre }}
                                        </label>
                                    </div>

                                  
                                        <h4 class="mt-3" style="color:brown;">Filter By Price</h4>
                                        <div class="form-check" v-for="(priceRange,showRange) in productsByPriceRange" :key="showRange">
                                            <input @click="filter(showRange,genre,writer)"   class="form-check-input" :checked="isSelected(showRange)" :value="showRange" type="checkbox" name="exampleRadios" id="exampleRadios1" >
                                            <label class="form-check-label" for="defaultCheck1" >
                                              {{ showRange }}
                                            </label>
                                        </div>

                                        <select class="mb-5 form-select form-select-md" aria-label="Large select example">
                                            <option selected>Filter By Rating</option>
                                            <option value="1">5star Rating</option>
                                            <option value="2">4star Rating</option>
                                            <option value="3">3star Rating</option>
                                            <option value="3">2star Rating</option>
                                            <option value="3">1star Rating</option>
                                        </select>


                                        <h4 class="mt-3" style="color:brown;">Filter By Author Name</h4>
                                        <div class="form-check" v-for="(writer,index) in bookWriter" :key="index">
                                            <input @click="filter(showRange,genre,writer)" :checked="SelectedWriter(writer)" :value="writer"  class="form-check-input" type="checkbox" name="exampleRadios" id="exampleRadios1">
                                            <label class="form-check-label" for="defaultCheck1">
                                           {{ writer }}
                                            </label>
                                        </div>

                                    </div>
                                    <!-- alert -->
                                    </div>
                                   
                                                <div class="col-xxl-8 col-lg-7 col-md-8">
                                                
                                                    <div class="search-button"  v-if="loginStatus">
                                                    <input v-on:keyup.enter="search" v-model="search" type="text" placeholder="Search...." class="mt-3" style="height: 35px;width:250px;" />
                                                    <button @click="getSearch()" class="mt-3 btn btn-success"><i class="fa-solid fa-magnifying-glass"></i></button>
                                                    </div>
                                                    <div class="grid-container" v-if="dataEmpty">
                                                        <div v-for="(book,index) in postLists" :key="index" >
                                                    <div class="mt-5 shadow-sm card grid-item" @click="bookDetailData(book.id)">
                                                        <img v-bind:src="book.bookImage" class="card-img-top" alt="...">
                                                        <div class="card-body">
                                                            <h5 class="card-title" style="color:black;">{{ book.bookName }}</h5>
                                                            <p class="card-text writer-name">{{ book.writeName }}</p>
                                                            <span href="#" class="text-warning"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                                                    class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                                                            <span class="price">{{ book.price }}kyats</span>
                                                            <h5 class="r" style="color:black;">(<span class="text-danger">120</span><span class="review"> Review</span> )</h5>
                                                        </div>
                                                    </div>
                                                    </div>
                                                        </div>
                                                        <div v-else>
                                                        <h1>There is no data</h1>
                                                    </div>
                                                    </div>
                             </div>
        </div>   
        <div v-else class="again" style="margin-top:50px;">
        <h2 class="btn btn-danger" @click="Login()">Login Again</h2>
        </div>        
            </div>
</template>
<style src="../css/bookCollection.css"></style>
<script src="../js/bookCollection.js"></script>
