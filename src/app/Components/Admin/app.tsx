import React from 'react';
import { usePathname } from 'next/navigation';
import CircularLoader from "@/app/Components/Admin/CircularLoader";
import "../styles/globals.css"; // Your global styles

function MyApp({ Component, pageProps }) {
  const router = usePathname()
  const [loading, setLoading] = React.useState(false)
 
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true)
    }
 
    const handleRouteChangeComplete = () => {
      setLoading(false)
    }
 
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
 
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])
 
  return <>{loading ? <CircularLoader /> : <Component {...pageProps} />}</>
}
 
export default MyApp