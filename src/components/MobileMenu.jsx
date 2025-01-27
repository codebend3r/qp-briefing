import { useSession } from "next-auth/react"
import { FaUser } from "react-icons/fa"

import LoginButton from "@components/buttons/LoginButton"
import SubscribeButton from "@components/buttons/SubscribeButton"
import { AccountLink, MenuItem, MenuList, MobileMenuContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

export const MobileMenu = () => {
  const { data: session } = useSession()
  const open = useMenuState((state) => state.open)

  return (
    <MobileMenuContainer open={open}>
      <MenuList>
        <MenuItem>
          <LoginButton small />
        </MenuItem>
        <MenuItem>
          <SubscribeButton small />
        </MenuItem>
        <MenuItem>
          {!!session && (
            <AccountLink small href="/account">
              <FaUser />
              <p>Account</p>
            </AccountLink>
          )}
        </MenuItem>
      </MenuList>
    </MobileMenuContainer>
  )
}

export default MobileMenu
