import {  createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch("https://64cd2824bb31a268409a6ce0.mockapi.io/api/contacts/Contacts");

            if (!response.ok) {
                throw new Error("Server Error!");
            }
            
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
        
    }
)

export const removeContacts = createAsyncThunk(
    'contacts/deleteContacts', 
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://64cd2824bb31a268409a6ce0.mockapi.io/api/contacts/Contacts/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Can't delete contact, please reload page");
            }

            dispatch(deleteContact(id))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewContact = createAsyncThunk(
    'contacts/addNewContact', 
    async function(e, {rejectWithValue, dispatch}) {
        try {
                e.preventDefault()
           if (e.target.name.value.length > 0 && e.target.number.value.length > 0) {
            

            const contact = {
                 name: e.target.name.value,
                 number: e.target.number.value,
                }

             const response = await fetch(`https://64cd2824bb31a268409a6ce0.mockapi.io/api/contacts/Contacts`, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
             })   

             if (!response.ok) {
                throw new Error("Can't add contact");
            }

            const data = await response.json()

            dispatch(sendForm(data))

            e.target.name.value = ""
            e.target.number.value = ""
           } else {
            Notiflix.Notify.failure("Пожалуйста, введите данные")
           }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}
 

const contactSlice = createSlice({
    name: "contacts",
    initialState: {
            contacts: [ 
            ],
            status: null,
            error: false,
            filter: ""
    },
    reducers: {
        sendForm(state, action) {
            state.contacts.push(action.payload)
            Notiflix.Notify.success('Contact added', {
                opacity: "0.8",
                position: 'right-bottom',
                timeout: 500,
                distance: "50px",
                borderRadius: '50px',
                fontSize: '17px',
                fontAwesomeIconSize: '20px',
                success: {
                    background: "grey",
                    textColor: 'white',
                    notiflixIconColor: '#50f034',
                }
            })
        },
        deleteContact(state, action) {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
            Notiflix.Notify.success('Contact deleted', {
                opacity: "0.8",
                position: 'right-bottom',
                timeout: 500,
                distance: "50px",
                borderRadius: '50px',
                fontSize: '17px',
                fontAwesomeIconSize: '20px',
                success: {
                    background: "grey",
                    textColor: 'white',
                    notiflixIconColor: 'red',
                }
            })
        },
        filter(state, action) {
            state.filter = action.payload.toString()
        },
    }, 
    extraReducers: {
        [fetchContacts.pending]: (state) => {
            state.status = "loading";
             },

        [fetchContacts.fulfilled]: (state, action) => {
            state.status = "resolved";
             state.contacts = action.payload;},

        [fetchContacts.rejected]: setError,
        [removeContacts.rejected]: setError,
    }
})

export const { sendForm, deleteContact, filter } = contactSlice.actions
export const contactReducer = contactSlice.reducer