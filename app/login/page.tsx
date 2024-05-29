import { Input, Spacer, Button } from '@nextui-org/react'
import { authenticate } from '../lib/actions'
import { GlobeAltIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
 
export default function Page() {
  return (
    // <form action={authenticate}>
    //   <input type="email" name="email" placeholder="Email" required />
    //   <input type="password" name="password" placeholder="Password" required />
    //   <button type="submit">Login</button>
    // </form>
    <div className='flex flex-col h-screen justify-center items-center bg-green-600'>
        <div className='flex flex-row justify-center items-center'>
            <GlobeAltIcon height={'10em'}
            className='text-gray-50 rotate-[15deg]'></GlobeAltIcon>
            <p className='text-[10em] text-gray-50 text-center'>HRMIS-TMS</p>
        </div>
        <form action={authenticate}>
            <div className='flex flex-col justify-center items-center start border- border-solid border-black p-5'>
                <Input
                type='username'
                name='username'
                placeholder='username'
                startContent={
                    <UserIcon width={"2em"}></UserIcon>
                }>
                </Input>
                <Spacer y={2}></Spacer>
                <Input
                type='password'
                name='password'
                placeholder='password'
                startContent={
                    <LockClosedIcon width={"2em"}></LockClosedIcon>
                }>
                </Input>
                <Spacer y={2}></Spacer>
                <Button type='submit'>Login</Button>
            </div>
        </form>
    </div>
  )
}