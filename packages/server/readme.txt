
enum MERCHANT_STATUS {
  Waiting_Approval
  Rejected
  Approved
}

enum Role {
  Admin
  Member
  Merchant
}

enum Status {
  NotProcessed
  Processing
  Shipped
  Delivered
  Cancelled
}

model Address {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  user      User     @relation(fields: [userId], references: [id])
  address   String?
  city      String
  state     String
  country   String
  zipCode   String
  isDefault Boolean  @default(false)
  created   DateTime @default(now())
  updated   DateTime @updatedAt
  userId    String   @db.ObjectId
}

model Brand {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  slug        String    @unique
  image       Bytes
  description String?
  isActive    Boolean   @default(false)
  merchant    Merchant  @relation(fields: [merchantId], references: [id])
  created     DateTime  @default(now())
  updated     DateTime  @updatedAt
  merchantId  String    @db.ObjectId
  Product     Product[]
}

model Cart {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  products  Product  @relation(fields: [productId], references: [id])
  users     User     @relation(fields: [userId], references: [id])
  created   DateTime @default(now())
  updated   DateTime @updatedAt
  productId String   @db.ObjectId
  userId    String   @db.ObjectId
  Order     Order[]
}

model CartItem {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  product       Product  @relation(fields: [productId], references: [id])
  quantity      Int      @default(0)
  purchasePrice Int      @default(0)
  totalPrice    Int      @default(0)
  priceWithTax  Int      @default(0)
  totalTax      Int      @default(0)
  status        Status
  created       DateTime @default(now())
  updated       DateTime @updatedAt
  productId     String   @db.ObjectId
}

model Category {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  slug        String   @unique
  image       String
  description String
  isActive    String
  products    Product  @relation(fields: [productId], references: [id])
  created     DateTime @default(now())
  updated     DateTime @updatedAt
  productId   String   @db.ObjectId
}

model Contact {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  name    String
  email   String
  message String
  created DateTime @default(now())
  updated DateTime @updatedAt
}

model Merchant {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  email       String
  phoneNumber String
  brandName   String
  business    String
  isActive    Boolean
  status      Status
  created     DateTime @default(now())
  updated     DateTime @updatedAt
  Brand       Brand[]
  User        User[]
}

model Order {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId
  cart    Cart     @relation(fields: [cartId], references: [id])
  user    User     @relation(fields: [userId], references: [id])
  total   Int      @default(0)
  created DateTime @default(now())
  updated DateTime @updatedAt
  cartId  String   @db.ObjectId
  userId  String   @db.ObjectId
}

model Product {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  sku         String?
  name        String?
  slug        String?    @unique()
  imageUrl    String?    @default("https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=800")
  imageKey    String?
  description String?
  quantity    Int
  price       Int
  taxable     Boolean    @default(false)
  isActive    Boolean    @default(false)
  created     DateTime   @default(now())
  updated     DateTime   @updatedAt
  brand       Brand      @relation(fields: [brandId], references: [id])
  CartItem    CartItem[]
  Cart        Cart[]
  Category    Category[]
  brandId     String     @db.ObjectId
  Review      Review[]
  Wishlist    Wishlist[]
}

model Review {
  id           String          @id @default(auto()) @map("_id") @db.ObjectId
  product      Product         @relation(fields: [productId], references: [id])
  user         User            @relation(fields: [userId], references: [id])
  title        String
  rating       String
  review       String
  isRecomended Boolean         @default(false)
  status       MERCHANT_STATUS
  created      DateTime        @default(now())
  updated      DateTime        @updatedAt
  productId    String          @db.ObjectId
  userId       String          @db.ObjectId
}

model User {
  id                   String     @id @default(auto()) @map("_id") @db.ObjectId
  email                String
  phoneNumber          String
  firstName            String
  lastName             String
  password             String
  merchant             Merchant   @relation(fields: [merchantId], references: [id])
  provider             String     @default("Email")
  googleId             String
  facebookId           String
  avatar               String     @default("https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")
  role                 Role
  resetPasswordToken   String
  resetPasswordExpires String
  created              DateTime   @default(now())
  updated              DateTime   @updatedAt
  Address              Address[]
  Cart                 Cart[]
  Order                Order[]
  Review               Review[]
  merchantId           String     @db.ObjectId
  Wishlist             Wishlist[]
}

model Wishlist {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  product   Product  @relation(fields: [productId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  isLiked   Boolean  @default(false)
  created   DateTime @default(now())
  updated   DateTime @updatedAt
  productId String   @db.ObjectId
  userId    String   @db.ObjectId
}
