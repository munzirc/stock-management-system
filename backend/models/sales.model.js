import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: 1,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    soldAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Sales = mongoose.model('Sales', salesSchema);
export default Sales;
