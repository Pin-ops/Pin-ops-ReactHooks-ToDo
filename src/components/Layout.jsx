import React, {useState, Fragment} from 'react'
import { StyledDiv, Button, Form } from "./Layout.style";
import HyperModal from "react-hyper-modal";
import { OverlayTrigger } from "react-bootstrap";
import { popoverBox } from "./Popover";
import { v4 as uuidv4 } from 'uuid';

function Layout() {
    // manage the modal
    const [modalOpen, setModalOpen] = useState(false); // first it is invisible (false), when the button is clicked it will turn true and appear on browser as a modal

    // to get the events data
    const [todo, setTodo] = useState('');
    const [label, setLabel] = useState([]);
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    // to show all events on browser
    const [toDos, setToDos] = useState([]);

    const submitHandler = e => {
        e.preventDefault();  //when we get data from data, we have to write this.
        setToDos([
                ...toDos,{
                id: uuidv4(), // it's a func, so we have to write ()
                todo ,      //ES6 todo : todo
                label ,     //ES6 label: label
                date ,      //Es6 date: date
                comment ,   //ES6 comment: comment

                done : false
                // when the state is like this, it only takes the list item, so we have to copy the item array first. ...toDos
                }])
                // when we want to delete the previus values, we write:
                setTodo('')
                setLabel([])
                setDate('')
                setComment('')
                // to close the modal automatically:
                setModalOpen(false)

                // when we want clear all the labels, we use forEach func for every input
                document.querySelectorAll('input[type=checkbox]').forEach( item => item.checked = false)

    }
    const labelHandler = e => {
        // for checkoxes we use e.target.checked
        if (e.target.checked) {
            if (!label.includes(e.target.value)) {
                setLabel([ ...label, e.target.value ])
            }
        }else{
            if (label.includes(e.target.value)) {
                setLabel(label.filter( item => item !== e.target.value))
            }
        }

    }

    const doneHandler = () =>{}

    const deleteHandler = () => {}






return (
    <Fragment>
        <StyledDiv>
            <div className="topic">
                ToDos List
            </div>
            <Button primary onClick= { () => setModalOpen(true) }>Add ToDo</Button>
            {
                toDos.map( item =>
                                    <div className= { item.done ? "todos done" : "todos"} key={item.id} >
                                        <div className="todos-top">
                                            <div className="label-box">{item.label}</div>
                                            <div className="buttons">
                                                <span onClick={() => doneHandler(item)}>&#x2705;</span>
                                                <span onClick={() => deleteHandler(item)}>&#x274C;</span>
                                            </div>
                                        </div>
                                        <div className="todos-bottom">
                                            <div className="todo-box">{item.todo}</div>
                                            <div className="date-comm">
                                                <div className={item.timeDiff > 1 ? "datebox bg-relax" : item.timeDiff > 0 ? "datebox bg-warn" : "datebox bg-past"} > &#x1F4C6;{item.date}</div>
                                                <OverlayTrigger trigger="hover" placement="top" overlay={popoverBox (item.comment)}>
                                                    <div className="comments">{item.comment ? <span>&#x1F4AC;</span> : null}</div>
                                                </OverlayTrigger>


                                            </div>
                                        </div>
                                    </div>
                )
            }
        </StyledDiv>

        <HyperModal isOpen={ modalOpen }
                    requestClose={ () => setModalOpen(false) }
        >
            <Form className="form-box" onSubmit={submitHandler}>
                <label htmlFor="todo">ToDo</label>
                <input type="text" id="todo" value= {todo} onChange={ e => setTodo(e.target.value)} />
                <label>Label</label>
                <fieldset>
                    <input type="checkbox" value='&#x1F46A;' onChange={ labelHandler } /> &#x1F46A; Family
                    <input type="checkbox" value='&#x1F3E0;' onChange={ labelHandler } /> &#x1F3E0; Home
                    <input type="checkbox" value="&#x1F477;" onChange={ labelHandler } /> &#x1F477; Business
                    <input type="checkbox" value="&#x1F6CD;" onChange={ labelHandler } /> &#x1F6CD; Shopping
                    <input type="checkbox" value="&#x1F393;"  onChange={ labelHandler }/> &#x1F393; School
                    <input type="checkbox" value="&#x1F6A8;" onChange={ labelHandler } /> &#x1F6A8; Emergency
                    <input type="checkbox" value="&#x23F0;"  onChange={ labelHandler }/> &#x23F0; Important
                    <input type="checkbox" value="&#x1F36E;"  onChange={ labelHandler }/> &#x1F36E; Not Important
                </fieldset>
                <label htmlFor="date">Due To</label>
                <input type="date" id="date" value={date} onChange={ e => setDate(e.target.value) } />
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" value={comment} onChange={ e => setComment(e.target.value) } />

                <Button type="submit" primary>Add Item</Button>
            </Form>
        </HyperModal>

    </Fragment>
)

}

export default Layout
