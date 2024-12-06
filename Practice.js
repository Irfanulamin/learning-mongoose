// Connect to the users collection
const usersCollection = db.users;

// 1. Find all documents where the age is greater than 30 and return only name and email fields.
const ageQueryResult = usersCollection.find(
  { age: { $gt: 30 } }, // Condition: age > 30
  { name: 1, email: 1, _id: 0 } // Projection: include name and email, exclude _id
);
console.log("Documents with age > 30:", ageQueryResult);

// 2. Find documents where the favorite color is either "Maroon" or "Blue".
const colorQueryResult = usersCollection.find(
  { favoriteColor: { $in: ["Maroon", "Blue"] } } // Condition: favoriteColor is Maroon or Blue
);
console.log("Documents with favoriteColor Maroon or Blue:", colorQueryResult);

// 3. Find all documents where the skills array is empty.
const emptySkillsQueryResult = usersCollection.find(
  { skills: { $size: 0 } } // Condition: skills array size is 0
);
console.log("Documents with empty skills array:", emptySkillsQueryResult);

// 4. Find documents where the person has skills in both "JavaScript" and "Java".
const skillsQueryResult = usersCollection.find(
  { skills: { $all: ["JavaScript", "Java"] } } // Condition: skills array contains both JavaScript and Java
);
console.log("Documents with skills in JavaScript and Java:", skillsQueryResult);

// 5. Add a new skill to the skills array for the document with a specific email.
usersCollection.updateOne(
  { email: "aminextleveldeveloper@gmail.com" }, // Target document by email
  { $push: { skills: { name: "Python", level: "Beginner", isLearning: true } } } // Add new skill to skills array
);
console.log(
  "Added Python skill for user with email aminextleveldeveloper@gmail.com"
);

// 6. Add a new language "Spanish" to the list of languages spoken by the person.
usersCollection.updateOne(
  { email: "aminextleveldeveloper@gmail.com" }, // Target document by email
  { $addToSet: { languages: "Spanish" } } // Add Spanish to languages array (only if not already present)
);
console.log(
  "Added Spanish language for user with email aminextleveldeveloper@gmail.com"
);

// 7. Remove the skill with the name "Kotlin" from the skills array.
usersCollection.updateOne(
  { email: "aminextleveldeveloper@gmail.com" }, // Target document by email
  { $pull: { skills: { name: "Kotlin" } } } // Remove skill where name is Kotlin
);
console.log(
  "Removed Kotlin skill for user with email aminextleveldeveloper@gmail.com"
);
