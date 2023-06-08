import Link from "next/link"
import SigninButton from "./signin";
const AppBar = () =>{
    return(
        <header>
            <Link href={"/"} className="flex gap-4 p-4 bg-gradiant-to-b from-white to-gray-200 shadow">
                Home Page
            </Link>
            <Link href={"/books/ListofBooks"} className="flex gap-4 p-4 bg-gradiant-to-b from-white to-gray-200 shadow">
                List of Books
            </Link>
            <SigninButton></SigninButton>
        </header>
    )
}
export default AppBar;