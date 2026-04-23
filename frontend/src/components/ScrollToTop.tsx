import { useEffect } from 'react'

export default function ScrollToTop() {
  
    useEffect(() => {
      scrollTo(0,0)
    }, [])   
}
