import {Outlet} from 'react-router-dom';
import {Header} from "../components/header";
import {Toaster} from 'react-hot-toast'

export const AppLayout = () => {

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            <main className='min-h-screen'>
                <Header />
                <Outlet />
            </main>
            <div className="p-10 mt-10 text-center bg-gray-100">
                Made with 🔥 by <a className='font-bold underline' href="https://github.com/Sabarish-developer" target='_blank'>Sabarish-developer</a>
            </div>
        </div>
    )
}