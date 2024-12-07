# learning-mongoose

This document provides examples of various MongoDB queries for common operations. Use these examples as a quick reference guide for interacting with your MongoDB collection

Here’s a README template with the MongoDB aggregation tasks and their solutions:

````markdown
# MongoDB Aggregation Practice

This repository contains practice tasks for MongoDB aggregation. Below are the tasks along with the aggregation pipeline solutions.

---

## Task 1: Retrieve the count of individuals who are active (`isActive: true`) for each gender.

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  { $match: { isActive: true } },
  { $group: { _id: "$gender", count: { $sum: 1 } } },
]);
```
````

### Explanation:

This pipeline filters individuals with `isActive: true` and then groups them by gender. The count of individuals in each gender group is calculated.

---

## Task 2: Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana."

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  { $match: { isActive: true, favoriteFruit: "banana" } },
  { $project: { name: 1, email: 1 } },
]);
```

### Explanation:

This pipeline filters individuals who are active and have "banana" as their favorite fruit. It then projects only the `name` and `email` fields.

---

## Task 3: Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  { $group: { _id: "$favoriteFruit", avgAge: { $avg: "$age" } } },
  { $sort: { avgAge: -1 } },
]);
```

### Explanation:

This pipeline groups individuals by `favoriteFruit` and calculates the average age for each group. The result is sorted by `avgAge` in descending order.

---

## Task 4: Retrieve a list of unique friend names for individuals who have at least one friend, and include only the friends with names starting with the letter "W."

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  { $match: { "friends.0": { $exists: true } } },
  {
    $project: {
      friendNames: {
        $filter: {
          input: "$friends.name",
          as: "friend",
          cond: { $regexMatch: { input: "$$friend", regex: "^W" } },
        },
      },
    },
  },
  { $unwind: "$friendNames" },
  { $group: { _id: null, uniqueFriendNames: { $addToSet: "$friendNames" } } },
]);
```

### Explanation:

This pipeline filters individuals who have at least one friend and uses a regular expression (`^W`) to match friends with names starting with "W". It then groups the results to get a unique list of these friend names.

---

## Task 5: Use `$facet` to separate individuals into two facets based on their age: those below 30 and those above 30. Then, within each facet, bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) and sort them by name within each bucket.

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  {
    $facet: {
      below30: [
        { $match: { age: { $lt: 30 } } },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [20, 25, 30],
            default: "Other",
            output: { names: { $push: "$name" } },
          },
        },
        { $unwind: "$names" },
        { $sort: { names: 1 } },
      ],
      above30: [
        { $match: { age: { $gte: 30 } } },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [30, 35, 40, 45],
            default: "Other",
            output: { names: { $push: "$name" } },
          },
        },
        { $unwind: "$names" },
        { $sort: { names: 1 } },
      ],
    },
  },
]);
```

### Explanation:

This pipeline uses `$facet` to split individuals into two groups based on their age. Within each group, individuals are bucketed into specific age ranges, and their names are sorted alphabetically.

---

## Task 6: Calculate the total balance of individuals for each company and display the company name along with the total balance. Limit the result to show only the top two companies with the highest total balance.

### Aggregation Pipeline:

```javascript
db.individuals.aggregate([
  { $group: { _id: "$company", totalBalance: { $sum: "$balance" } } },
  { $sort: { totalBalance: -1 } },
  { $limit: 2 },
]);
```

### Explanation:

This pipeline groups individuals by their `company` and calculates the total balance for each company. The result is sorted by `totalBalance` in descending order, and the top two companies are returned.

---

## Conclusion

These aggregation tasks demonstrate various MongoDB operations such as filtering, grouping, sorting, and using special operators like `$facet`, `$bucket`, and `$regexMatch`. By practicing these tasks, you will get a better understanding of how to work with MongoDB aggregation pipelines in real-world scenarios.

```

This README will help anyone understand the tasks and their respective solutions.
```
