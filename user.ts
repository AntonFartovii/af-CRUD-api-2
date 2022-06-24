// @ts-ignore
const { v4: uuidv4 } = require('uuid');
// import { uuidv4 } from 'uuid'
// @ts-ignore
const path = require('path')
// @ts-ignore
import { createWriteStream, createReadStream } from "fs";

class User {
    name:     string;
    age:      number;
    id:       number;
    hobbies:  string[];
    filePath: string;

    constructor(name: string, age: number, id = null, hobbies = []) {
        this.name     = name;
        this.age      = age;
        this.id       = uuidv4();
        this.hobbies  = hobbies;
        this.filePath = path.join ( __dirname, 'data', 'users.json' )
    }

    async save () {
        let users: any = await User.getAll( )
        users.push( this.toJSON())

        createWriteStream( this.filePath ).write( JSON.stringify( users ) )
    }


    static getAll() {
        let body: any = '';

        return new Promise((resolve, reject) => {

            createReadStream( path.join ( __dirname, 'data',  ) )
                .on('error', (err) => {
                    reject(err)
                })
                .on('data', (chunk: any) => {
                    body += chunk.toString()
                })
                .on('end', () => {
                    resolve( JSON.parse(body) )
                })
        })

    }

    static async getById(id:string) {

            const  users:any = await User.getAll()

            const user = users.find((u:any) => u.id === id )
                    if (user) {
                        return user
                    } else {
                        throw new Error('400')
                    }

    }

    getId(): number | null {
        return this.id;
    }

    toJSON() {
        return {
            name: this.name,
            age: this.age,
            id: this.id
        }
    }

}

export {
    User
}

