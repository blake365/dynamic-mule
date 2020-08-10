const Project = require('../models/project');

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
        let project = await Project.create(req.body);
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
        let project = await Project.findByIdAndUpdate(req.params.id, req.body.project);
        res.redirect(`/projects/${project.id}`);
    },
    // destroy projects
    async projectDestroy(req, res, next) {
        let project = await Project.findByIdAndRemove(req.params.id);
        res.redirect('/projects');
    }
}