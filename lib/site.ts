// Datos del local en un solo lugar. Si cambia algo (teléfono, horario, redes), se edita acá.

export const site = {
  name: 'MY SANDY',
  tagline: 'Modas urbanas',
  address: 'Urquiza 1062',
  city: 'Paraná, Entre Ríos',
  phone: { label: '0343 431 2364', href: 'tel:+543434312364' },
  email: 'administracion@mysandy.com.ar',
  // Sin confirmar todavía: mientras sea null se muestra "Consultá horarios por WhatsApp".
  hours: null as string | null,
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13573.566765101254!2d-60.53402507978097!3d-31.73250796317535!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4a23d2a3679574fb!2sMy%20Sandy%20-%20Modas%20Urbanas!5e0!3m2!1ses-419!2sar!4v1661957269651!5m2!1ses-419!2sar',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=My+Sandy+Urquiza+1062+Paran%C3%A1',
  social: [
    { label: 'Facebook', handle: 'MySandyModa', href: 'https://www.facebook.com/MySandyModa' },
    { label: 'Instagram', handle: '@mysandyhombres', href: 'https://www.instagram.com/mysandyhombres' },
  ],
}

export const whatsapp = {
  mujer: { label: 'My Sandy Mujer', number: '+54 9 343 621-6272', href: 'https://wa.me/5493436216272' },
  hombres: { label: 'My Sandy Hombres', number: '+54 9 343 469-4445', href: 'https://wa.me/5493434694445' },
}

