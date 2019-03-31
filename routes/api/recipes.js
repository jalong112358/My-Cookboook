const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// LOAD RECIPE MODEL
const Recipe = require("../../models/Recipe");
// LOAD PROFILE MODEL
const Profile = require("../../models/Profile");

// Validation
const validateRecipeInput = require("../../validation/recipe");
const validateCommentInput = require("../../validation/comment");

// @route   GET api/recipes/test
// @desc    Tests recipes route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "recipe works" }));

// @route   GET api/recipes
// @desc    Get recipes
// @access  Public
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
});

// @route   GET api/recipes/featured
// @desc    Get featured recipes
// @access  Public
router.get("/featured", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    // .skip(Number(req.query.skip))
    // .limit(16)

    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
});

// @route   GET api/recipes
// @desc    Get recipes in chunks
// @access  Public
router.get("/chunk", (req, res) => {
  console.log(req.query.search);
  console.log(req.query.skip);
  //  If there is a query of search
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Recipe.find({ title: regex })
      .sort({ date: -1 })
      // .skip(Number(req.query.skip))
      // .limit(16)

      .then(recipes => res.json(recipes))
      .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
  } else {
    Recipe.find()
      .sort({ date: -1 })
      // .skip(Number(req.query.skip))
      // .limit(16)

      .then(recipes => res.json(recipes))
      .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
  }
});

// @route   GET api/recipes/:userId
// @desc    Get recipes by user
// @access  Public
router.get("/:userId", (req, res) => {
  console.log(req.params.userId);
  Recipe.find({ user: req.params.userId })

    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
});

// @route   GET api/recipes/:id
// @desc    Get recipe by id
// @access  Public
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)

    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({ norecipefound: "No recipe found" }));
});

// @route   POST api/recipes
// @desc    Create recipe
// @access  Private

router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);
    console.log(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newRecipe = new Recipe({
      name: req.body.name,
      user: req.user.id,
      userhandle: req.body.userhandle,
      preptime: req.body.preptime,
      cooktime: req.body.cooktime,
      servings: req.body.servings,

      title: req.body.title,
      description: req.body.description,
      imageId: req.body.imageId,
      calories: req.body.calories,
      ingredients: req.body.ingredients,
      directions: req.body.directions
    });

    newRecipe.save().then(recipe => res.json(recipe));
  }
);

// @route   Delete api/recipes/:id
// @desc    Delete recipe
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          //check for recipe owner
          if (recipe.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "User not authorized"
            });
          }
          // Delete recipe
          recipe.remove().then(() =>
            res.json({
              success: true
            })
          );
        })
        .catch(err =>
          res.status(404).json({ recipenotfound: "No recipe found" })
        );
    });
  }
);

// @route   POST api/recipes/like/:id
// @desc    Like recipe
// @access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          if (
            recipe.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          // Add user id to likes array
          recipe.likes.unshift({ user: req.user.id });

          recipe.save().then(recipe => res.json(recipe));
        })
        .catch(err =>
          res.status(404).json({ recipenotfound: "No recipe found" })
        );
    });
  }
);

// @route   POST api/recipes/unlike/:id
// @desc    unlike recipe
// @access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          if (
            recipe.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have not liked this recipe" });
          }
          // Get the remove index
          const removeIndex = recipe.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          recipe.likes.splice(removeIndex, 1);

          // Save
          recipe.save().then(recipe => res.json(recipe));
        })
        .catch(err =>
          res.status(404).json({ recipenotfound: "No recipe found" })
        );
    });
  }
);

// @route   POST api/recipes/comment/:id
// @desc    Add comment to recipe
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Recipe.findById(req.params.id)
      .then(recipe => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          rating: req.body.rating,
          userId: req.body.userId,
          user: req.user.id
        };
        const rating = req.body.rating;

        // Add to comments array
        recipe.comments.unshift(newComment);
        recipe.ratings.unshift(rating);

        // Save
        recipe.save().then(recipe => res.json(recipe));
      })
      .catch(err =>
        res.status(404).json({ recipenotfound: "No recipe found" })
      );
  }
);

// @route   DELETE api/recipes/comment/:id/:comment_id
// @desc    Remove comment from recipe
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        // Check if comment exists
        if (
          recipe.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }
        // Get remove index
        const removeIndex = recipe.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        recipe.comments.splice(removeIndex, 1);
        recipe.save().then(recipe => res.json(recipe));
      })
      .catch(err =>
        res.status(404).json({ recipenotfound: "No recipe found" })
      );
  }
);

// @route   POST api/recipes/rate/:id
// @desc    Rate recipe
// @access  Private

// router.post(
//   "/rate/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // const { errors, isValid } = validateCommentInput(req.body);

//     // // Check Validation
//     // if (!isValid) {
//     //   return res.status(400).json(errors);
//     // }
//     Recipe.findById(req.params.id)
//       .then(recipe => {
//         const rating = req.body.rating;
//         console.log(req.body.rating);
//         console.log(recipe);
//         // // Add to ratings array
//         // recipe.ratings.unshift(rating);

//         // // Save
//         // recipe.save().then(recipe => res.json(recipe));
//       })
//       .catch(err =>
//         res.status(404).json({ recipenotfound: "No recipe found" })
//       );
//   }
// );

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = router;
