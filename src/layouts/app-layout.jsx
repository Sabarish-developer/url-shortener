import {Outlet} from 'react-router-dom';

export const AppLayout = () => {

    return (
        <div>
            <main className='min-h-screen container'>
                <Outlet />
            </main>
            <div className="p-10 mt-10 text-center bg-gray-100">
                Made with 🔥 by <span className='font-bold'>Sabarish-developer</span>
            </div>
        </div>
    )
}