const Project = require('../models/project');
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dggpi9vlg',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {

    // projectss index
    async projectIndex(req, res, next) {
        let projects = await Project.find({});
        res.render('home', { projects })
    },

    // submit new projects
    projectNew(req, res, next) {
        res.render('projects/new');
    },

    async projectDashboard(req, res, next) {
        let projects = await Project.find({});
        res.render("projects/dashboard", { projects })
    },

    // create new projects
    async projectCreate(req, res, next) {
        req.body.project.images = []
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.project.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
        let project = await Project.create(req.body.project);
        res.redirect(`/projects/${project.id}`);
    },
    // show projects
    async projectShow(req, res, next) {
        let project = await Project.findById(req.params.id);
        res.render('projects/show', { project });
    },
    // edit projects
    async projectEdit(req, res, next) {
        let project = await Project.findById(req.params.id);
        res.render('projects/edit', { project });
    },
    // update projects 
    async projectUpdate(req, res, next) {
        let project = await Project.findById(req.params.id);
        // check if there are images to delete
        if (req.body.deleteImages && req.body.deleteImages.length) {
            // find images with delete checked in the form
            // assign deleteImages from req.body to a variable
            let deleteImages = req.body.deleteImages;
            // loop through the deleteImages array
            for (const public_id of deleteImages) {
                // delete images from coudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // remove images from project.images in database
                for (const image of project.images) {
                    if (image.public_id === public_id) {
                        let index = project.images.indexOf(image);
                        project.images.splice(index, 1);
                    }
                }
            }
        }
        // upload any new images
        if (req.files) {
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                project.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        project.title = req.body.project.title;
        project.type = req.body.project.type;
        project.description = req.body.project.description;
        project.details = req.body.project.details;
        project.clientCompany = req.body.project.clientCompany;
        project.clientName = req.body.project.clientName;
        project.clientContactPhone = req.body.project.clientContactPhone;
        project.clientContactEmail = req.body.project.clientContactEmail;
        project.clientWebsite = req.body.project.clientWebsite;
        project.projLocation = req.body.project.projLocation;
        project.projLat = req.body.project.ProjLat;
        project.projLon = req.body.project.ProjLon;
        project.dateStarted = req.body.project.dateStarted;
        project.dateCompleted = req.body.project.dateCompleted;
        project.customerReview = req.body.project.customerReview;
        project.collaborators = req.body.project.collaborators;
        project.collaboratorWebsite = req.body.project.collaboratorWebsite;
        project.revenue = req.body.project.revenue;
        project.expenses = req.body.project.expenses;

        // save updated project
        project.save()
        res.redirect(`/projects/${project.id}`);
    },
    // destroy projects
    async projectDestroy(req, res, next) {
        let project = await Project.findById(req.params.id);
        for (const image of project.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await project.remove();
        res.redirect('/projects');
    }
}