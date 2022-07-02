const db = require('./db')
const Query = {
    greeting: () => {
        return "hello from  TutorialsPoint !!!"
    },

    students: () => db.students.list(),

    //resolver function for studentbyId
    studentById: (root, args, context, info) => {
        //args will contain parameter passed in query
        return db.students.get(args.id);
    },

    sayHello: (root, args, context, info) => `Hi ${args.name} GraphQL server says Hello to you!!`,

    setFavouriteColor: (root, args) => {
        return "Your Fav Color is :" + args.color;
    }
}

const Student = {
    // fullName: (root, args, context, info) => {
    //     return root.firstName + ":" + root.lastName
    // },
    college: (root) => {
        return db.colleges.get(root.collegeId);
    }
}

const Mutation = {
    createStudent: (root, args, context, info) => {
        return db.students.create({
            collegeId: args.collegeId,
            firstName: args.firstName,
            lastName: args.lastName
        })
    },

    // new resolver function
    addStudent_returns_object: (root, args, context, info) => {
        const id = db.students.create({
            collegeId: args.collegeId,
            firstName: args.firstName,
            lastName: args.lastName
        })

        return db.students.get(id)
    }
}

module.exports = { Query, Student, Mutation }