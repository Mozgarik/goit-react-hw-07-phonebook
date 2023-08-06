import { useDispatch } from "react-redux"
import { filter } from "Redux/contact"
import s from "./Filter.module.css"


export const Filter = () => {
const dispatch = useDispatch()

    return (
        <form className="filter" onInput={(e) => dispatch(filter(e.target.value))}>
        <input className={s.filter} type="text" name="filter" placeholder="Search" autoComplete="off" />
    </form>
    )
}