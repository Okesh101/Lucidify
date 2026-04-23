import NavItem from './NavItem'

const Navbar = () => {
    
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#013272] shadow-[#061e3b] shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl font-[Nunito] tracking-wider">
            ⚡ SME Compliance
        </div>
        {/* Nav Links */}
        <div className='flex space-x-9 font-[DMMono]'>
            {/* NavItem for home */}
            <NavItem pathname='' linkname='Home'/>
            
            {/* NavItem for how it works */}
            <NavItem pathname='how_it_works' linkname='How It Works'/>

            {/* NavItem for about us */}
            <NavItem pathname='about' linkname='About Us'/>
        </div>
        <div className="flex gap-4 font-[ClashDisplay] tracking-wider">
            <button className="bg-[#15c054d5] px-8 py-2 rounded-lg cursor-pointer">Start Filling</button>
            <button className="border border-white/50 px-6 cursor-pointer py-2 rounded-lg">About</button>
        </div>
    </nav>
  )
}

export default Navbar