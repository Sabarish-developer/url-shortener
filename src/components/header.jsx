import { useNavigate,Link } from "react-router-dom"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {LogOut, LinkIcon} from 'lucide-react';

export const Header = () => {

    const navigate = useNavigate();
    const user = true;

    return (
        <nav className="p-4 flex justify-between items-center shadow-xs sticky top-0 bg-white">
            <Link to="/" className="flex justify-start items-center">
                <img src="public\url-shortener-logo.png" alt="logo" className="h-10 "/>
                <div className="text-sm md:text-base lg:text-xl font-bold">
                    Dwindle
                </div>
            </Link>
            <div>
                {   !user 
                    ?
                        <Button onClick={()=>(navigate("/auth"))} className='cursor-pointer'>
                            Login
                        </Button> 
                    : 
                    (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                <Avatar >
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuLabel>Sabarish-developer</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem >
                                <LinkIcon className="h-4 w-4 mr-2"/> My Links
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:text-red-400">
                                <LogOut className="h-4 w-4 mr-2 text-red-400" /> <span className="text-red-400">Logout</span>
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </nav>
    )
}