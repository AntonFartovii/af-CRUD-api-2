// // @ts-ignore
// import http from 'http'
// // @ts-ignore
// import EventEmitter from 'events'
// // @ts-ignore
// import { getId, res404 } from './src/utils/utils'
// const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./src/controllers/userController')

export function server() {

}
//
// export class Application {
//     emitter:any;
//     server:any;
//     constructor() {
//         this.emitter = new EventEmitter();
//         this.server = this._createServer();
//
//     }
//
//     _createServer():any {
//         return http.createServer( (req:any, res:any) => {
//
//                 // const isId: boolean = req.url.match(/\/api\/users\/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi) ? true : false
//
//                 const url: string[] = req?.url?.split('/');
//                 const endPoint:boolean = (url[1] === 'api' && url[2] === 'users') ? true : false;
//                 const id:string = url[3];
//                 const isId:boolean = ( id && id != '' ) ? true : false;
//
//                 if (!endPoint) {
//                     res404(req, res);
//
//                 } else if ( req.method === 'GET' && isId ) {
//                     getUser(req, res, id)
//
//                 } else if ( req.method === 'PUT' && isId ) {
//                     updateUser(req, res, id)
//
//                 } else if ( req.method === 'DELETE' && isId ) {
//                     deleteUser(req, res, id)
//
//                 } else if ( req.method === 'GET' && !isId ) {
//                     getUsers(req, res)
//
//                 } else if ( req.method === 'POST' && !isId ) {
//                     createUser(req, res)
//
//                 } else {
//                     res404(req, res)
//
//                 }
//             }
//         )
//     }
//
//     _getRootMask(path:string, method:string) {
//         return `[${path}]:[${method}]`
//     }
// }