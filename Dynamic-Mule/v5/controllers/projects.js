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
        let project = await Project.findByIdAndUpdate(req.params.id, req.body.project, { new: true });
        res.redirect(`/projects/${project.id}`);
    },
    // destroy projects
    async projectDestroy(req, res, next) {
        await Project.findByIdAndRemove(req.params.id);
        res.redirect('/projects');
    }
}