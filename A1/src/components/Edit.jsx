import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap'
import Characters from "./Characters";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';

function Edit(){
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [clqss, setClass] = useState("");
    const [spells, setSpells] = useState("");
    const [id, setId] = useState("");

    let history = useNavigate();

    var index = Characters.map(function(e){
        return e.id;
    }).indexOf(id);


    const handleSubmit = (e) => {
        e.preventDefault();

        let a = Characters[index];

        a.name = name; a.age = age; a.class = clqss;
        a.spells = spells.split(",").map(spell => spell.trim());

        history("/");
      };

      useEffect( () => {
        setName(localStorage.getItem('name'))
        setAge(localStorage.getItem('age'))
        setClass(localStorage.getItem('class'))
        setSpells(localStorage.getItem('spells'))
        setId(localStorage.getItem('id'))

      }, [])
    

    return (
        <div>
             <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter Name" value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Control
              type="text"
              placeholder="Enter Age" value={age}
              required
              onChange={(e) => setAge(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClass">
            <Form.Control
              type="text"
              placeholder="Enter Class" value={clqss}
              required
              onChange={(e) => setClass(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpells">
            <Form.Control
              type="text"
              placeholder="Enter Spells" value={spells}
              required
              onChange={(e) => setSpells(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button onClick={(e) => handleSubmit(e)} type="submit" style={{background:"orange", border:"orange"}}>
            Update
          </Button>
        </Form>
        </div>
    )


}

export default Edit;