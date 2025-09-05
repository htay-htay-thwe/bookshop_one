import moment from 'moment'
import { mapGetters } from 'vuex';
import $ from 'jquery';
import { api, BOOKS_BASE_URL } from '@/api';


export default {
  name: 'bookDetail',
  data() {
    return {
      showRange: '',
      bookGenre: {},
      bookWriter: {},
      search: '',
      moment: moment,
      postLists: [],
      loginStatus: false,
      bookId: 0,
      user_name: "",
      loadingStatus: false,
      productsByPriceRange: {},
      range: '',
      selected: [],
      selectedGenre: [],
      selectedWriter: [],
      post: {},
      filterPrice: [],
      filterGenre: [],
      filterWriter: [],
      filterGenrePrice: [],
      dataEmpty: false,
      order: {},
      bookDetailId: 0,
      orderCount: 0,
      orderTotal: [],
      counts: {},
      orderLength: [],
      srcImage: "",

    }
  },
  computed: {
    ...mapGetters(["storageToken", "storageUserData", "storageOrderTotal"]),
    dataOrderList() {
      return this.storageOrderTotal;
    },
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

    remove(id, index) {
      this.order.splice(index, 1);

      let data = {
        book_id: id,
        user_id: this.storageUserData.id,
      }
      const token = this.storageToken;
      api.post("/remove/order", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {

        this.$store.dispatch('setOrderTotal', response.data.updateOrderTotal);
        this.summaryCalculation();
      })
    },
    isSelected(showRange) {
      // Check if the value is selected
      return this.selected.includes(showRange);
    },
    Selected(genre) {
      return this.selectedGenre.includes(genre)
    },
    SelectedWriter(writer) {
      return this.selectedWriter.includes(writer);
    },
    filter(showRange, genre, writer) {

      if (showRange !== '') {
        const index = this.selected.indexOf(showRange);
        if (index === -1) {
          this.selected.push(showRange);
        } else {
          this.selected.splice(index, 1);
        }
      } else {
        this.dataEmpty = true;
      }
      if (genre !== '') {
        const indexGenre = this.selectedGenre.indexOf(genre);
        if (indexGenre === -1) {
          this.selectedGenre.push(genre);
        } else {
          this.selectedGenre.splice(indexGenre, 1);
        }
      } else {
        this.dataEmpty = true;
      }
      if (writer !== '') {
        const indexGenre = this.selectedWriter.indexOf(writer);
        if (indexGenre === -1) {
          this.selectedWriter.push(writer);
        } else {
          this.selectedWriter.splice(indexGenre, 1);
        }
      } else {
        this.dataEmpty = true;
      }

      if (this.selectedGenre.length > 0 || this.selected.length > 0 || this.selectedWriter.length > 0) {
        const token = this.storageToken;
        const requestData = {
          genres: this.selectedGenre, // Assuming this contains the selected genre
          prices: this.selected,
          writer: this.selectedWriter // Assuming this contains the selected price ranges
        };
        api.post('/filter', requestData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {

          if (
            this.postLists === 0
          ) {
            this.dataEmpty = true;
          }
          if (response.data.filterByPrice != '') {
            for (let i = 0; i < response.data.filterByPrice.length; i++) {
              if (response.data.filterByPrice[i].bookImage != null) {
                response.data.filterByPrice[i].bookImage = BOOKS_BASE_URL + response.data.filterByPrice[i].bookImage;
              }
            }

            this.postLists = response.data.filterByPrice;
          } else if (response.data.filterByGenre != '') {
            for (let i = 0; i < response.data.filterByGenre.length; i++) {
              if (response.data.filterByGenre[i].bookImage != null) {
                response.data.filterByGenre[i].bookImage = BOOKS_BASE_URL + response.data.filterByGenre[i].bookImage;
              }
            }
            this.postLists = response.data.filterByGenre;
          } else if (response.data.filterByWriter != '') {
            for (let i = 0; i < response.data.filterByWriter.length; i++) {
              if (response.data.filterByWriter[i].bookImage != null) {
                response.data.filterByWriter[i].bookImage = BOOKS_BASE_URL + response.data.filterByWriter[i].bookImage;
              }
            }
            this.postLists = response.data.filterByWriter;
          }
          if (response.data.filterByPriceGenre.length > 0) {
            for (let i = 0; i < response.data.filterByPriceGenre.length; i++) {
              if (response.data.filterByPriceGenre[i].bookImage !== null) {
                response.data.filterByPriceGenre[i].bookImage = BOOKS_BASE_URL + response.data.filterByPriceGenre[i].bookImage;
              }
            }
            this.postLists = response.data.filterByPriceGenre;
          }

          if (response.data.filterByPriceWriter.length > 0) {
            for (let i = 0; i < response.data.filterByPriceWriter.length; i++) {
              if (response.data.filterByPriceWriter[i].bookImage !== null) {
                response.data.filterByPriceWriter[i].bookImage = BOOKS_BASE_URL + response.data.filterByPriceWriter[i].bookImage;
              }
            }
            this.postLists = response.data.filterByPriceWriter;
          }
          if (response.data.filterByGenreWriter.length > 0) {
            for (let i = 0; i < response.data.filterByGenreWriter.length; i++) {
              if (response.data.filterByGenreWriter[i].bookImage !== null) {
                response.data.filterByGenreWriter[i].bookImage = BOOKS_BASE_URL + response.data.filterByGenreWriter[i].bookImage;
              }
            }
            this.postLists = response.data.filterByGenreWriter;
          }

          if (response.data.filterByThree.length > 0) {
            for (let i = 0; i < response.data.filterByThree.length; i++) {
              if (response.data.filterByThree[i].bookImage !== null) {
                response.data.filterByThree[i].bookImage = BOOKS_BASE_URL + response.data.filterByThree[i].bookImage;
              }
            }
            this.postLists = response.data.filterByThree;
          }
        });
      } else {
        this.GetBook();
      }
    },
    getSearch() {
      let search = {
        key: this.search,
      }
      const token = this.storageToken;
      api.post('/search', search, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        for (let i = 0; i < response.data.search.length; i++) {
          if (response.data.search[i].bookImage != null) {
            response.data.search[i].bookImage = BOOKS_BASE_URL + response.data.search[i].bookImage;
          }
        }
        this.postLists = response.data.search;
      })
    },
    cart() {
      this.loadingStatus = true;
      const user_id = this.storageUserData.id;
      const token = this.storageToken;
      if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
        api.get(`/order/cart/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {

          this.loginStatus = true;
          for (let i = 0; i < response.data.orderData.length; i++) {
            if (response.data.orderData[i].bookImage != null) {
              response.data.orderData[i].bookImage = BOOKS_BASE_URL + response.data.orderData[i].bookImage;
            }
          }
          this.order = response.data.orderData;
          this.loadingStatus = false,
            this.summaryCalculation();
        })
      } else {
        this.loginStatus = false;
      }
    },


    editPage() {
      this.$router.push({
        name: 'Edit_profile'
      })
    },
    home() {
      if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
        this.$router.push({
          name: 'BookCollection',
        })
      } else {
        this.$router.push({
          name: 'LoginView',
        })
      }
    },
    back() {
      history.back();
    },
    Page() {
      this.$router.push({
        name: 'HomeView'
      })
    },
    bookDetailData(id) {
      this.$router.push({
        name: 'bookDetail',
        query: {
          bookId: id
        }
      })
    },
    GetBook() {
      this.dataEmpty = true;
      if (this.storageToken) {
        this.loadingStatus = true;
      }
      const token = this.storageToken;
      api.get("/book/collection", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        this.loginStatus = true;
        console.log('data',);
        for (let i = 0; i < response.data.book.length; i++) {
          if (response.data.book[i].bookImage != null) {
            response.data.book[i].bookImage = BOOKS_BASE_URL + response.data.book[i].bookImage;
          }
        }
        this.postLists = response.data.book;
        this.post = response.data.book;
        this.bookGenre = response.data.bookGenre;
        console.log('gen', this.bookGenre);
        this.bookWriter = response.data.bookWriter;
        this.productsByPriceRange = response.data.productsByPriceRange,
          this.user_name = this.storageUserData.name;
        this.loadingStatus = false;
      })
        .catch((error) => {
          console.log(error);
        })
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.loginStatus = false;
      this.$router.push({
        name: 'HomeView'
      })
    },
    checkToken() {
      if (this.storageToken != null && this.storageToken != undefined && this.storageToken != "") {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
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
    incrementQuantity(index) {
      this.order[index].quantity++;
      this.updateTotal(index);
      this.summaryCalculation();
    },

    decrementQuantity(index) {
      if (this.order[index].quantity > 1) {
        this.order[index].quantity--;
        this.updateTotal(index);
        this.summaryCalculation();
      }
    },

    updateTotal(index) {
      const price = parseFloat(this.order[index].price);
      const quantity = this.order[index].quantity;
      this.order[index].total = price * quantity;
    },

    summaryCalculation() {
      let totalPrice = this.order.reduce((sum, item) => sum + (item.total || item.price), 0);
      $("#subTotalPrice").text(`${totalPrice} Kyats`);
      $("#finalPrice").text(`${totalPrice + 3000} Kyats`);
    }
  },
  mounted() {
    this.GetBook();
    this.checkToken();
    this.orderLength = this.storageOrderTotal;
    this.user_name = this.storageUserData.name;
    this.srcImage = this.storageUserData.image
      ? (this.storageUserData.image.startsWith(BOOKS_BASE_URL)
        ? this.storageUserData.image
        : BOOKS_BASE_URL + this.storageUserData.image)
      : "book/default.png";

    $(document).ready(() => {
      $('.sub-btn').click(function () {
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

    });
  }

}