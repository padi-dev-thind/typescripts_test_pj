const {Sequelize, DataTypes, where, Op} = require('sequelize');
const sequelize = require('../config/db').sequelize;
const User = require('../models/user')(sequelize, DataTypes)

class UserManagementController{
    //show index page
    //path /user-management
    async manageUser(req,res,next){
        const users = await User.findAll({ raw : true})
        res.render('userManagementPage',{users: users})
    }

    //show add new user page
    //path /user-management/add-user-page
    async showAddUserPage(req,res,next){
        res.render('addNewUserPage')
    }

    //show update user page
    //path /user-management/add-user-page
    async showEditUserPage(req,res,next){
        const user = await User.findByPk(req.params.id,{raw: true})
        if(user != null)
            res.render('editUserPage',{user: user})
    }

    //create new user
    //path /create-user
    async creatUser(req,res,next){
        const newUser = req.body
        console.log(req.body)
        const user = await User.create(
            req.body
          )
          .then((user)=>{
            res.redirect('back')
          })
          .catch((err)=>console.log(err))
    }

    //update user's infor
    //path /update-user/:id
    async updateUser(req,res,next){
        await User.update(
            req.body
          ,
          {where: {
            id: req.params.id,
          }
        })
        .then(async (user)=>{
            const userList = await User.findAll({raw:true})
            res.redirect('/user-management')
        })
    }

    //soft delete
    //path /delete-user/:slug
    async deleteUser(req,res,next){
        const id = req.params.id
        await User.destroy({
            where: {
            id: id
            }
            , force: false
        })
        .then((user)=>{
            res.redirect('/user-management')
        })
    }

    //hard delete
    //path /hard-delete-user/:slug
    async hardDeleteUser(req,res,next){
        const id = req.params.id
        await User.destroy({
            where: {
            id: id
            }
            , force: true
        }).then((user)=>{
            res.redirect('/user-management')
        })
    }

    //restore user 
    //path /restore-user/:slug
    async restoreUser(req,res,next){
        const id = req.params.id
        await User.restore({
            where: {
            id: id
            }
        }).then((user)=>{
            res.redirect('/user-management')
        })
    }

    //soft-deleted user list 
    //path /soft-deleted-user
    async showDeletedUser(req,res,next){
        const softDeletedUser = await User.findAll({
             where: {
                deletedAt:
                    {
                        [Op.not]: null}
                    }, 
             paranoid: false,
             raw:true
        })   
        res.render('softDeletedUserPage', {softDeletedUser: softDeletedUser})      
    }
}
export default UserManagementController
