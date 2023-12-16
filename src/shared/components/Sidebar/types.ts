export interface SidebarProps {
  isOpen: boolean,
  setOpen: (val: boolean) => void,
}

export interface SidebarNavList {
  to: string,
  icon: string,
  text: string,
}
