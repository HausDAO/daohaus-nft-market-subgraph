import { SetOrder, FillOrder, CloseOrder } from "../generated/NftSale/NftSale";
import { Order } from "../generated/schema";

// event SetOrder(
//   address indexed seller,
//   uint256 price,
//   uint256 tokenId,
//   address token,
//   address nftAddress,
//   address altReceiver,
//   string details);
export function handleSetOrder(event: SetOrder): void {
  // TODO: this id will override future listings
  // closeOrder only has tokenid and nftaddress
  let orderId = event.params.nftAddress
    .toHexString()
    .concat("-")
    .concat(event.params.tokenId.toString());

  let order = new Order(orderId);

  order.active = true;
  order.filled = false;
  order.price = event.params.price;
  order.saleToken = event.params.token;
  order.nftAddress = event.params.nftAddress;
  order.tokenId = event.params.tokenId;
  order.alternateReceiver = event.params.altReceiver;
  order.details = event.params.details;

  order.save();
}

// event FillOrder(address indexed payer, uint tokenId, address nftAddress, address token, address receiver, uint256 price);
export function handleFillOrder(event: FillOrder): void {
  let orderId = event.params.nftAddress
    .toHexString()
    .concat("-")
    .concat(event.params.tokenId.toString());

  let order = Order.load(orderId);
  // TODO: handle null

  order.active = false;
  order.filled = true;

  order.save();
}

// event CloseOrder(address token, uint tokenId);
export function handleCloseOrder(event: CloseOrder): void {
  let orderId = event.params.token
    .toHexString()
    .concat("-")
    .concat(event.params.tokenId.toString());

  let order = Order.load(orderId);
  // TODO: handle null

  order.filled = true;

  order.save();
}

// event SetToken(address indexed token, bool active);
// event SetNft(address indexed nft, bool active);

// - CloseOrder(address,uint256)
// - FillOrder(indexed address,uint256,address,address,address,uint256)
// - OwnershipTransferred(indexed address,indexed address)
// - SetNft(indexed address,bool)
// - SetOrder(indexed address,uint256,uint256,address,address,address,string)
// - SetToken(indexed address,bool)
