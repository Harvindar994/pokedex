import Link from 'next/link';
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { VscGithub } from "react-icons/vsc";
import Logo from './Logo';


const Footer2 = () => {
  return (
    <div className="bg-base-200 py-6 flex items-center px-10">
        <p className="flex-1">Made with ❤️ by Harvindar singh </p>
        <div className="flex gap-5">
            <Link target="_blank" href="https://wa.me/+919695806109" className="text-2xl"><FaWhatsapp/></Link>
            <Link target="_blank" href="https://www.linkedin.com/in/harvindar-singh-653326212/" className="text-2xl"><FaLinkedinIn/></Link>
            <Link target="_blank" href="https://github.com/Harvindar994" className="text-2xl"><VscGithub/></Link>
            <Link target="_blank" href="https://harvindar.in" className="text-2xl"><IoEarthOutline/></Link>
        </div>
    </div>
  )
}
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200">
        <aside>
            <Logo size={40} url='/logo.png'/>
            <p className="font-bold">
            Made with ❤️ by Harvindar singh
            </p> 
            <p>Copyright © 2024 - All right reserved</p>
        </aside> 
        <nav>
            <div className="grid grid-flow-col gap-4">
                <Link target="_blank" href="https://wa.me/+919695806109" className="text-2xl"><FaWhatsapp/></Link>
                <Link target="_blank" href="https://www.linkedin.com/in/harvindar-singh-653326212/" className="text-2xl"><FaLinkedinIn/></Link>
                <Link target="_blank" href="https://github.com/Harvindar994" className="text-2xl"><VscGithub/></Link>
                <Link target="_blank" href="https://harvindar.in" className="text-2xl"><IoEarthOutline/></Link>
            </div>
        </nav>
    </footer>
  )
}

export default Footer;