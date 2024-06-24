
import Link from "next/link";

  const links = [
    { name: 'Inicio', href: '/'},
    {
      name: 'Alimentos',
      href: '/alimentos'
    },
    { name: 'Ejercicio',
      href: '/ejercicio'
    },
    {
        name: 'Comunidad',
        href: '/comunidad'
    },
    {
        name: 'Acerca De',
        href: '/acerca'
    },
  ];
  
  export default function NavLinks( {
    Mobile
    } : {
        Mobile: boolean;
    }) {
   
    return (
      <>
        {links.map((link, index) => {
          const ultimoLink = index === (links.length - 1);
          return (
            <Link key={link.name}
                  href={link.href}
                  className={`text-sm font-medium px-4 ${Mobile ? '' : (ultimoLink ? '' : 'border-r border-gray-300')}  `}
            > 
            {link.name}
            </Link>
          );
        })}
      </>
    );
  }
  