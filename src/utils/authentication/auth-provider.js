import {  useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export function AuthProvider({ children }) {
  const router = useRouter();

  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(!user){
        router.push("/pages/login")
    }else{
        router.push("/")
    }
  }, [user])

  return <>{children}</>;
}