const db = connect("mongodb://localhost:27017/bug-tracker_db");

db.bugs.drop();

db.bugs.insertMany([
    { 
        title: 'Code isnt working', 
        description: "As title says, this code doesnt work!", 
        status: "Urgent", 
        user: "Jakirul" 
    }
]);