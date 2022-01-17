// Header.js

const Header = () => {
    const numberOfCookies = 1;
    const cookieClasses = numberOfCookies === 1 ? 'lowCookies' : null;
    return (
        <header className={cookieClasses}>
            <h1>We have {numberOfCookies} {numberOfCookies === 1 ? 'cookie' : 'cookies'}</h1>
        </header>
    )
}

export default Header;