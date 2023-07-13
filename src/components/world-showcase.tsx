"use client"
import Image from "next/image"


import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { World, worlds } from "../data/worlds"
import { useRouter } from "next/navigation"

interface WorldProps extends React.HTMLAttributes<HTMLDivElement> {
  world: World
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function World({
  world,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: WorldProps) {
  const router = useRouter()
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={world.cover}
              width={width}
              height={height}
              onClick={() => world.href ? router.push(world.href) : router.push('/')}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 cursor-pointer",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
              alt={world.name}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Favourites</ContextMenuItem>
         
          <ContextMenuSeparator />
          <ContextMenuItem>Play Now</ContextMenuItem>
          <ContextMenuItem>How to Play</ContextMenuItem>
          <ContextMenuItem>Create Discussion</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{world.name}</h3>
        <p className="text-xs text-muted-foreground">{world.creator}</p>
      </div>
    </div>
  )
}