import VendorRates from "../../logics/VendorRates.js";

export default function availableVendors(req, resp) {
  const params = req.params;

  new VendorRates().listVendorsThatCanSend(params.amount);
}
