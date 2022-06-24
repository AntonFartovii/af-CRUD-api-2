import * as http  from 'http'
const cluster = require('cluster')
import * as os from 'os'
import { res400, res404 } from './src/utils/utils'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './src/controllers/userController'
import 'dotenv/config'


const PORT =  process.env.PORT || 4000

const server = http.createServer( (req:any, res:any) => {

        // const isId: boolean = req.url.match(/\/api\/users\/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi) ? true : false

        const url: string[] = req?.url?.split('/');
        const endPoint:boolean = (url[1] === 'api' && url[2] === 'users') ? true : false;
        const id:string = url[3];
        const isId:boolean = ( id && id != '' ) ? true : false;

        if (!endPoint) {
            res404(req, res);

        } else if ( req.method === 'GET' && isId ) {
            getUser(req, res, id)

        } else if ( req.method === 'PUT' && isId ) {
            updateUser(req, res, id)

        } else if ( req.method === 'DELETE' && isId ) {
            deleteUser(req, res, id)

        } else if ( req.method === 'GET' && !isId ) {
            getUsers(req, res)

        } else if ( req.method === 'POST' && !isId ) {
            createUser(req, res)

        } else {
            res404(req, res)

        }
    }
)

module.exports = server;

if (cluster.isPrimary) {
    let cpus = os.cpus().length
    console.log(`Master ${process.pid} is running.`);

    for (let i = 0; i < cpus; i++) {
        cluster?.fork() // создаёт новый экземпляер приложения
    }
    cluster.on('exit', (worker:any, code:any, signal:any) => {
        console.log(`A worker with ID ${worker.process.pid} died.`);
        server.listen(PORT, () => {
            console.log (`Run on PORT ${PORT}....`)
        })
    })

} else {

    console.log(`Worker: ${cluster.worker.id}, pid: ${process.pid}, port ${PORT}`);
    server.listen(PORT, () => {
        console.log (`Run on PORT ${PORT}....`)
    })

}