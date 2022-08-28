import React, { useEffect, useState } from 'react';
import APICall from '../../Component/APICall/APICall'
import Dialog from '../../Component/Dialog/Dialog';
import Table from '../../Component/Table/TableRoot/TableRoot'
import PersonService from '../../Service/PersonService';
import Header from '../Header/Header';
import './Person.css';

export default function Person(props) {

    useEffect(() => {
        const fetchPeople = async () => {
            setAPI({
                res: await PersonService.getPeople(),
                onSucceed: (res) => {
                    setPeople(res.data)
                }
            });
        }
        fetchPeople();
    }, [])

    const [API, setAPI] = useState();
    const [people, setPeople] = useState();
    const [deleteId, setDeleteId] = useState();
    const [tableState, setTableState] = useState();

    const columns = [
        {
            Header: "personId",
            Accessor: "personId"
        },
        {
            Header: "email",
            Accessor: "email"
        },
        
    ]

    const createPerson = () => { }

    const toDeletePerson = (person) => {
        setDeleteId(person.personId)
    }

    const deletePerson = () => {
        closeDeleteDialog();
    }

    const updatePerson = () => { }

    const closeDeleteDialog = () => {
        setDeleteId(null);
    }

    return (
        <div className='people'>
            <Header btn_back={true}></Header>
            {API && <APICall API={API} secured={true} setAPI={setAPI}></APICall>}
            {people && <div className='peopleTable'><Table tableState={tableState} setTableState={setTableState} deleteRow={toDeletePerson}
                editableRows={false} updateRow={updatePerson} createRow={createPerson} data={people} columns={columns}></Table></div>}
            {deleteId && <Dialog Message={"Do you want to delete this person permanently?"}
                showOk={true} buttonOK={deletePerson} showCancel={true} buttonCancel={closeDeleteDialog}></Dialog>}
        </div>
    );
}
