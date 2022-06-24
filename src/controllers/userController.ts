import { getPostData } from "../utils/utils";
const User = require('../users/user')
import {uuidValidateV4, bodyValidate, isJsonString} from '../utils/validate'

async function getUsers(req: any, res: any) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-type':'application/json' })
        res.end( JSON.stringify( users ) )
    } catch (err) {
        console.log(err)
    }
}

async function getUser(req: any, res: any, id: string) {
    try {
        const valid:boolean = uuidValidateV4(id)

        if (!valid) {
            res.writeHead(400, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '400 - ID is not valid '}) )

        }

        const user:any = await User.findById(id)

        if (!user) {
            res.writeHead(404, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '404 - user not found '}) )

        } else {

            res.writeHead(200, { 'Content-type':'application/json' })
            res.end( JSON.stringify( user ) )
        }


    } catch (err) {
        console.log(err)
    }
}

async function createUser(req:any, res:any) {

    try {

        const body:any = await getPostData (req)
        const { name, age, hobbies } = JSON.parse( body )

        if (!name || !age || !hobbies)  {
            res.writeHead(400, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '400 - body does not contain required fields'}) )
            return
        }

        const user = { name, age, hobbies }
        const newUser:any = await User.create( user )

        res.writeHead(201, { 'Content-type':'application/json' })
        return res.end( JSON.stringify( newUser ))

    } catch (err) {
        console.log(err)
    }
}

async function updateUser(req:any, res:any, id: string) {
    try {
        const valid:boolean = uuidValidateV4(id)

        if (!valid) {
            res.writeHead(400, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '400 - ID is not valid '}) )
        }

        const user:any = await User.findById(id)

        if (!user) {
            res.writeHead(404, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '404 - user not found '}) )
        } else {

            const body:any = await getPostData (req)
            const { name, age, hobbies } = JSON.parse( body )
            const newParams: any = {
                                    name: name || user.name,
                                    age: age || user.age,
                                    hobbies: hobbies || user.hobbies
            }
            const updateUser:any = User.update( newParams, id )

            res.writeHead(201, { 'Content-type':'application/json' })
            res.end( JSON.stringify( await User.findById(id) ))

        }
    } catch (err) {
        console.log(err)
    }
}

async function deleteUser(req:any, res:any, id: string) {

    const valid:boolean = uuidValidateV4( id )

    if (!valid) {
        res.writeHead(400, { 'Content-type':'application/json' })
        res.end( JSON.stringify({message: '400 - ID is not valid '}) )

    }

    const user = await User.findById( id )
    try {
        if ( !user ) {
            res.writeHead(404, { 'Content-type':'application/json' })
            res.end( JSON.stringify({message: '404 - user not found '}) )

        } else {
            await User.remove( id )
            res.writeHead(204, { 'Content-type':'application/json' })
            res.end( JSON.stringify( {message: `product ${id} has been deleted`}))

        }
    } catch (err) {
        console.log(err)
    }
}

export { getUsers, getUser, createUser, updateUser, deleteUser }