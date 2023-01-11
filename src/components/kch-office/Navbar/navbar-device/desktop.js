import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import ProfileInitial from 'components/kch-office/ProfileInitial'

import useUser from 'pages/api/user'

import capitalizeEachWord from 'helpers/capitalizeEachWord'

import NotificationIcon from '../../../../../public/images/svg/kch-office/notification-icon.svg'
import Logo from '../../../../../public/images/pictures/kch-office/logo-kalbe.png'
import CubeLogo from '/public/images/svg/cube-logo.svg'

export default function NavbarDesktop(props) {
    const router = useRouter()
    const { user, logout } = useUser()

    const [toggle, setToggle] = useState(false)

    const imageLoader = ({src}) => {
        return src
    }

    useEffect(() => {

    }, [user])


    return (
        <>
            <div className="w-1/3 flex flex-col py-1 gap-1 place-content-start items-start">
               <Link href='/booking-desk'>
                    <div className="text-2xl text-green-900 font-extrabold">Booking</div>
                    <div className="text-sm tracking-wide text-green-500 font-semibold">Sharing Desk</div>
               </Link>
            </div>
            <div className="w-2/3 flex flex-row gap-4 place-content-end items-center">
                
                {/* <Link href="/kch-office/notification">
                    <NotificationIcon className='px-0.5' />
                </Link> */}

                <div className="py-3 px-3 rounded-full bg-white border-2 border-green-900  drop-shadow-md hover:drop-shadow-sm cursor-pointer" onClick={() => router.push('/')}>
                    <CubeLogo />
                </div>
                <div className="relative flex flex-row gap-1 px-1.5 py-1.5 place-content-end items-center bg-green-900 cursor-pointer  drop-shadow-md hover:drop-shadow-sm rounded-full "
                    onClick={() => setToggle(!toggle)}>
                        <div className="flex p-2">
                            <p className="text-white text-sm font-medium">{capitalizeEachWord(user?.name)}</p>
                        </div>
                        <div className="relative flex w-10 h-10 p-0.5 place-content-center items-center border-2 border-white rounded-full">
                        {
                            user?.photo_profile === null || user?.photo_profile === undefined ? (
                                <ProfileInitial name={user?.name} width="full" height="full"/>
                            ) : (
                                <Image  fill
                                        loader={imageLoader}
                                        src={`${process.env.NEXT_PUBLIC_API_STORAGE}/files/get?filePath=${user.photo_profile}`} 
                                        className="object-contain object-center rounded-full p-0.5" 
                                        alt="profile-image"/>
                            )

                        }
                        </div>

                        {
                            toggle && (
                                <div className="fixed flex flex-col drop-shadow-md mt-48 shadow-md rounded-xl">
                                    <div className="text-right text-sm text-green-900 font-medium p-4 bg-white hover:bg-opacity-95 rounded-t-xl" onClick={() => logout()}>Log Out</div>
                                    <Link href="/booking-desk/profile">
                                        <div className="text-right text-sm text-green-900 font-medium p-4 bg-white hover:bg-opacity-95 rounded-b-xl">Profile Setting</div>
                                    </Link>
                                </div>
                            )
                        }
                </div>



            </div>
            
        </>
    )
}