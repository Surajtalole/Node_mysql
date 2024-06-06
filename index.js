const express = require("express");
const mysql = require("mysql");

//create connection
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodemysql",
})

//connect to the mysql
db.connect(err=>{
    if(err){
        throw err
    }
    console.log("My sql connected")
})

const app=express()

//create database

app.get("/createdb",(req,res)=>{
    let sql ="CREATE DATABASE nodemysql";
    db.query(sql,(err)=>{
        if(err){
            throw err;
        }
        res.send("Database Created");
    });
});

//create table
app.get("/createeployee",(req,res)=>{
    let sql ="CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql,err =>{
        if(err){
            throw err
        }
        res.send("Employes table created")
    });
});

//Insert Table
app.get("/employee1",(req,res)=>{
    let post ={name:'Suraj Talole',designation:"Final Year Student"}
    let sql= "INSERT INTO employee SET ?"
    db.query(sql,post,err=>{
        if(err){
            throw err
        }
        res.send("Employes Added");
    });
});

//Select Employee
app.get("/getemployee",(req,res)=>{
    let sql ="SELECT * FROM employee"
    let query= db.query(sql,(err,results)=>{
        if(err){
            throw err
        }
        console.log(results);
        res.send("Employee details are Fetched");
    })
})

//Update name
app.get("/updateemployee/:id",(req,res)=>{
    let newName = "Updated name";
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Employee Updated');
    })
})


//delete employee
app.get("/deleteemployee/:id",(req,res)=>{
    let sql =`DELETE FROM  employee  WHERE id =${req.params.id} `
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Employee Deleted')
    })
})

app.listen("3000",()=>{
    console.log("Server started on port 3000");
});