<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['showCredentials', 'deleteCard'])

const flip = (event) => {
  const card = event.target.closest('.card-inner');

  card?.classList.toggle('flip')

  setTimeout(() => {
    card?.classList.toggle('flip')
  }, 3000)
}

const fill = () => {
  emits('showCredentials', props.card.id)
}

const deleteCard = () => {
  emits('deleteCard', props.card.id)
}
</script>

<style lang="scss">
:root {
  --cc-bg-start: #18282d;
  --cc-bg-end: #12355b;
  --cc-bg-glow: #00b7ff20;
}

.card {
  aspect-ratio: 1.586;
  border-radius: 10px;
  perspective: 1000px;

  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: transform 600ms ease;
    transform-style: preserve-3d;

    &.flip {
      transform: rotateY(180deg);
    }
  }

  &-front,
  &-back {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    backface-visibility: hidden;
    background: linear-gradient(321.03deg, var(--cc-bg-start) 0%, var(--cc-bg-end) 91.45%);
  }

  &-front {
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    transition: transform 300ms ease-in-out;
  }

  &-back {
    transform: rotateY(180deg);

    &::before {
      content: "";
      position: absolute;
      top: 40%;
      left: 20%;
      width: 180%;
      height: 120%;
      border-radius: 100%;
      background-image: linear-gradient(
              to right top,
              var(--cc-bg-start),
              var(--cc-bg-end)
      );
      filter: blur(10px);
      opacity: 0.15;
    }

    &::after {
      content: "";
      position: absolute;
      top: 10%;
      width: 100%;
      height: 30px;
      background-image: linear-gradient(
              to right top,
              #021318,
              #07191f,
              #0a1f26,
              #0b262e,
              #0c2c35,
              #0c2c35,
              #0c2c35,
              #0c2c35,
              #0b262e,
              #0a1f26,
              #07191f,
              #021318
      );
    }
  }

  &-bg {
    position: absolute;
    top: -20px;
    right: -120px;
    width: 380px;
    height: 250px;
    background: linear-gradient(321.03deg, var(--cc-bg-start) 0%, var(--cc-bg-end) 91.45%);
    border-top-left-radius: 100%;

    &::before {
      content: "";
      position: absolute;
      top: -20px;
      right: -80px;
      width: 380px;
      height: 250px;
      background: linear-gradient(321.03deg, var(--cc-bg-start) 0%, var(--cc-bg-end) 91.45%);
      border-top-left-radius: 100%;
    }

    &::after {
      content: "";
      position: absolute;
      top: -20px;
      right: -120px;
      width: 380px;
      height: 250px;
      background: linear-gradient(321.03deg, var(--cc-bg-start) 0%, var(--cc-bg-end) 91.45%);
      border-top-left-radius: 100%;
    }
  }

  &-glow {
    position: absolute;
    top: -140px;
    left: -65px;
    height: 200px;
    width: 400px;
    background: var(--cc-bg-glow);
    filter: blur(10px);
    border-radius: 100%;
    transform: skew(-15deg, -15deg);
  }

  &-contactless {
    position: absolute;
    right: 15px;
    top: 55px;
    transform: scale(0.4);
  }

  &-chip {
    position: absolute;
    top: 65px;
    left: 25px;
    width: 40px;
    height: 32px;
    border-radius: 3px;
    background: linear-gradient(67deg, #eaac0d 0%, #8d7b23 91.45%);
    overflow: hidden;
    text-align: center;
  }

  &-holder {
    position: absolute;
    left: 25px;
    bottom: 20px;
    color: white;
    font-size: 14px;
    letter-spacing: 0.2em;
    filter: drop-shadow(1px 1px 1px rgba(black, 0.3));
    text-transform: uppercase;
  }

  &-number {
    position: absolute;
    padding: 0 25px;
    width: 100%;
    bottom: 55px;
    color: white;
    font-weight: 400;
    font-family: monospace;
    letter-spacing: 0.3em;
    filter: drop-shadow(1px 1px 1px rgba(black, 0.5));
  }

  &-valid {
    position: absolute;
    right: 25px;
    bottom: 20px;
    color: white;
    font-size: 14px;
    letter-spacing: 0.2em;
    filter: drop-shadow(1px 1px 1px rgba(black, 0.3));

    &::before {
      content: "VALID THRU";
      position: absolute;
      top: 1px;
      left: -35px;
      width: 50px;
      font-size: 6px;
    }
  }

  &-signature {
    position: absolute;
    top: 120px;
    left: 15px;
    width: 70%;
    height: 30px;
    background: rgb(238, 236, 236);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #021318;
    font-size: .75rem;
    font-weight: bolder;
    text-transform: uppercase;

    &::before {
      content: "Authorized Signature";
      position: absolute;
      top: -15px;
      left: 0;
      font-family: "Overpass Mono", monospace;
      font-size: 9px;
      color: rgb(238, 236, 236);
    }
  }

  &-cvv {
    position: absolute;
    top: 125px;
    left: 245px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 17px;
    color: #021318;
    background-color: rgb(238, 236, 236);
    text-align: center;
    font-size: 11px;
  }

  &-actions {
    position: absolute;
    top: 25px;
    left: 45%;
    cursor: pointer;
    z-index: 1;
  }
  
  &-type {
    position: absolute;
    top: 25px;
    left: 25px;
    color: white;
  }
}

