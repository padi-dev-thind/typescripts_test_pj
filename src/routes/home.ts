import HomeController from '../Controller/homeController'
import {Router} from 'express'

//show home page
const homeController = new HomeController()
Router.get('/', homeController.show)

export default Router
