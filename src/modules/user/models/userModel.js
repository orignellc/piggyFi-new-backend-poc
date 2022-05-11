import mongoose from "mongoose";
import Encryptor from "../../../helpers/encrypter.js";

export const USER_TYPE_VENDOR = "VENDOR";
export const USER_TYPE_CUSTOMER = "CUSTOMER";

export const WalletSchema = mongoose.Schema({
  network: String,
  walletAddress: String,
  balance: Number,
  availableBalance: Number,
});

export const VendorSchema = mongoose.Schema({
  rates: [{ currency: String, sellRate: Number, buyRate: Number }],
});

export const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    countryCode: {
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
    },
    type: {
      type: String,
      enum: [USER_TYPE_VENDOR, USER_TYPE_CUSTOMER],
      default: USER_TYPE_CUSTOMER,
      uppercase: true,
    },
    vendor: { type: VendorSchema },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = function (password) {
  return Encryptor.compare(password, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);
