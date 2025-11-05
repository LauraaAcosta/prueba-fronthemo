import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Eliminamos la anotación de tipo <boolean | undefined>
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Media query para el breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Establecemos el estado inicial
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Escuchamos cambios
    mql.addEventListener("change", onChange);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile; // El '!!' asegura que el valor devuelto sea siempre un booleano (true/false)
}