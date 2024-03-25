import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap'
import Characters from "./Characters";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom';

function Add() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [clqss, setClass] = useState("");
    const [spells, setSpells] = useState("");
  
    let history = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const ids = uuid();
      let uniqueId = ids.slice(0, 8);

      let d = spells.split(",").map(spell => spell.trim())
  
      let a = name,
        b = age, c = clqss;
  
      Characters.push({ id: uniqueId, name: a, age: b, class: c, spells:d });
      history("/");
    };
  
    return (
      <div>
        <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Control
              type="text"
              placeholder="Enter Age"
              required
              onChange={(e) => setAge(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClass">
            <Form.Control
              type="text"
              placeholder="Enter Class"
              required
              onChange={(e) => setClass(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSpells">
            <Form.Control
              type="text"
              placeholder="Enter Spells"
              required
              onChange={(e) => setSpells(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button onClick={(e) => handleSubmit(e)} type="submit" style={{background:"green", border:"green"}}>
            Add
          </Button>
        </Form>
      </div>
    );
  }
  
  export default Add;