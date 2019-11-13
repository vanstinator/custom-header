import { root, main } from './helpers';

// Kiosk mode is used to hide sidebar only as well.
export const kioskMode = sidebarOnly => {
  if (window.location.href.includes('disable_ch')) return;

  // Kiosk mode styling.
  let style = document.createElement('style');
  style.setAttribute('id', 'cch_header_style');
  style.innerHTML += `
        #drawer {
          display: none;
        }
      `;
  if (!sidebarOnly) {
    style.innerHTML += `
        cch-header {
          display: none;
        }
        app-header {
          display: none;
        }
        hui-view, hui-panel-view {
          min-height: 100vh;
        }
      `;
  }

  // Add updated styles only if changed.
  const oldStyle = root.querySelector('#cch_header_style');
  if (!oldStyle || oldStyle.innerText != style.innerHTML) {
    root.appendChild(style);
    if (oldStyle) oldStyle.remove();
  }

  main.shadowRoot.querySelector('#drawer').style.display = 'none';

  // Style sidebar to close immediately and prevent opening.
  if (!main.shadowRoot.querySelector('ha-sidebar').shadowRoot.querySelector('#cch_sidebar_style')) {
    style = document.createElement('style');
    style.setAttribute('id', 'cch_sidebar_style');
    style.innerHTML = ':host(:not([expanded])) {width: 0px !important;}';
    main.shadowRoot.querySelector('ha-sidebar').shadowRoot.appendChild(style);
  }
  if (!main.shadowRoot.querySelector('#cch_sidebar_style')) {
    style = document.createElement('style');
    style.setAttribute('id', 'cch_sidebar_style');
    style.innerHTML = ':host {--app-drawer-width: 0px !important;}';
    main.shadowRoot.appendChild(style);
  }
  window.dispatchEvent(new Event('resize'));
};

export const removeKioskMode = () => {
  main.shadowRoot.querySelector('#drawer').style.display = '';
  let style = main.shadowRoot.querySelector('#cch_sidebar_style');
  if (style) style.remove();
  style = main.shadowRoot.querySelector('ha-sidebar').shadowRoot.querySelector('#cch_sidebar_style');
  if (style) style.remove();
  main.shadowRoot.querySelector('#drawer').style.display = '';
};
