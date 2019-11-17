import {LitElement, html, css} from 'lit-element';
import {property, customElement} from 'lit-element';

import {sharedStyles} from './fp-styles'
import '../oxygen/oxy-button';
import '../oxygen/oxy-dialog';
import '../oxygen/oxy-icon';
import '../oxygen/oxy-icons-all';

@customElement('fp-db-entry-icons')
export class FpDbEntryIcons extends LitElement {
  static get styles() {
    return css`
      ${sharedStyles}
      oxy-dialog {
        display: flex;
        flex-direction: column;
        align-items: center;

        top: 10%;
        left: 10%;
        right: 10%;
        max-height: 80%;
        transform: none;
        background-color: #333;
        border-radius: 8px;
      }
      #container {
        overflow-y: auto;
        margin: 0 16px 16px 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      oxy-button {
        margin: 6px;
        padding: 6px;
        background-color: rgba(0, 0, 0, 0.25);
        --oxy-button-hover-color: var(--theme-color-ice3);
        --oxy-button-focus-color: var(--theme-color-ice3);
        --oxy-button-active-color: var(--theme-color-ice3);
      }
    `;
  }

  private icons: string[] = [
    'logos:amazon',
    'logos:apple',
    'logos:google',
    'logos:facebook',
    'logos:instagram',
    'logos:twitter',
    'logos:whatsapp',
    'logos:skype',
    'logos:slack',
    'logos:windows',
    'logos:xbox',
    'logos:dropbox',
    'logos:github',
    'logos:steam',
    'logos:battlenet',
    'logos:uplay',
    'logos:paypal',
    'logos:visa',
    'logos:mastercard',
    'logos:amex',
    'logos:linkedin',
    'icons:account-box',
    'icons:account-circle',
    'icons:alarm',
    'icons:android',
    'icons:apps',
    'icons:assessment',
    'icons:attachment',
    'icons:book',
    'icons:bug-report',
    'icons:build',
    'icons:card-giftcard',
    'icons:card-membership',
    'icons:card-travel',
    'icons:cloud-queue',
    'icons:code',
    'icons:dashboard',
    'icons:delete',
    'icons:euro-symbol',
    'editor:attach-money',
    'editor:insert-drive-file',
    'icons:explore',
    'icons:extension',
    'icons:face',
    'icons:favorite',
    'icons:fingerprint',
    'icons:flight-takeoff',
    'icons:folder-open',
    'icons:home',
    'icons:inbox',
    'icons:language',
    'icons:lightbulb-outline',
    'icons:link',
    'icons:payment',
    'icons:room',
    'icons:settings',
    'icons:shopping-basket',
    'icons:star-border',
    'icons:supervisor-account',
    'icons:theaters',
    'av:movie',
    'av:music-video',
    'communication:business',
    'communication:chat-bubble',
    'communication:email',
    'communication:mail-outline',
    'communication:message',
    'communication:phone',
    'communication:vpn-key',
    'device:sd-storage',
    'device:wifi-lock',
    'hardware:desktop-mac',
    'hardware:desktop-windows',
    'hardware:laptop',
    'hardware:security',
    'image:camera',
    'image:camera-alt',
    'maps:directions-bike',
    'maps:directions-bus',
    'maps:directions-car',
    'maps:local-airport',
    'maps:local-bar',
    'maps:local-cafe',
    'maps:local-gas-station',
    'maps:local-grocery-store',
    'maps:local-hospital',
    'maps:local-hotel',
    'maps:local-shipping',
    'maps:restaurant',
    'social:public',
    'social:school',
    'social:whatshot',
    'places:spa',
  ];

  @property({type: Boolean, reflect: true}) opened = false;

  render() {
    return html`
      <oxy-dialog ?opened=${this.opened} backdrop @close=${this.onClose}>
        <h2>Select icon</h2>
        <div id="container">
          ${this.icons.map(icon => this.renderIcon(icon))}
        </div>
      </oxy-dialog>
    `;
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  private renderIcon(icon: string) {
    return html`
      <oxy-button @click=${() => this.onSelected(icon)}>
        <oxy-icon icon=${icon}></oxy-icon>
      </oxy-button>
    `;
  }

  private onSelected(icon: string) {
    this.close();
    this.dispatchEvent(new CustomEvent('changed', {detail: icon}));
  }

  private onClose() {
    this.close();
    this.dispatchEvent(new CustomEvent('changed', {detail: ''}));
  }
}
