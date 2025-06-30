import mongoose from "mongoose";

const termsAndConditionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TermsConditions",
  termsAndConditionsSchema,
  "terms-and-conditions"
);
