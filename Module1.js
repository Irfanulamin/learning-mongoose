// Example dataset insertion
db.products.insertMany([
  {
    name: "Laptop",
    price: 800,
    category: "Electronics",
    stock: 50,
    tags: ["technology", "office"],
  },
  {
    name: "Smartphone",
    price: 600,
    category: "Electronics",
    stock: 100,
    tags: ["technology", "portable"],
  },
  {
    name: "T-shirt",
    price: 20,
    category: "Clothing",
    stock: 200,
    tags: ["fashion", "casual"],
  },
  {
    name: "Headphones",
    price: 150,
    category: "Electronics",
    stock: 80,
    tags: ["technology", "audio"],
  },
  {
    name: "Jeans",
    price: 50,
    category: "Clothing",
    stock: 120,
    tags: ["fashion", "denim"],
  },
]);

// Find all products
db.products.find();

// Find one product
db.products.findOne({ name: "Laptop" });

// Filtering with conditions
db.products.find({ price: { $gte: 100, $lte: 600 } }); // Price between $100 and $600

// Filtering using $in and $nin
db.products.find({ category: { $in: ["Electronics", "Clothing"] } }); // Include categories
db.products.find({ category: { $nin: ["Accessories"] } }); // Exclude categories

// Using implicit AND vs explicit AND
db.products.find({ price: { $gt: 100 }, stock: { $lte: 100 } }); // Implicit AND
db.products.find({ $and: [{ price: { $gt: 100 } }, { stock: { $lte: 100 } }] }); // Explicit AND

// Using OR
db.products.find({ $or: [{ price: { $lt: 50 } }, { stock: { $gt: 150 } }] });

// Projection (return specific fields)
db.products.find({}, { name: 1, price: 1 }); // Include only name and price

// Field existence
db.products.find({ discount: { $exists: true } }); // Documents where "discount" field exists

// Field type
db.products.find({ price: { $type: "double" } }); // Documents where price is a double

// Array queries
db.products.find({ tags: { $all: ["technology", "portable"] } }); // Documents with all specified tags
db.products.find({ tags: { $elemMatch: { $eq: "audio" } } }); // At least one matching tag
db.products.find({ tags: { $size: 2 } }); // Tags array must have exactly 2 elements

// Update with set, push, addToSet
db.products.updateOne({ name: "Laptop" }, { $set: { discount: 10 } }); // Add/Update "discount" field
db.products.updateOne({ name: "Laptop" }, { $push: { tags: "gaming" } }); // Add a tag to "tags" array
db.products.updateOne({ name: "Laptop" }, { $addToSet: { tags: "office" } }); // Add a unique tag to "tags"

// Update with unset, pop, pull
db.products.updateOne({ name: "Laptop" }, { $unset: { discount: "" } }); // Remove "discount" field
db.products.updateOne({ name: "Laptop" }, { $pop: { tags: -1 } }); // Remove the first element in "tags"
db.products.updateOne({ name: "Laptop" }, { $pull: { tags: "gaming" } }); // Remove "gaming" from "tags"
