import LoginForm from "@/components/login-form";
import Link from "next/link";
import { IoIosFingerPrint } from "react-icons/io";
import './_login-page.scss';

export const metadata = {
    title: 'Login'
}

export default function LoginPage() {
  return (
    <main className="login">
      <h1 className="login__heading">Log in</h1>
      <LoginForm />
      {/* 
      lav evt log in with (spotify logo)-knap med spotify farvet grøn baggrund, og rigtig logofarve (brians er hvid)
      tag link fra spotify doc under authorization tutorial, tag fra kodeeksemplet under res.redirect() 
      NB: denne fil må ikke være use client 
      hvad er vores query-parametre? vi sætter et pr linje*/}
      <Link href={
        `https://accounts.spotify.com/authorize?`
        + `response_type=code`
        + `&client_id=${process.env.CLIENT_ID}`
        + `&scope=user-read-private%20user-read-email`
        + `&redirect_uri=${process.env.CALLBACK_URL}`
      } className="login__touch">
          <div className="login__touch-icon-container">
              <IoIosFingerPrint className="login__touch-icon" />
          </div>
          <p>One-Touch Login</p>
      </Link>
    </main>
  );
}
