'use strict'

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {
    async index({ auth }){
        const user = await auth.getUser();
        return await user.projects().fetch();
    }

    async create({auth , request }){
        const user = await auth.getUser();
        const { title } = request.all();
        const project = new Project();
        project.fill({
            title,
        });

        await user.projects().save(project);

        return project;
    }

    async delete({request, auth, params}){
        const user = auth.getUser();
        const { id } = params.id;
        const project = await Project.find(id);
        if(project.user_id !== user.id){
            return response.status(403);
        }
        await project.delete();
        return project;
    }

    async update({ auth, request, params}){
        const user = auth.getUser();
        const { id } = params.id;
        const project = await Project.find(id);
        AuthorizationService.verityPermission(project, user);
        project.merge(request.only('title'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController
