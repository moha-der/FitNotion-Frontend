
  // Map of links to display in the side navigation.

import Link from "next/link";

  // Depending on the size of the application, this would be stored in a database.
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
  