<template>
  <div class="wrapper-home">
    <div class="left-section">
      <h1>
        <span>DIGIFI YOUR LIFE </span> <br />
        USER MANAGE NOW
      </h1>
      <p class="sub-head">
        No need to spend millions of dollars $$ and spend hours learning excel.
        <br />
        Our the latest generation automation tool will sort our your HR
        requirements with just a few clicks
      </p>

      <div class="cta-btns">
        <router-link class="primary-cta" :to="{ name: 'register' }"
          >Sign Up Now</router-link
        >
        <router-link class="secondary-cta" :to="{ name: 'dashboard' }">
          <span>Live Dashboard Here</span>
          <svg viewBox="0 0 19 9" fill="none">
            <path
              d="M18.3536 4.85355C18.5488 4.65829 18.5488 4.34171 18.3536 4.14645L15.1716 0.964466C14.9763 0.769204 14.6597 0.769204 14.4645 0.964466C14.2692 1.15973 14.2692 1.47631 14.4645 1.67157L17.2929 4.5L14.4645 7.32843C14.2692 7.52369 14.2692 7.84027 14.4645 8.03553C14.6597 8.2308 14.9763 8.2308 15.1716 8.03553L18.3536 4.85355ZM0 5H18V4H0V5Z"
              fill="black"
            />
          </svg>
        </router-link>
      </div>
    </div>
    <div class="right-section">
      <div class="premium-actions">
        <p class="crud-txt">Create</p>
        <p>
          Be able to create any user you want! tutorials are given as part of
          our premium package.
        </p>
      </div>
      <div class="premium-actions">
        <p class="crud-txt">Read</p>
        <p>
          Visualize data not just think it! View all your employees and see the
          details of each and everyone of them.
        </p>
      </div>
      <div class="premium-actions">
        <p class="crud-txt">Update</p>
        <p>
          No mistake is ever irreversable! need to update data or fix something?
          We got you covered, just purchase our add-ons for this remarkable
          feature
        </p>
      </div>
      <div class="premium-actions">
        <p class="crud-txt">Delete</p>
        <p>
          Get Rid of unwanted data! You guessed it we even have the ability to remove unwanted information!
        </p>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped lang="less">

@keyframes left-animation {
  from {opacity: 0; transform: translateX(-10px);}
  to {opacity: 1; transform: translateX(0);}
}
@keyframes right-animation {
  from {opacity: 0; transform: translateX(10px);}
  to {opacity: 1; transform: translateX(0);}
}

.wrapper-home {
  display: flex;
  gap: 8em;
  margin-top: 11em;
  padding: 0 1em;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
  .left-section {
    width: 45%;
    @media only screen and (max-width: 800px) {
      width: 100%;
    }

    animation-name: left-animation;
    animation-duration: 1s;

    h1 {
      font-size: 5.2rem;
      font-weight: normal;
      margin: 0;
      text-align: left;
      span {
        white-space: nowrap;
      }
    }

    .sub-head {
      font-size: 1.8rem;
      text-align: left;
    }

    .cta-btns {
      margin: 5em 0;
      display: flex;
      gap: 2em;
      .primary-cta {
        background-color: rgb(15, 35, 66);
        font-size: 1.8rem;
        text-decoration: none;
        font-weight: bold;
        color: #ffff;
        border-radius: 1.9rem;
        padding: 1em 2em;
      }

      .primary-cta:hover {
        background-color: rgb(42, 76, 125);
      }

      .secondary-cta {
        font-size: 1.8rem;
        text-decoration: none;
        color: black;
        display: flex;
        padding: 1em 0;
        align-items: center;

        svg {
          width: 20px;
          transition: transform 0.3s;
        }
      }

      .secondary-cta:hover svg {
        transform: translateX(10px);
      }
    }
  }

  .right-section {
    background-color: rgb(15, 35, 66);
    padding: 2em;
    border-radius: 25px;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    animation-name: right-animation;
    animation-duration: 1s;
    .premium-actions {
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 2.2em;
      .crud-txt {
        font-weight: bold;
        min-width: 15%;
      }
      p {
        color: rgb(255, 255, 255);
        text-align: left;
        font-size: 1.8rem;
      }
    }
  }
}
</style>
