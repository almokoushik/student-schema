const express=require("express")
const bodyParser = require('body-parser')
const app=express()
app.use(express())
app.use(express.json())
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://almo3:almoalmoalmo@cluster0.kar2i.mongodb.net/student-schema', {useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{

    const studentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        contacts: {
            type: String,
            required: true

        },
        subjects: {
            type: Array,
            required: true
        },
        class: {
            type: String,
            required: true

        },
        year: {
            type: Number,
            required: true

        },
        society: {
            type: Array,
            default: []
        }
    });

    const StudentModel = mongoose.model("student-schema", studentSchema)


    
   
 
    app.get("/", (req, res) => {     
       const getData= async()=>{
           try {             
               res.send(await StudentModel.find({}))
              
               }
           catch (err) {
               console.log(err)
           }
       }
       getData()
    })

    app.post("/addUser", (req, res) => {
        // insertData()
        const insertData = async (data) => {
            try {         
                    const newData = new StudentModel({
                        name: data.name,
                        contacts: data.contacts,
                        subjects: data.subjects,
                        class: data.class,
                        year: data.year
                    })
                    if(data.society){
                        newData.society=data.society
                    }
                          
                return (await newData.save())
                // return res.toArray()
            }
            catch (err) {
                console.log(err)
            }
        }
        const data = req.body
        res.send(insertData(data))
    })

    app.put("/update/:id", (req, res) => {
        const id = req.params.id
        const data=req.body
        console.log(id)
        console.log(data)
        const updateData = async (_id, data) => {
            try {
                const newData = new StudentModel({
                    name: data.name,
                    contacts: data.contacts,
                    subjects: data.subjects,
                    class: data.class,
                    year: data.year
                })
                if(data.society){
                    newData.society=data.society
                }
                const res = await StudentModel.findOneAndUpdate({ _id },{
                    $set:{
                        society :data.society                     
                    }
                }
                ,{
                    new:true,
                    useFindAndModify:false
                })
                return (res)
               
            }
            catch (err) {
                console.log(err)
            }
        }

        res.send(updateData(id,data))
    })
})
.catch(err=>console.log(err))

app.listen(3000,()=>console.log("Listening to port 3000"))