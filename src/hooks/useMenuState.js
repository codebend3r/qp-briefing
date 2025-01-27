import { create } from "zustand"
import { devtools } from "zustand/middleware"

export const useMenuState = create()(
  devtools((set) => ({
    toggleMenu: () =>
      set((state) => ({
        open: !state.open,
      })),
    setPageYOffset: (scrollY) =>
      set(() => ({
        scrollY: scrollY,
      })),
    setPageWidth: (pageWidth) =>
      set(() => ({
        pageWidth: pageWidth,
      })),
    open: false,
    scrollY: 0,
    pageWidth: 0,
  })),
)

export default useMenuState
