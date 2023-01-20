import { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import React from 'react';
import axios from "axios";

const TodoForm = ({ todos, setTodos }) => {
    const [name, setName] = useState("")
    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!name) {
            alert("Invalid value for todo");
            return;
        }

        axios.post("/api/todos/", {
            name: name
        }).then((res) => {
            setName("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]).catch(() => {
                alert("Something went wrong");
            })
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-4">
                <FormControl placeholder="New Todo" onChange={handleChange} value={name} />
                    <Button type="submit">
                        Add
                    </Button>
            </InputGroup>
        </Form>
    );
};

export default TodoForm;