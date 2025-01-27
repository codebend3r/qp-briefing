"use client"

import Link from "next/link"

import { MEDIA_QUERY } from "@constants"
import styled from "@emotion/styled"

import { colors } from "@styles/colors"

export const MENU_WIDTH = "200px"

export const PageContainer = styled.div`
  position: relative;
`

export const ViewPortContainer = styled.div`
  transform: translateZ(0);
  position: ${({ open = false }) => (open ? "fixed" : "relative")};
  left: ${({ open = false }) => (open ? MENU_WIDTH : "0")};
  translate: ${({ open = false, scrollY }) => (open ? `0 -${scrollY}px` : "0 0")};
  width: ${({ open = false, pageWidth }) => (open ? `${pageWidth}px` : "100%")};

  ${MEDIA_QUERY.LG_DOWN} {
    box-shadow: -5px 0px 10px 0px #e6e3e3;
  }
  /* transition: left 0.3s ease; */
`

export const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 1rem;
  left: ${({ open = false }) => (open ? "0" : `-${MENU_WIDTH}`)};
  height: 100vh;
  width: ${MENU_WIDTH};
  box-sizing: border-box;
  border-right: 1px solid ${colors.blue[900]};
  /* transition: left 0.3s ease; */
`

export const Overlay = styled.div`
  position: fixed;
  background-color: white;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  right: 0;
  bottom: 0;
  pointer-events: ${({ open = false }) => (open ? "auto" : "none")};
  opacity: ${({ open = false }) => (open ? 0.5 : 0)};
  /* transition:
    left 0.3s ease,
    opacity 0.3s ease; */
  left: ${({ open = false }) => (open ? MENU_WIDTH : "0")};
`

export const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  justify-content: stretch;
  justify-items: stretch;
  gap: 0.5rem;

  ${MEDIA_QUERY.LG_UP} {
    display: none;
  }
`

export const MenuItem = styled.li`
  display: grid;
  width: auto;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: stretch;
  justify-items: stretch;
`

export const AccountLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-content: stretch;
  gap: 0.5rem;
  border-radius: 5px;
  width: ${({ small = false }) => (small ? "auto" : "4rem")};
  border: ${({ small = false }) => (small ? "1px solid #1f2937" : "1px solid transparent")};
  height: ${({ small = false }) => (small ? "3rem" : "auto")};
  padding: ${({ small = false }) => (small ? "0 0.5rem" : "0")};
  box-sizing: border-box;

  ${MEDIA_QUERY.LG_UP} {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  p {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    display: block;
    padding: 0;
    margin: 0;
    line-height: initial;

    ${MEDIA_QUERY.LG_UP} {
      display: none;
    }
  }
`
