const db = connect("mongodb://localhost:27017/bug-tracker_db");

db.bugs.drop();
db.users.drop();

db.bugs.insertMany([
    {
        title: 'My VSCode isn\'t working with Python',
        description: "Hello, my VSCode seems to not let me open any python files. Can anyone offer assistance?",
        status: "Low Priority",
        user: "test"
    },
    {
        title: 'Cannot center a div',
        description: "Please help! I cannot center a div, this is very important",
        status: "Resolved",
        user: "test",
        comment: [
            {
                user: 'test',
                comment: 'nevermind i fixed the issue :)',
                timestamp: 1645459343020
            }
        ]
    }
]);

db.users.insertMany([
    {
        "username": "test",
        "password_digest": "$2a$10$ZMs1zzDZS81MVJiqBFxTyOwA.BjQqTx2PfRiNMYpmNP1vCFAU9lpC"
    }
]);