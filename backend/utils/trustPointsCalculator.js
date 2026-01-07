import Customer from '../models/customer.model.js';
import Feedback from '../models/feedback.model.js';

/**
 * Calculate trust points for a customer based on their reviews
 * Formula: trust_points = 0.5 * upvotes - 0.3 * downvotes (summed across all reviews)
 */
export const calculateTrustPoints = async (customerId) => {
    try {
        // Get all reviews by this customer
        const reviews = await Feedback.find({ customer_id: customerId });
        
        // Calculate total trust points
        let totalTrustPoints = 0;
        for (const review of reviews) {
            const upvotes = review.upvote_count || 0;
            const downvotes = review.downvote_count || 0;
            totalTrustPoints += (0.5 * upvotes) - (0.3 * downvotes);
        }
        
        // Round to 2 decimal places
        totalTrustPoints = Math.round(totalTrustPoints * 100) / 100;
        
        // Ensure trust points don't go below 0
        totalTrustPoints = Math.max(0, totalTrustPoints);
        
        return totalTrustPoints;
    } catch (error) {
        console.error('Error calculating trust points:', error);
        return 0;
    }
};

/**
 * Update customer's trust points in the database
 */
export const updateCustomerTrustPoints = async (customerId) => {
    try {
        const trustPoints = await calculateTrustPoints(customerId);
        
        await Customer.findByIdAndUpdate(
            customerId,
            { trust_points: trustPoints },
            { new: true }
        );
        
        return trustPoints;
    } catch (error) {
        console.error('Error updating customer trust points:', error);
        throw error;
    }
};

/**
 * Recalculate trust points for all customers (utility function)
 */
export const recalculateAllTrustPoints = async () => {
    try {
        const customers = await Customer.find({});
        
        for (const customer of customers) {
            await updateCustomerTrustPoints(customer._id);
        }
        
        console.log(`Recalculated trust points for ${customers.length} customers`);
    } catch (error) {
        console.error('Error recalculating all trust points:', error);
        throw error;
    }
};
