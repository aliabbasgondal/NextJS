"use client"
import {
    NavigationMenu,
    NavigationMenuItem,    
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"
import Link from "next/link";
  
const Menu = () =>{
    return (
        <NavigationMenu >
  <NavigationMenuList className="flex flex-col lg:flex-row justify-center items-center gap-5">
    <NavigationMenuItem>
   <Link href={'/Men'}> Men</Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href={'/Women'}>Women</Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href={'/Kids'}>Kids</Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href={'/Products'}> All Products</Link>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

    )
}
export default Menu;