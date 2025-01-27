"use client"

import { useEffect } from "react"

import { MEDIA_QUERY } from "@constants"
import styled from "@emotion/styled"
import { IoCloseSharp, IoMenuSharp } from "react-icons/io5"

import { useMenuState } from "@hooks/useMenuState"

const HamburgerButton = styled.button`
  transform: translateZ(0);
  appearance: none;
  background: none;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  left: 1rem;
  display: none;
  color: #1f2937;

  ${MEDIA_QUERY.LG_DOWN} {
    display: block;
  }
`

export const HamburgerMenu = () => {
  const open = useMenuState((state) => state.open)
  const toggleMenu = useMenuState((state) => state.toggleMenu)
  const setPageYOffset = useMenuState((state) => state.setPageYOffset)
  const setPageWidth = useMenuState((state) => state.setPageWidth)
  const scrollY = useMenuState((state) => state.scrollY)

  const onToggleHamburger = () => {
    if (!open) {
      setPageYOffset(window.scrollY)
      setPageWidth(window.innerWidth)
    }

    toggleMenu()
  }

  // when the hamburger menu closes
  useEffect(() => {
    if (!open) {
      window.scrollTo(0, scrollY)
    }
  }, [open])

  return (
    <HamburgerButton onClick={onToggleHamburger}>
      {open ? <IoCloseSharp size="1.5em" /> : <IoMenuSharp size="1.5em" />}
    </HamburgerButton>
  )
}

export default HamburgerMenu
