const router = require('express').Router();
// this will import the data from our models directory, particularly the category and product js files
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// this GET request will find all the categories that are in our database
// it will include the category attributes as well as the products (and product details) that are associated with that category
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    // this will make sure to transfer the data as JSON data to the client (Insomnia, in this case)
    .then((dbCategoryData) => res.json(dbCategoryData))
    // this will provide an error response to the client and console log it with information on the 
    // error in JSON format (again, in Insomnia in this case)
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this GET request will find all the categories BY ID that are in our database
// it will include the category attributes and will still include the products (and product details) 
// that are associated with that category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "There was no category found for this id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this POST request will CREATE a new category and add it to our category database
// the new category will have a category_name and be provided with a unique ID
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbProductData) => res.json(dbProductData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this PUT request will UPDATE a category and add it to our category database
// the new category will have an updated category_name and be provided with a NEW unique ID
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "There was no category found with this id." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this DELETE request will DELETE a category and remove it from our database
// the deleted category will no longer be in our database
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'There was no category found with this id.' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;