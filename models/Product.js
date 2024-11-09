const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    image: {
        type: String,
        default: '/uploads/example.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ["office", "kitchen", "bedroom"]
    },
    company: {
        type: String,
        required: [true, 'Please provide product company'],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: 'Please provide product company'
        }
    },
    colors: {
        type: [String],
        default: ['#000'],
        required: [true, 'Please provide product colors']
    },
    featured: {
        type: Boolean,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    averageRating: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }

},
{
    timestamps: true,
    toJSON: {virtuals: true},
})


ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
})

ProductSchema.pre('remove', async function(next){
    await this.model('Review').deleteMany({product: this._id})
} )

module.exports = mongoose.model('Product', ProductSchema)