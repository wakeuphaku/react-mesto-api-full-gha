import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem("jwt");
        props.handleLogout();
        navigate("/sign-in", { replace: true });
    }

    return (
        <header className="header">
            <a href="#" className="header__logo"></a>
            {props.isLogin ? (

                <div className="header__info">
                    <p className="header__info-email">{props.userEmail}</p>
                    <button className="header__info-button" onClick={signOut}>
                        Выход
                    </button>
                </div>

            ) : (
                <Link to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
                    className="header__info-button"
                >
                    {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
                </Link>
            )}
        </header>
    )
}