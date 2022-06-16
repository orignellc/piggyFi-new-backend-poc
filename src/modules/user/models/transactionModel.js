import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
  type: { type: String, enum: ["debit", "credit"], required: true },
  channel: {
    type: String,
    enum: ["Mobile money", "Crypto", "Bank transfer"],
    required: true,
  },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  wallet_balance: {
    current: { type: Number, required: true },
    available: { type: Number, required: true },
    local_currency: { type: Number, required: true },
  },
  recipient: {
    phone: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    name: { type: String },
    mobile_money: {
      provider: { type: String, lowercase: true },
      name: { type: String },
      account_number: { type: String },
    },
    bank_transfer: {
      bank_name: { type: String },
      account_name: { type: String },
      account_number: { type: String },
    },
  },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  // fee_amount: { type: Number, required: true },
  // fee_local_amount: { type: Number, required: true },
  provider: {
    name: String,
    transaction_id: String,
    wallet_id: String,
    user_id: String,
    data: Object,
  },
});

export const TransactionModel = mongoose.model(
  "Transaction",
  TransactionSchema
);
