import { useDispatch, useSelector } from "react-redux"
import { removeContacts } from "Redux/contact"
import { nanoid } from "nanoid"
import s from './ContactItem.module.css'

export const ContactsItem = () => {
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contacts)
    const filt = useSelector(state => state.filter)

    return (
        filt.length > 0 ? contacts.filter(contact => contact.name.toLowerCase()
        .includes(filt.toLowerCase()))
        .map(contact =>  
            <li className={s.contactsItem} key={nanoid()}>
            <span className={s.contactName}>{contact.name}: <span className={s.contactNumber}>{contact.number}</span></span>
            <button className={s.contactDelete} type="delete" onClick={() => dispatch(removeContacts(contact.id))}>Delete</button>
            </li>)
         : 
         contacts.map(contact => 
         <li className={s.contactsItem} key={nanoid()}>
            <span className={s.contactName}>{contact.name}: <span className={s.contactNumber}>{contact.number}</span></span>
            <button className={s.contactDelete} type="delete" onClick={() => dispatch(removeContacts(contact.id))}>Delete</button>
            </li>)
    )
}