<template>
  <div class="dashboard-container">
    <h2>Dashboard View <small>Triggers on 767px</small></h2>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Id</div>
        <div class="col col-2">Name</div>
        <div class="col col-3">Hp</div>
        <div class="col col-4">Email</div>
        <div class="col col-5">Role</div>
      </li>
      <li class="table-row">
        <div class="col col-1" data-label="ID">42235</div>
        <div class="col col-2" data-label="Name">John Doe</div>
        <div class="col col-3" data-label="handphone">+60122222222</div>
        <div class="col col-4" data-label="Email">Email</div>
        <div class="col col-5" data-label="Role">Admin</div>
      </li>
    </ul>
  </div>
</template>

<script></script>

<style scoped lang="less">
h2 {
  font-size: 2.6rem;
  margin: 2em 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}

.dashboard-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 10em;
}

.responsive-table {
  li {
    border-radius: 3px;
    padding: 2.5em 3em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5em;
  }

  .table-header {
    background-color: #95a5a6;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .col-1 {
    flex-basis: 20%;
  }
  .col-2 {
    flex-basis: 20%;
  }
  .col-3 {
    flex-basis: 20%;
  }
  .col-4 {
    flex-basis: 20%;
  }
  .col-5 {
    flex-basis: 20%;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row {
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }
    li {
      display: block;
    }
    .col {
      flex-basis: 100%;
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
</style>
