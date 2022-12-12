
import UserManagementController from '../Controller/userManagementController'
import {Router} from 'express'

const userManagementController = new UserManagementController()

//add new user 
Router.get('/add-user', userManagementController.showAddUserPage)
//edit user page
Router.get('/edit-user/:id', userManagementController.showEditUserPage)
//update user 
Router.put('/update-user/:id', userManagementController.updateUser)
//create new user
Router.get('/restore-user/:id', userManagementController.restoreUser)
//create new user  
Router.post('/create-user', userManagementController.creatUser)
//delete a user 
Router.delete('/delete-user/:id', userManagementController.deleteUser)
//soft-deleted user list 
Router.get('/deleted-users', userManagementController.showDeletedUser)
//hard-delete a user 
Router.delete('/hard-delete-user/:id', userManagementController.hardDeleteUser)
//show management page
Router.get('/', userManagementController.manageUser)


module.exports = Router
