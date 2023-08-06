import { useDispatch } from "react-redux"
import { addNewContact } from "Redux/contact"
import s from './Searchform.module.css'


export const Searchform = () => {
const dispatch = useDispatch()
    return (
        <div>
            <h2 className={s.title}>Please enter contact ✍️</h2>
            <form className={s.addForm} onSubmit={(e) => dispatch(addNewContact(e))}> 
                <input className={s.searchName} type="text" name="name" placeholder="Name" autoComplete="off"/>
                <br />
                <input className={s.searchNumber} type="tel"  name="number" placeholder="Number" autoComplete="off"/>
                <br/>
                <button className={s.addContact} type="submit" >Add contact</button>
            </form>     
        </div>
    )
}