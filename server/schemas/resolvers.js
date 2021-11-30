const { AuthenticationError } = require("apollo-server-express");
const { User, Art } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Query for all users
    users: async () => {
      return User.find();
    },

    // Query for one user
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },

    // Query for all videos
    art: async () => {
      return await Art.find().sort({ publishDate: -1 });
    },

    // Query for one video
    singleArt: async (parent, { artId }) => {
      return await Art.findById({ _id: artId });
    },

    artGenre: async (parent, { genre }) => {
      return await Art.find({ genre: genre });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them

    me: async (parent, args, context) => {
      // console.log(context.body)
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // Mutation to add a video
    addArt: async (parent, { title, cloudURL, genre }) => {
      const art = await Art.create({ title, cloudURL, genre });
      return art;
    },

    // Mutation to sign up
    // addUser: async (parent, { name, email, password, level }) => {
    //   const user = await User.create({ name, email, password, level });
    //   const token = await signToken(user);
    //   console.log(token);
    //   return { user, token };
    // },

    // Mutation to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      console.log(user);
      return { token, user };
    },

    
    // Mutation to delete a video
    removeArt: async (parent, { artId }, context) => {
      if (context.user) {
        const art = await Art.findOneAndDelete({
          _id: artId,
        });

        return art;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
