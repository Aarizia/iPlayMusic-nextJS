'use client';

import './_login-form.scss';
import { useActionState } from "react"
import HandleLoginForm from "./handle-login-form";
import { PiUserCircleFill } from "react-icons/pi";
import { IoKey } from "react-icons/io5";
import { IoIosFingerPrint } from "react-icons/io";

export default function LoginForm() {

    const [formState, formAction, isPending] = useActionState(HandleLoginForm, {});

    return (
        <>
            <form className="login__form" action={formAction} noValidate>
                <div className='login__form-group'>
                    <label className="login__label">
                        <span>Username</span>
                        <input className="login__input" name='username' type="text" placeholder="Enter your username" defaultValue={formState?.data?.username} />
                        <PiUserCircleFill className="login__icon" />
                    </label>
                    <span className="text-red-500">{formState?.properties?.username?.errors}</span>
                </div>
                <div className='login__form-group'>
                    <label className="login__label">
                        <span>Password</span>
                        <input className="login__input" name='password' type="password" placeholder="Enter your password" defaultValue={formState?.data?.password} />
                        <IoKey className="login__icon" />
                    </label>
                    <span className="text-red-500">{formState?.properties?.password?.errors}</span>
                </div>
                <button type="submit" className={`login__button disabled:bg-gray-400`} disabled={isPending}>Log in</button>
            </form>
{/*                     <div className="login__touch">
                <div className="login__touch-icon-container">
                    <IoIosFingerPrint className="login__touch-icon" />
                </div>
                <p>One-Touch Login</p>
            </div> */}
        </>
    )
}