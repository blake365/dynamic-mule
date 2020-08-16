const Project = require('../models/project');
const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

module.exports = {

    // projectss index
    async projectIndex(req, res, next) {
        let projects = await Project.find({});
        let users = await User.find({});
        res.render('home', { projects, users })
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
        req.body.project.images = [];
        for (const file of req.files) {
            req.body.project.images.push({
                url: file.secure_url,
                public_id: file.public_id
            });
        };
        let project = await Project.create(req.body.project);
        req.flash('success', 'Project Created');
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
        };
        // upload any new images
        if (req.files) {
            for (const file of req.files) {
                project.images.push({
                    url: file.secure_url,
                    public_id: file.public_id
                });
            }
        };
        project.title = req.body.project.title;
        project.type = req.body.project.type;
        project.description = req.body.project.description;
        project.details = req.body.project.details;
        project.clientCompany = req.body.project.clientCompany;
        project.clientName = req.body.project.clientName;
        project.clientContactPhone = req.body.project.clientContactPhone;
        project.clientContactEmail = req.body.project.clientContactEmail;
        project.clientWebsite = req.body.project.clientWebsite;
        project.projAddressStreet = req.body.project.projAddressStreet;
        project.projAddressCity = req.body.project.projAddressCity;
        project.projAddressState = req.body.project.projAddressState;
        project.projAddressZip = req.body.project.projAddressZip;
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
        req.flash('success', 'Project deleted!');
        res.redirect('/projects');
    }
}