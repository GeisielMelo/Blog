// Import the mongoose module, define the schema and models.
const e = require('express');
const mongoose = require('mongoose');
const  mySchema = { title: String, post: String };
const Post = mongoose.model('Post', mySchema);
const url = 'mongodb://127.0.0.1:27017/blogDB';
const mongooseArgs = { useNewUrlParser: true, useUnifiedTopology: true };

// Exports function to be used in other files.
exports.addManyItems = addManyItems;
exports.getAllItems = getAllItems;
exports.deleteItem = deleteItem;
exports.addItem = addItem;

// Opens connection with the database.
function connectDB(){
    return mongoose.connect(url, mongooseArgs);
}

// Closes the connection with the database.
function disconnectDB(){
    return mongoose.disconnect();
}

// Adds an array of objects to the database.
function addManyItems(arrayWithObjects) {
    return connectDB()
      .then(() => Post.insertMany(arrayWithObjects))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}

// Add an item to the database.
function addItem(oneObject) {
    return connectDB()
      .then(() => Post.create(oneObject))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}
  
// Delete an item from the database.
function deleteItem(id) {
    return connectDB()
        .then(() => Post.deleteOne({_id: id}))
        .catch((err) => console.log(err))
        .finally(() => disconnectDB());
}

// Update an item from the database.
function updateItem(id, newTitle, newPost) {
    return connectDB()
        .then(() => Post.updateOne({_id: id}, {title: newTitle, post: newPost}))
        .catch((err) => console.log(err))
        .finally(() => disconnectDB());
}

// Get all items from the database.
function getAllItems() {
    return connectDB()
      .then(() => Post.find())
      .then((items) => {
        const content = [];
        items.forEach((item) => {
          content.push({id: item._id, title: item.title, post: item.post});
        })
        return content;
      })
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}
