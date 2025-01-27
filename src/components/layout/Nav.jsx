import Link from "next/link"

import cx from "classnames"

import styling from "@components/layout/nav.module.scss"

const Nav = ({ data }) => (
  <nav className={styling["nav"]}>
    <ul className={cx(styling["desktop-menu"], styling["list-container"])}>
      {data.links.map((link, index) => {
        if (link.children.length > 0) {
          return (
            <li key={index} className={styling["menu-parent"]}>
              <Link href={link.url}>{link.title}</Link>
              <ul className={styling["menu-children"]}>
                {link.children.map((child, index) => (
                  <li key={index} className={styling["list-item"]}>
                    <Link href={child.url}>{child.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )
        } else {
          if (link.parent) return null

          return (
            <li key={index}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          )
        }
      })}
    </ul>
  </nav>
)

export default Nav
