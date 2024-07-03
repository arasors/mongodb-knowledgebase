"use client";
import Link from 'next/link';
import {signOut, useSession} from "next-auth/react";
import {Fragment, useRef, useState} from "react";
import StringAvatar from "@/components/StringAvatar.jsx";
import {
    ClickAwayListener, Divider,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@mui/material";
import {MdListAlt} from "react-icons/md";
import {HiOutlineLogout} from "react-icons/hi";
import HeroSection from "@/components/HeroSection";
import {usePathname, useRouter} from "next/navigation";
import {FaPencil} from "react-icons/fa6";

const Navbar = () => {
    const pathname = usePathname();
    const {data: user} = useSession();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const router = useRouter();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href={"/"} className="text-white text-lg font-semibold">Help Center</Link>
                <div>
                    {
                        user?.name ? (
                            <Fragment>
                                {/*<Link href="/m" className="text-gray-300 hover:text-white mx-2 flex items-center gap-2">*/}
                                {/*    Test*/}
                                {/*</Link>*/}

                                <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
                                    <StringAvatar name={user?.name} />
                                </IconButton>


                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    className={"z-50"}
                                >
                                    {({TransitionProps, placement}) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                zIndex: 50,
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Tab') {
                                                                event.preventDefault();
                                                                // setOpen(false);
                                                            } else if (event.key === 'Escape') {
                                                                setOpen(false);
                                                            }
                                                        }}
                                                    >

                                                        <MenuItem
                                                            onClick={async () => {
                                                                router.push("/m/article")
                                                            }}
                                                        >
                                                            <ListItemIcon>
                                                                <MdListAlt size={18} />
                                                            </ListItemIcon>
                                                            <ListItemText>Makaleler</ListItemText>
                                                        </MenuItem>

                                                        <MenuItem
                                                            onClick={async () => {
                                                                router.push("/m/article/new")
                                                            }}
                                                        >
                                                            <ListItemIcon>
                                                                <FaPencil size={18} />
                                                            </ListItemIcon>
                                                            <ListItemText>Yeni makale</ListItemText>
                                                        </MenuItem>


                                                        <MenuItem
                                                            onClick={async () => {
                                                                await signOut()
                                                            }}
                                                        >
                                                            <ListItemIcon>
                                                                <HiOutlineLogout size={18} />
                                                            </ListItemIcon>
                                                            <ListItemText>Çıkış Yap</ListItemText>
                                                        </MenuItem>




                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>

                            </Fragment>
                        ) : (
                            <Link href="/auth/signin" className="text-gray-300 hover:text-white mx-2">
                                Giriş yap
                            </Link>
                        )
                    }
                    {/*{process.env.NEXT_PUBLIC_CONTACT_URL && <a className="text-gray-300 hover:text-white mx-2" target={"_blank"}*/}
                    {/*    href={`https://${process.env.NEXT_PUBLIC_CONTACT_URL}`}>*/}
                    {/*    İletişim*/}
                    {/*</a>}*/}
                </div>
            </div>
            {!pathname?.startsWith("/m") && <HeroSection titleShown={pathname === "/"}/>}
        </nav>
    );
};

export default Navbar;
