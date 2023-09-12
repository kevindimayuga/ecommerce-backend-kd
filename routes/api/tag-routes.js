const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// this route is a GET request that will get ALL tags BY ID in our database with an HTTP request
// it will include all the tags, their attributes and also include the product
// and product attributes that are associated with that tag when you submit the GET request
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is a GET request that will get one tag BY ID in our database with an HTTP request
// it will include all the tag's attributes and also include the product
// and product attributes that are associated with that tag when you submit the GET request
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "There was no tag found with this id." });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is a POST request that will CREATE a new tag BY ID in our database with an HTTP request
// the new tag will have a new tag_name and unique ID
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is a PUT request that will UPDATE a product by ID
// It will have an updated unique ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData[0]) {
        res
          .status(404)
          .json({ message: 'There was no tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is a DELETE request that will DELETE a tag BY ID in our database with an HTTP request
// the tag will no longer be in the database once this request has been sent
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: 'There was no tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;