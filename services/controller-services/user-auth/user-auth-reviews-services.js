const User = require('../../../models/UserModel');
const Product = require('../../../models/ProductModel');
const Review = require('../../../models/ReviewModel');
const errorHandler = require('../../../utils/error-handler/controller-errors');

/*
  * Description: Add a user review for a product
  * File Usage: /controllers/user-auth-controllers/user-auth-reviews-controller.js
  * Parameters: reviewBody (req.body), productId (req.params), userId (req.user), req
 */
exports.addProductReviewService = async (reviewBody, productId, userId, req) => {
    try {
        const user = await User.findOne({_id: userId});
        if (!user) {
            return {
                status: 404,
                message: 'User not found.',
                review: ''
            };
        }

        const product = await Product.findById(productId);
        if (!product) {
            return {
                status: 404,
                message: 'Product not found.',
                review: ''
            };
        }

        const existingReview = await Review.findOne({product: productId, user: userId});
        if (existingReview) {
            return {
                status: 409,
                message: 'User has already posted a review for this product.',
                review: existingReview,
            };
        }

        const newReview = new Review({
            product: productId,
            user: userId,
            rating: reviewBody.rating,
            comment: reviewBody.comment,
        });

        await newReview.save();

        product.reviews.push(newReview._id);
        product.numReviews = product.reviews.length;

        const validReviews = await Review.find({_id: {$in: product.reviews}}).select('rating');
        const totalRating = validReviews.reduce((acc, item) => item.rating + acc, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();

        return {
            status: 200,
            message: 'Review added successfully.',
            review: newReview,
        };
    } catch (error) {
        console.log('Error in addProductReviewService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while adding the review.',
            review: '',
        };
    }
}

/*
  * Description: Update a user review for a product
  * File Usage: /controllers/user-auth-controllers/user-auth-reviews-controller.js
  * Parameters: reviewId (req.params), reviewBody (req.body), userId (req.user), req
*/
exports.updateProductReviewService = async (reviewId, reviewBody, userId, req) => {
    try {
        const reviewToUpdate = await Review.findById(reviewId.trim());

        if (!reviewToUpdate) {
            return {
                status: 404,
                message: 'Whoops! The review decided to take a spontaneous sabbatical to explore hidden treasures in faraway lands. We hope it returns with tales of adventure.',
                review: {},
            };
        }

        if (reviewToUpdate.user.toString() !== userId) {
            return {
                status: 401,
                message: 'Hold up! You\'re attempting to rewrite history. Time-traveling novices are advised to stick to their own timelines for updates..',
                review: {},
            };
        }


        const product = await Product.findById(reviewToUpdate.product);
        if (!product) {
            return {
                status: 404,
                message: 'Error 404: Product Not Found. It must have stumbled into a time portal and ended up in a medieval marketplace. We\'re sending knights to retrieve it!',
                review: {},
            };
        }

        const rating = parseFloat(reviewBody.rating);
        if (isNaN(rating)) {
            return {
                status: 400,
                message: 'Error 42: Rating Value Out of Bounds. Looks like you\'ve entered the Twilight Zone of numbers. Please return to the realm of 1 to 5.',
                review: {},
            };
        }

        reviewToUpdate.rating = reviewBody.rating;
        reviewToUpdate.comment = reviewBody.comment;
        reviewToUpdate.edited = true;
        await reviewToUpdate.save();

        const validReviews = await Review.find({_id: {$in: product.reviews}}).select('rating');
        const totalRating = validReviews.reduce((acc, item) => item.rating + acc, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();

        return {
            status: 200,
            message: 'Review updated successfully.',
            review: reviewToUpdate,
        };
    } catch (error) {
        console.log('Error in updateProductReviewService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while updating the review.',
            review: {},
        };
    }
}

/*
  * Description: Delete a user review for a product
  * File Usage: /controllers/user-auth-controllers/user-auth-reviews-controller.js
  * Parameters: reviewId (req.params), userId (req.user), req
*/
exports.deleteProductReviewService = async (reviewId, userId, req) => {
    try {
        const reviewToDelete = await Review.findById(reviewId.trim());
        if (!reviewToDelete) {
            return {
                status: 404,
                message: 'Review not found.',
                review: {},
            };
        }
        let product = await Product.findById(reviewToDelete.product);
        if (!product) {
            return {
                status: 404,
                message: 'Product not found.',
                product: {},
            };
        }

        if (reviewToDelete.user.toString() !== userId) {
            return {
                status: 401,
                message: 'Unauthorized.',
                review: {},
            };
        }

        await Review.findByIdAndDelete(reviewId.trim());
        product.reviews.pull(reviewId.trim());
        product.numReviews = product.reviews.length;

        const validRatings = product.reviews.filter((item) => typeof item.rating === 'number' && !isNaN(item.rating));
        const totalRating = validRatings.reduce((acc, item) => item.rating + acc, 0);
        const averageRating = totalRating / validRatings.length;

        product.rating = isNaN(averageRating) ? 0 : averageRating;
        await product.save();

        return {
            status: 200,
            message: 'Review deleted successfully.',
            review: reviewToDelete,
        };

    } catch (error) {
        console.log('Error in deleteProductReviewService');
        await errorHandler(error, req);
        return {
            status: 500,
            message: 'An error occurred while deleting the review.',
            review: {},
        }
    }
}