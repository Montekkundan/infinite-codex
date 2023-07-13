import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
  export function Menu() {
    return (
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <MenubarTrigger className="font-bold">Galaxy</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About Infinte-Codex</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Account</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarLabel inset>Montek</MenubarLabel>
            <MenubarSeparator />
            <MenubarItem inset>Settings</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }