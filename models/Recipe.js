const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String
  },
  name: {
    type: String
  },
  userhandle: {
    type: String
  },
  ratings: [Number],
  preptime: {
    type: Number
  },
  imageId: {
    type: String
  },
  calories: {
    type: Number
  },
  cooktime: {
    type: Number
  },
  servings: {
    type: Number
  },

  description: {
    type: String
  },

  ingredients: {
    type: Array
  },
  directions: {
    type: Array
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      rating: {
        type: Number
      },

      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
