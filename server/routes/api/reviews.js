const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//get all reviews
router.get("/:id", async (req, res) => {
  const reviews = await loadReviewsCollection();
  res.send(await reviews.find({ projectId: req.params.id }).toArray());
});

//Add review
router.post("/:id", async (req, res) => {
  const reviews = await loadReviewsCollection();
  await reviews.insertOne({
    name: req.body.name,
    email: req.body.email,
    rating: req.body.rating,
    comment: req.body.comment,
    projectId: req.params.id,
    date: new Date()
  });

  res.status(201).send();
});

//Delete review
router.delete("/:id", async (req, res) => {
  const reviews = await loadReviewsCollection();
  await reviews.deleteOne({ _id: mongodb.ObjectID(req.params.id) });

  res.status(201).send();
});

async function loadReviewsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://test:test@cluster0-owkm0.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  return client.db("abiolasoft_portfolio").collection("reviews");
}

module.exports = router;
