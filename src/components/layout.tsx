import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Listbox, ListboxItem, ListboxSection, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export default function AppLayout() {
    return (
        <React.Fragment>
            <header className={`fixed top-0 w-full bg-slate-950 z-50`}>
                <Navbar />
            </header>

            <main className={`min-h-screen w-full bg-[radial-gradient(at_50%_95%,_theme('colors.emerald.900'),_theme('colors.slate.950'))] pt-28 pb-12 md:px-8 px-4 font-mono`}>
                <Outlet />
            </main>

            <footer className={`fixed bottom-4 right-4 flex justify-center items-center`}>
                <Popover
                    placement="top-end"
                    classNames={{
                        content: 'p-0 w-min-lg',
                    }}
                >
                    <PopoverTrigger>
                        <button>
                            <span className={`material-icons text-neutral-500 hover:text-neutral-300 transition-all duration-200 w-1/2 h-min`}>privacy_tips</span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Listbox
                            aria-label="User Menu"
                            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-sm"
                            itemClasses={{
                                base: "px-4 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                            }}
                            onAction={key => {
                                if (typeof key === 'string') {
                                    window.open(key, '_blank');
                                }
                            }}
                        >
                            <ListboxSection title={'© TripWise'} classNames={{ heading: 'p-4', base: 'w-xl' }}>
                                <ListboxItem key={'/policies'} className={`min-w-64 text-sm`} startContent={<span className={`material-icons text-sm`}>open_in_new</span>}>
                                    Terms & policies
                                </ListboxItem>
                            </ListboxSection>
                        </Listbox>
                    </PopoverContent>
                </Popover>
            </footer>
        </React.Fragment>
    )
}