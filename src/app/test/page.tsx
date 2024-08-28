import { sessionData } from "@/lib/session";
import { use } from "react";
import {testts} from './test'
import { book } from "@/lib/data";


const test = async ()=>{
    const data = await testts ('hikikomori mari')
    const session = await sessionData();
    console.log(data)
    const userId = session?.id
    const userName = session?.user?.name
    console.log(userName)
    console.log(userId)
    return (<div className="text-xl -mt-52">HI {data.book}} {userId}</div>)
}

export default test