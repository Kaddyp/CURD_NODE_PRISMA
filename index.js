const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async(req, res)=>{
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

app.post("/", async(req, res)=>{
    const newUser = await prisma.user.create({
        data: req.body
    });
    res.json(newUser);
});

app.post("/house", async(req, res)=>{
    const newHouse = await prisma.house.create({
        data: req.body
    });
    res.json(newHouse);
});


app.get("/house", async(req, res)=>{  
    const allHouses = await prisma.house.findMany({
        include: {
            owner: true,
        },
    });
    res.json(allHouses);
});

const server = app.listen(7500, ()=>{
    console.log('Server is running on port 7500');
})