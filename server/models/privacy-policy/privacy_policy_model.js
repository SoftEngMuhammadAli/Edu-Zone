import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
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

export default mongoose.model("PrivacyPolicy", privacyPolicySchema);
