const { User } = require('../models');
const { signToken } = require('../utils/auth');
const connectDB = require('../config/connection')
import { GraphQLError } from 'graphql';

const { NextResponse } = require('next/server');

const resolvers = {
  Query: {
    me: async (parent, args, nextRequest) => {
      await connectDB();

      if (nextRequest.user) {
        const userData = await User.findOne({ _id: nextRequest.user._id }).select('-__v -password');

        return userData;
      }

      throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
          code: 'AUTH_ERROR',
        },
      });
    },
  },

  Mutation: {
    saveBook: async (parent, { bookData }, nextRequest) => {
      await connectDB();

      if (nextRequest.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: nextRequest.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return updatedUser;
      }

      throw new GraphQLError('You have to be logged in!', {
        extensions: {
          code: 'AUTH_ERROR',
        },
      });
    },
    removeBook: async (parent, { bookId }, nextRequest) => {
      await connectDB();

      if (nextRequest.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: nextRequest.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new GraphQLError('You have to be logged in!', {
        extensions: {
          code: 'AUTH_ERROR',
        },
      });
    },
  },
};

module.exports = resolvers;
