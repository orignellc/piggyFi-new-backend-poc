import mongoose from "mongoose";
import Encryptor from "../../../helpers/encrypter.js";

export const USER_TYPE_VENDOR = "VENDOR";
export const USER_TYPE_CUSTOMER = "CUSTOMER";

export const WalletSchema = mongoose.Schema({
  network: String,
  wallet_id: String,
  user_id: String,
  address: String,
  locked: Boolean,
  balance: Number,
  available_balance: Number,
  balance_in_local_currency: Number,
  local_currency: String,
});

export const VendorSchema = mongoose.Schema({
  rates: [
    {
      currency: {
        type: String,
        required: true,
        unique: true,
      },
      sellRate: Number,
      buyRate: Number,
    },
  ],
});

export const UserSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      // required: true,
      // required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      required: true,
      uppercase: true,
    },
    wallets: {
      celo: {
        type: WalletSchema,
      },
      bsc: {
        type: WalletSchema,
      },
      avax: {
        type: WalletSchema,
      },
      umoja: {
        type: WalletSchema,
      },
    },
    type: {
      type: String,
      enum: [USER_TYPE_VENDOR, USER_TYPE_CUSTOMER],
      default: USER_TYPE_CUSTOMER,
      uppercase: true,
    },
    // vendor: { type: VendorSchema },
    phone_verified_at: { type: Date },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = function (password) {
  return Encryptor.compare(password, this.password);
};

UserSchema.methods.setPhoneVerified = function () {
  this.phone_verified_at = new Date();
  return this.save();
};

export const UserModel = mongoose.model("User", UserSchema);
