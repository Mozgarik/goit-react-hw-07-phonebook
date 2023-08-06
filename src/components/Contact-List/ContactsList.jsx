import { ContactsItem } from "../Contact-Item/ContactsItem"
import s from './ContactList.module.css'
import { Filter } from "components/Filter/Filter"

export const ContactsList = () => {
    return (
        <div>
            <ul className={s.contactList}>
            <h2 className={s.contactTitle}>Contact list ❤️</h2>
            <Filter/> 
            <ContactsItem/>
        </ul> 
        </div>
         
    )
}