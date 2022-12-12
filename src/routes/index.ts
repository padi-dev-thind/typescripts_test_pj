const homeRouter = require('./home')
const UserRouter = require('./userManagement')

function route(app){
    app.use('/user-management', UserRouter)
    app.use('/', homeRouter)
}

export default route
