<template>
  <div id="proj">
    <div class="btn-back">
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <div class="heading">
      <h1 class="sm-heading">Drop a review for this project</h1>
    </div>
    <div class="form">
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input v-model="info.name" type="text" class="form-text" placeholder="Enter your name">
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input v-model="info.email" type="text" class="form-text" placeholder="Enter email">
      </div>
      <div class="rating">
        <h4 class="rating-label">Rate</h4>

        <div class="stars">
          <span
            class="fa fa-star fa-2x"
            v-on:click="info.rating = 5"
            v-bind:class="{ active : (info.rating == 5)}"
          ></span>
          <span
            class="fa fa-star fa-2x"
            v-on:click="info.rating = 4"
            v-bind:class="{ active : (info.rating >= 4)}"
          ></span>
          <span
            class="fa fa-star fa-2x"
            v-on:click="info.rating = 3"
            v-bind:class="{ active : (info.rating >= 3)}"
          ></span>
          <span
            class="fa fa-star fa-2x"
            v-on:click="info.rating = 2"
            v-bind:class="{ active : (info.rating >=2)}"
          ></span>
          <span
            class="fa fa-star fa-2x"
            v-on:click="info.rating = 1"
            v-bind:class="{active : (info.rating >= 1)}"
          ></span>
        </div>
      </div>
      <div class="form-group">
        <label for="comment" class="form-label">Comment</label>
        <textarea
          class="form-text"
          v-model="info.comment"
          name="comment"
          id="comment"
          cols="30"
          rows="10"
          placeholder="Enter your comment"
        ></textarea>
      </div>
      <div class="form-group">
        <button v-on:click="sendReview" class="btn-light">Submit</button>
      </div>
    </div>

    <div class="review-summary">
      <h3>Reviews Summary</h3>
      <div class="five-star" v-bind:style="{ width : summary[5]/reviews.length * 100 + '%'}">5</div>
      <div class="four-star" v-bind:style="{ width : summary[4]/reviews.length * 100 + '%'}">4</div>
      <div class="three-star" v-bind:style="{ width : summary[3]/reviews.length * 100 + '%'}">3</div>
      <div class="two-star" v-bind:style="{ width : summary[2]/reviews.length * 100 + '%'}">2</div>
      <div class="one-star" v-bind:style="{ width : summary[1]/reviews.length * 100 + '%'}">1</div>
      <div class="zero-star" v-bind:style="{ width : summary[0]/reviews.length * 100 + '%'}">0</div>
    </div>

    <div class="reviews">
      <div class="error" v-if="error">{{ error }}</div>
      <div
        class="review-item"
        v-for="(review, index) in reviews"
        v-bind:item="review"
        v-bind:index="index"
        v-bind:key="review._id"
      >
        <div class="review-pos">{{ reviews.length - index }}</div>

        <h2>{{ review.name }}</h2>
        <div class="review-star">
          <span class="fa fa-star" v-bind:class="{active : (review.rating >= 1)}"></span>
          <span class="fa fa-star" v-bind:class="{active : (review.rating >= 2)}"></span>
          <span class="fa fa-star" v-bind:class="{active : (review.rating >= 3)}"></span>
          <span class="fa fa-star" v-bind:class="{active : (review.rating >=4)}"></span>
          <span class="fa fa-star" v-bind:class="{active : (review.rating == 5)}"></span>
        </div>
        <p>{{ review.comment }}</p>
        <div
          class="review-time"
        >{{ `${review.date.getDay()}/${review.date.getMonth()}/${review.date.getFullYear()}` }}</div>
      </div>
    </div>

    <footer id="main-footer">
      Copyright &copy; Abiola
      <span class="text-secondary">Soft</span> 2019
    </footer>
  </div>
</template>

<script>
import ReviewsService from "../ReviewsService";
export default {
  name: "Projects",
  props: {
    msg: String
  },
  data() {
    return {
      reviews: [],
      error: "",
      summary: [0, 0, 0, 0, 0, 0],
      info: {
        name: "",
        email: "",
        rating: 0,
        comment: ""
      }
    };
  },

  async created() {
    try {
      const reviews = await ReviewsService.getReviews();
      this.reviews = reviews;
      this.reviews.reverse();
      reviews.forEach(review => {
        switch (review.rating) {
          case 0:
            this.summary[0]++;
            break;
          case 1:
            this.summary[1]++;
            break;
          case 2:
            this.summary[2]++;
            break;
          case 3:
            this.summary[3]++;
            break;
          case 4:
            this.summary[4]++;
            break;
          case 5:
            this.summary[5]++;
        }
      });
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async sendReview() {
      await ReviewsService.postReview(this.info);
      //empty the form fields

      for (let key in this.info) {
        this.info[key] = "";
      }
      this.reviews = await ReviewsService.getReviews();
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#proj {
  max-width: 960px;
  margin: 0 auto;
  border: 2px solid crimson;
  text-align: center;
  align-items: center;
}

.active {
  color: #ffd700;
}

.review-summary {
  max-width: 450px;
  margin: 100px auto;
}

.review-summary > div::before {
  content: "";
  display: block;
  background: #ffd700;
  width: 450px;
  height: 20px;
  position: absolute;
  z-index: -1;
}

.review-summary > div {
  background: crimson;
  margin-top: 10px;
  min-height: 20px;
  position: relative;
}

.review-item {
  position: relative;
  background: #666;
  width: 80%;
  margin: 0 auto;
}

.review-item p {
  font-size: 20px;
  color: rgb(31, 30, 30);
  padding: 0px 0px 40px 0px;
}
.review-pos {
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 10px;
  background: #444;
}
.review-time {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 5px 10px;
  background: #444;
  z-index: 2;
}
.stars {
  display: inline-block;
  direction: rtl;
}

.stars > span:hover:before,
.stars > span:hover ~ span:before {
  color: #ffd700;
}

.rating {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.rating-label {
  grid-column: 1 / 2;
  font-size: 20px;
}

.stars {
  grid-column: 2 / 5;
  padding: 20px;
}

.btn-light {
  grid-column: 2 / 3;
}
</style>
