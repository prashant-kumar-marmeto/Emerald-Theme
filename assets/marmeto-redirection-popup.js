class MarmetoRedirectionPopup extends HTMLElement {
  constructor() {
    super();
    this.getCountryDetails();
    this.initCloseButton();
  }

  getCountryDetails() {
    this.updateSiteCookies();

    if (this.siteCookies.hasOwnProperty('VisitorCountryCode')) {
      this.showRedirectionModal();
    } else {
      this.setCountryDetails();
    }
  }

  updateSiteCookies() {
    this.siteCookies = Object.fromEntries(document.cookie.split(';').map(cookie => {
      const [key, value] = cookie.split('=');
      return [key.trim(), decodeURIComponent(value)];
    }));
    console.log(this.siteCookies)
  }

  async setCountryDetails() {
    try {
      const ipDataResponse = await fetch("https://api.ipdata.co?api-key=00dd60ee2d2bafa40163c6d90630d2118825873c15b75ce2234bdd52");
      if (!ipDataResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const ipDataResponseJson = await ipDataResponse.json();

      const cookieData = {
        VisitorCountryCode: ipDataResponseJson.country_code,
        VisitorCountryName: ipDataResponseJson.country_name,
        VisitorCountryEmoji: ipDataResponseJson.flag,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()
      };

      for (const [key, value] of Object.entries(cookieData)) {
        document.cookie = `${key}=${encodeURIComponent(value)}; expires=${cookieData.expires}; path=/`;
      }

      this.updateSiteCookies();  
      this.showRedirectionModal();
    } catch (error) {
      console.error("Failed to fetch IP data:", error);
    }
  }

  showRedirectionModal() {
    const { VisitorCountryCode, VisitorCountryName, VisitorCountryEmoji } = this.siteCookies;

    const countryDetailsElement = this.querySelector('[data-country-details]');
    if (countryDetailsElement) {
      countryDetailsElement.innerHTML = `
        Looks like you're in ${VisitorCountryName}
        ${VisitorCountryEmoji ? `<img src="${decodeURIComponent(VisitorCountryEmoji)}" alt="Icon ${VisitorCountryName}">` : ''}
      `;
    }
    
    if (['US', 'CA', 'IN'].includes(VisitorCountryCode)) {
      this.style.display = "flex";
      document.body.style.overflow = 'hidden';
    }
  }
  initCloseButton() {
    const closeButton = this.querySelector('.marmeto-close-popup');
    const closeStatement = this.querySelector('.marmeto-close-statement');

    const closePopup = () => {
      this.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (closeButton) {
      closeButton.addEventListener('click', closePopup);
    }

    if (closeStatement) {
      closeStatement.addEventListener('click', closePopup);
    }
  }
}

customElements.define('marmeto-redirection-popup', MarmetoRedirectionPopup);