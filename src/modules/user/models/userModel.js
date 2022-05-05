import mongoose from "mongoose";

export const TYPE_VENDOR = "VENDOR";
export const TYPE_CUSTOMER = "CUSTOMER";

export const WalletSchema = mongoose.Schema({
  network: String,
  walletAddress: String,
  balance: Number,
  availableBalance: Number,
});

export const WalletModel = mongoose.model("Wallet", WalletSchema);

export const VendorSchema = mongoose.Schema({
  rates: [{ currency: String, sellRate: Number, buyRate: Number }],
});

export const VendorModel = mongoose.model("Vendor", VendorSchema);

export const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
      enum: [TYPE_VENDOR, TYPE_CUSTOMER],
      default: TYPE_CUSTOMER,
    },
    vendor: { type: VendorSchema },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);
