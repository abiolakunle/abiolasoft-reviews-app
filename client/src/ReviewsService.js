import axios from "axios";

const url = "api/reviews/";

class ReviewsService {
  //get reviews
  static getReviews() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(review => ({
            ...review,
            date: new Date(review.date)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  //post review
  static postReview(info) {
    return axios.post(url, info);
  }

  //delete review
}

export default ReviewsService;
