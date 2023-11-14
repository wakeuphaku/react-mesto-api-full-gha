import { Header } from "./Header"
import React from "react";

import { register } from '../utils/Auth.js';
import { Link, useNavigate } from 'react-router-dom';

export function Register(props) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',

    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        register(formValue.email, formValue.password)
            .then((item) => {
                if (item.data) {
                    props.openInfoTooltip(true);
                    navigate("/sign-in", { replace: true });
                } else {
                    props.openInfoTooltip(false);
                }
            })
            .catch((err) => {
                console.log(err);
                props.openInfoTooltip(false);
            });
    };
    return (


        <section className="register" >
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>

                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="register__input register__input-email"
                    value={formValue.email}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                />
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="register__input register__input-password"
                    value={formValue.password}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                />
                <button className="register__button" type="submit">
                    Зарегистрироваться
                </button>

            </form>
            <div className="register__question">
                <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link">Войти</Link> </p>
            </div>


        </section >

    )
}
