/*!
 * Start Bootstrap - SB Admin Pro v2.0.4 (https://shop.startbootstrap.com/product/sb-admin-pro)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under SEE_LICENSE (https://github.com/StartBootstrap/sb-admin-pro/blob/master/LICENSE)
 */

window.addEventListener('DOMContentLoaded', (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector('#sidebarToggle')
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault()
      document.body.classList.toggle('sidenav-toggled')
      localStorage.setItem(
        'sb|sidebar-toggle',
        document.body.classList.contains('sidenav-toggled')
      )
    })
  }

  // Close side navigation when width < LG
  const sidenavContent = document.body.querySelector('#layoutSidenav_content')
  if (sidenavContent) {
    sidenavContent.addEventListener('click', (event) => {
      const BOOTSTRAP_LG_WIDTH = 992
      if (window.innerWidth >= 992) {
        return
      }
      if (document.body.classList.contains('sidenav-toggled')) {
        document.body.classList.toggle('sidenav-toggled')
      }
    })
  }
})
