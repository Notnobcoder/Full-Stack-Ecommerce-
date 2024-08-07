

import { ObjectType, Field, ID } from "type-graphql";

import { registerEnumType } from "type-graphql";

export enum MERCHANT_STATUS {
  Waiting_Approval = "Waiting_Approval",
  Rejected = "Rejected",
  Approved = "Approved"
}

registerEnumType(MERCHANT_STATUS, {
  name: "MERCHANT_STATUS",
  description: "The status of a merchant",
});

export enum Role {
  Admin = "Admin",
  Member = "Member",
  Merchant = "Merchant"
}

registerEnumType(Role, {
  name: "Role",
  description: "The role of a user",
});

export enum Status {
  NotProcessed = "NotProcessed",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}

registerEnumType(Status, {
  name: "Status",
  description: "The status of an order",
});

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Field()
  address?: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field()
  zipCode: string;

  @Field()
  isDefault: boolean;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => User)
  user: User;

  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class Brand {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  image: string; // Adjust according to your need

  @Field({ nullable: true })
  description?: string;

  @Field()
  isActive: boolean;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => Merchant)
  merchant: Merchant;

  @Field(() => ID)
  merchantId: string;

  @Field(() => [Product])
  Product: Product[];
}

@ObjectType()
export class Cart {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  products: Product;

  @Field(() => User)
  users: User;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [Order])
  Order: Order[];
}

@ObjectType()
export class CartItem {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field()
  quantity: number;

  @Field()
  purchasePrice: number;

  @Field()
  totalPrice: number;

  @Field()
  priceWithTax: number;

  @Field()
  totalTax: number;

  @Field(() => Status)
  status: Status;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => ID)
  productId: string;
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field()
  isActive: string;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => Product)
  products: Product;

  @Field(() => ID)
  productId: string;
}

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  message: string;

  @Field()
  created: Date;

  @Field()
  updated: Date;
}

@ObjectType()
export class Merchant {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  brandName: string;

  @Field()
  business: string;

  @Field()
  isActive: boolean;

  @Field(() => MERCHANT_STATUS)
  status: MERCHANT_STATUS;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => [Brand])
  Brand: Brand[];

  @Field(() => [User])
  User: User[];
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Cart)
  cart: Cart;

  @Field(() => User)
  user: User;

  @Field()
  total: number;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => ID)
  cartId: string;

  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true, defaultValue: "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=800" })
  imageUrl?: string;

  @Field({ nullable: true })
  imageKey?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  quantity: number;

  @Field()
  price: number;

  @Field()
  taxable: boolean;

  @Field()
  isActive: boolean;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => Brand)
  brand: Brand;

  @Field(() => ID)
  brandId: string;

  @Field(() => [CartItem])
  CartItem: CartItem[];

  @Field(() => [Cart])
  Cart: Cart[];

  @Field(() => [Category])
  Category: Category[];

  @Field(() => [Review])
  Review: Review[];

  @Field(() => [Wishlist])
  Wishlist: Wishlist[];
}

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field(() => User)
  user: User;

  @Field()
  title: string;

  @Field()
  rating: string;

  @Field()
  review: string;

  @Field()
  isRecomended: boolean;

  @Field(() => MERCHANT_STATUS)
  status: MERCHANT_STATUS;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field(() => Merchant)
  merchant: Merchant;

  @Field()
  provider: string;

  @Field()
  googleId: string;

  @Field()
  facebookId: string;

  @Field()
  avatar: string;

  @Field(() => Role)
  role: Role;

  @Field()
  resetPasswordToken: string;

  @Field()
  resetPasswordExpires: string;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => [Address])
  Address: Address[];

  @Field(() => [Cart])
  Cart: Cart[];

  @Field(() => [Order])
  Order: Order[];

  @Field(() => [Review])
  Review: Review[];

  @Field(() => ID)
  merchantId: string;

  @Field(() => [Wishlist])
  Wishlist: Wishlist[];
}

@ObjectType()
export class Wishlist {
  @Field(() => ID)
  id: string;

  @Field(() => Product)
  product: Product;

  @Field(() => User)
  user: User;

  @Field()
  isLiked: boolean;

  @Field()
  created: Date;

  @Field()
  updated: Date;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  userId: string;
}
