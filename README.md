Bem-html-to-css - parser which main goal is parse html and create css. This css must use convention.
===============

See next few example to understand how parser work.

~~~html
<div class="header">
  <div class="header__title">EPAM</div>
  <ul class="header__menu-items">
    <li class="header__menu-item"></li>
    <li class="header__menu-item--selected"></li>
    <li class="header__menu-item--highlighted"></li>
  </ul>
  <img class="header_logo" src="/path_to_image"/>
</div>
~~~


~~~css
.header {
  }
  .header__title{
  }
  .header__menu-items{
    }
    .header__menu-item{
    }
    .header__menu-item--selected{
    }
    .header__menu-item--highlighted{
    }
~~~
