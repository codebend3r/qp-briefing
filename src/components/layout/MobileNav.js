import Link from "next/link"

import { IoMenuSharp } from "react-icons/io5"

import LoginButton from "@components/buttons/LoginButton"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const MobileNav = ({ data }) => {
  return (
    <nav>
      <div className="nav-menu">
        <div className="nav-menu__icon">
          <IoMenuSharp />
        </div>
      </div>
      <ul className="nav__links">
        {data.links.map((link, index) => {
          if (link.parent) return null
          return (
            <>
              <li key={index}>
                <Link href={link.url}>{link.title}</Link>
              </li>
              {link.children.map((child, index) => (
                <li key={index}>
                  <Link href={child.url}>{child.title}</Link>
                </li>
              ))}
            </>
          )
        })}
        <li>
          <LoginButton />
        </li>
      </ul>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          margin-left: auto;
        }
        .nav-menu {
          display: none;
          transition: all 2s ease-in-out;
        }

        .nav-menu {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 50px;
          z-index: 100;
        }
        .nav-menu__icon {
          font-size: 2rem;
        }
        .nav__links {
          position: absolute;
          top: 100%;
          right: 0;
          display: none;
          list-style: none;
          margin: ${theme.spacing.md} 0;
          padding: 0;
          box-shadow: ${theme.shadow.sm};
          background-color: ${colors.slate[100]};
          z-index: 100;
          margin: 0;
          padding: 0;
        }
        nav:hover ul {
          display: block;
        }

        li {
          margin: ${theme.spacing.sm} 0;
          text-align: center;
          padding: 1rem 1rem;
          display: block;
        }
        li a {
          color: ${colors.white};
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
        }
        li:hover {
          background-color: ${colors.sky[600]};
          color: ${colors.white};
        }

        @media (min-width: 768px) {
          nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}

export default MobileNav
