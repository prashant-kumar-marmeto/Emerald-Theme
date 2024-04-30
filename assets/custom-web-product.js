if (!customElements.get('custom-web-product')) {
    
    class customWebProduct extends HTMLElement {
        constructor() {
            super();
            this.productHandle = this.dataset.productHandle;
            if (this.querySelector("script")) {
                this.variantData = JSON.parse(this.querySelector("script").textContent);
              }
            // this.hoverImage();
            this.addEventListener('change', () => {
                this.onOptionChange()
            })
        }

        hoverImage() {
            let imageContainerEl = this.querySelector("#imageContainer");
            let firstImage = this.querySelector("#firstImage");
            let secondImage = this.querySelector("#secondImage");
            let viewContainer = this.querySelector(".custom-rings-product--view-container button");

            imageContainerEl.addEventListener("mouseenter", () => {
                firstImage.style.display = "none";
                secondImage.style.display = "block";
                viewContainer.style.display = "block";
            });

            imageContainerEl.addEventListener("mouseleave", () => {
                firstImage.style.display = "block";
                secondImage.style.display = "none";
                viewContainer.style.display = "none";
            });
        }

        // variantChange(){
        //     console.log(this.querySelector('input[type="radio"]:checked').value)
        // }
        
        onOptionChange() {
            this.selectedId = this.querySelector("input[type='radio']:checked").value
            // this.selectedOptions = Array.from(
            //   this.querySelectorAll('input[type="radio"]:checked'),
            //   (input) => input.value
            // );
            
            // this.currentVariant = this.variantData.find((variant) => {
            //     return variant.options.some((option, index) => {
            //         return this.selectedOptions[index] === option;
            //     });
            // });
            this.getUpdatedCard();
          }
          getUpdatedCard() {
            const url = `/products/${this.productHandle}?view=custom-product-card&variant=${this.selectedId}`;
            console.log(url);
            fetch(url)
              .then((response) => response.text())
              .then((responseText) => {
                const html = new DOMParser().parseFromString(responseText, "text/html");

                this.innerHTML = html.querySelector('custom-web-product').innerHTML;
              });
          }
    }

    customElements.define('custom-web-product', customWebProduct);
}