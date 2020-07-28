var mongoose = require("mongoose");
var Project = require("./models/project");


var data = [{
    type: "Web",
    title: "Seed 1",
    image: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}, {
    type: "Web",
    title: "Seed 2",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}, {
    type: "Web",
    title: "Seed 3",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}, {
    type: "Python",
    title: "Seed 4",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}, {
    type: "Python",
    title: "Seed 5",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}, {
    type: "Art",
    title: "Seed 6",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image1: "https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image2: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image3: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    image4: "https://images.unsplash.com/photo-1448227922836-6d05b3f8b663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    description: "Lorem ipsum dolor sit amet",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean laoreet lacus sed malesuada pretium. Donec molestie efficitur elit, ut dignissim sapien semper a. In hac habitasse platea dictumst. Etiam massa turpis, tempus id mauris ut, porta ornare augue. Etiam finibus turpis nec lectus egestas malesuada. Donec eget sollicitudin enim. Ut porttitor, arcu vel blandit eleifend, sapien ipsum malesuada nulla, sed lobortis augue est nec neque. Integer egestas vestibulum ornare. In erat quam, bibendum sed maximus et, consectetur id ante. Duis nunc dui, elementum eu tellus in, placerat mollis nisl. Vivamus sagittis, ante sit amet varius cursus, odio justo finibus tellus, quis facilisis libero orci ac massa.",
    clientName: "Roger",
    clientContactPhone: "String",
    clientContactEmail: "String",
    clientWebsite: "www.lipsum.com",
    primaryMaterial: "Wood",
    secondaryMaterial: "Metal",
    projAddressStreet: "903 Peachtree St",
    projAddressCity: "Atlanta",
    projAddressState: "GA",
    projAddressZip: "",
    dateStarted: "3/4/20",
    dateCompleted: "2/4/21",
    customerReview: "Aenean laoreet lacus sed malesuada pretium. Donec mole",
    collaborators: "Romeo",
    price: 23,
    cost: 45
}];

function seedDB() {
    //Remove all campgrounds
    Project.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed projects!");
        //add a few campgrounds
        data.forEach(function(seed) {
            Project.create(seed, function(err, project) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a project");
                }
            });
        });
    });
}

module.exports = seedDB;