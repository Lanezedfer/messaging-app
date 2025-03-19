import { useEffect, useRef } from "react";

const useChatScroll = <T extends HTMLElement>(dep: any) => {
  const ref = useRef<T | null>(null);

  useEffect(() =>{
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight
      }
    }, 100)
  }, [dep])

  return ref;
}

export default useChatScroll;