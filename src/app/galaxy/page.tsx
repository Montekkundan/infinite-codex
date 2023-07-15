"use client"
import { Metadata } from "next"
import Image from "next/image"
import { PlusCircledIcon, HomeIcon } from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { World } from "@/components/world-showcase"
import { Menu } from "@/components/menu"
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder"
import { Sidebar } from "@/components/sidebar"
import { madeForYouWorlds, worlds } from "@/data/worlds"
import { useRouter } from "next/navigation"

export default function Galaxy() {
  const router = useRouter()

const handleClick = () => {
  router.push('https://github.com/Montekkundan/infinite-codex')
}

const handlehome = () => {
  router.push('/')
}
  return (
    <>
      <div className=" md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar worlds={worlds} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="world" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="world" className="relative">
                          Worlds
                        </TabsTrigger>
                        <TabsTrigger value="podcasts" disabled>Discussion</TabsTrigger>
              
                      </TabsList>
                      <div className="ml-auto mr-4 space-x-5">
                        <Button onClick={handleClick}>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Contribute
                        </Button>
                        <Button onClick={handlehome}>
                        <HomeIcon className="mr-2 h-4 w-4" />
                          Home
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="world"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Play Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {worlds.map((world) => (
                              <World
                                key={world.name}
                                world={world}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Made for You
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal worlds. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouWorlds.map((world) => (
                              <World
                                key={world.name}
                                world={world}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}