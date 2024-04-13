function Header() {
    const linkList = [
        { name: 'Schedule', url: '/schedule' },
        { name: 'Events', url: '/about' },
        { name: 'Contact', url: '/contact' },
        { name: 'Login', url: '/login' }
    ]
    return (
        <header className="flex justify-between py-4 px-12 gap-4">
            <span className='flex gap-1'>
                <img src="" alt="" />
                <h1></h1>
            </span>
        </header>
    )
}

export default Header
