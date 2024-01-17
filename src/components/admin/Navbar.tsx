import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="pt-2  bg-primary text-white items-center w-full overflow-x-hidden">
      <div className="items-center flex justify-between mx-8 p-2">
        <Link
          to={"/admin"}
          className="first-letter:font-medium first-letter:text-xl"
        >
          Cabby
        </Link>
      </div>
      </nav>
  )
}

export default Navbar