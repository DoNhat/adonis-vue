'use strict'
const Database = use('Database');
const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {
    async index({ auth, params }){
        const user = await auth.getUser();
        // var nd = await Database.select('*').from('projects');
        // var page = params.id * 2;
        // console.log(nd.slice(page, page+2));
        //var data =  await user.projects().offset(params.id).limit(2).fetch();
        var data =  user.projects().fetch();
        return data;
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
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        if(project.user_id !== user.id){
            return response.status(403);
        }
        await project.delete();
        return project;
    }

    async update({ request, auth, params}){
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project, user);
        project.merge(request.only('title'));
        await project.save();
        return project;
    }
}

module.exports = ProjectController