.logo {
  position: absolute;
  right: 25px;
  top: 25px;
}

.hint {
  padding: 2em 0;
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: 0.025em;
  font-weight: 400;
  color: #a3d4e7;
}
</style>

<template>
  <div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <div class="card-bg"></div>

          <div class="card-glow"></div>

          <div class="card-actions">
            <div class="dropdown">
              <button class="btn btn-outline-dark border-0 btn-sm" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                <i class="fa-solid fa-ellipsis text-body"></i>
              </button>

              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click.prevent="flip">Flip</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="fill">Fill</a></li>
                <li><a class="dropdown-item" href="#" @click.prevent="deleteCard">Delete</a></li>
              </ul>
            </div>
          </div>

          <div class="card-type">
            Prepaid
          </div>
          
          <div class="card-logo">
            <template v-if="card.brand.toLowerCase() === 'mastercard'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 5 24 14"
                   class="logo"
                   width="50"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="7" cy="12" r="7" fill="#EA001B"></circle>
                  <circle cx="17" cy="12" r="7" fill="#FFA200" fill-opacity=".8"></circle>
                </g>
              </svg>
            </template>

            <template v-if="card.brand.toLowerCase() === 'visa'">
              <svg
                  xmlns="http://www.w3.org/2000/svg" fill="#ffffff" version="1.1"
                  viewBox="1 11.16 29.99 9.68"
                  class="logo"
                  width="72"
                  height="24"
              >
                <path
                    d="M15.854 11.329l-2.003 9.367h-2.424l2.006-9.367zM26.051 17.377l1.275-3.518 0.735 3.518zM28.754 20.696h2.242l-1.956-9.367h-2.069c-0.003-0-0.007-0-0.010-0-0.459 0-0.853 0.281-1.019 0.68l-0.003 0.007-3.635 8.68h2.544l0.506-1.4h3.109zM22.429 17.638c0.010-2.473-3.419-2.609-3.395-3.714 0.008-0.336 0.327-0.694 1.027-0.785 0.13-0.013 0.28-0.021 0.432-0.021 0.711 0 1.385 0.162 1.985 0.452l-0.027-0.012 0.425-1.987c-0.673-0.261-1.452-0.413-2.266-0.416h-0.001c-2.396 0-4.081 1.275-4.096 3.098-0.015 1.348 1.203 2.099 2.122 2.549 0.945 0.459 1.262 0.754 1.257 1.163-0.006 0.63-0.752 0.906-1.45 0.917-0.032 0.001-0.071 0.001-0.109 0.001-0.871 0-1.691-0.219-2.407-0.606l0.027 0.013-0.439 2.052c0.786 0.315 1.697 0.497 2.651 0.497 0.015 0 0.030-0 0.045-0h-0.002c2.546 0 4.211-1.257 4.22-3.204zM12.391 11.329l-3.926 9.367h-2.562l-1.932-7.477c-0.037-0.364-0.26-0.668-0.57-0.82l-0.006-0.003c-0.688-0.338-1.488-0.613-2.325-0.786l-0.066-0.011 0.058-0.271h4.124c0 0 0.001 0 0.001 0 0.562 0 1.028 0.411 1.115 0.948l0.001 0.006 1.021 5.421 2.522-6.376z"></path>
              </svg>
            </template>
          </div>

          <div class="card-contactless">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
              <path fill="none" stroke="#f9f9f9" stroke-width="6" stroke-linecap="round"
                    d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5 0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
              />
            </svg>
          </div>

          <div class="card-chip">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#00000050"
                 id="Layer_1" xml:space="preserve" viewBox="0.64 3.64 30.72 24.72"><path id="chip--credit_1_" d="M29,28.36H3c-1.301,0-2.36-1.059-2.36-2.36V6c0-1.301,1.059-2.36,2.36-2.36h26  c1.302,0,2.36,1.059,2.36,2.36v20C31.36,27.302,30.302,28.36,29,28.36z M22.36,27.64H29c0.904,0,1.64-0.735,1.64-1.64v-3.64h-8.28  V27.64z M10.36,27.64h11.28V10c0-0.199,0.161-0.36,0.36-0.36h8.64V6c0-0.904-0.735-1.64-1.64-1.64H10.36V27.64z M1.36,22.36V26  c0,0.904,0.736,1.64,1.64,1.64h6.64v-5.28H1.36z M22.36,21.64h8.279v-5.28H22.36V21.64z M1.36,21.64h8.28v-5.28H1.36V21.64z   M22.36,15.64h8.279v-5.28H22.36V15.64z M1.36,15.64h8.28v-5.28H1.36V15.64z M1.36,9.64h8.28V4.36H3C2.096,4.36,1.36,5.096,1.36,6  V9.64z"></path>
              <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> 
            </svg>
          </div>

          <div class="card-holder ">{{ card.name }}</div>

          <div class="card-number flex-font">
            <div class="d-flex justify-content-between">
              <template v-for="part in card.card_number.split(' ')">
                <div>
                  {{ part }}
                </div>
              </template>
            </div>
          </div>

          <div class="card-valid">{{ card.expiration_month }}/{{ card.expiration_year }}</div>
        </div>

        <div class="card-back">
          <div class="card-signature">{{ card.name }}</div>

          <div class="card-cvv">{{ card.cvv ?? '000' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>