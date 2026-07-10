import express from 'express';
import cors from 'cors';
import {loadenv} from "./env"
import {StructuredOutput} from "./ask-core"

loadenv();
const PORT = process.env.PORT
const app = express();
app.use(
    cors({
        origin:[' http://localhost:3000'],
        methods:['POST,GET,OPTIONS,DELETE'],
        allowedHeaders:['Content-Type','Authorization'],
        credentials:false
    })
)
app.use(express.json());

app.post('/ask',async(req,res)=>{
    try {
        const {query} = req.body ?? {};
        if(!query || !String(query).trim()){
            return res.status(400).json({
                error:"query is required"
            });
        }
        const out = await StructuredOutput(query);
        return res.status(200).json({
            output:out
        })
    } catch (error:any) {
        return res.status(500).json({
            Error:"Not responding"
        })
    }
})
app.listen(PORT,()=>{
    console.log(`server is listening at "http://localhost:${PORT}"`)
})