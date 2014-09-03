Bem-html-to-css - parser which main goal is parse html and create css. This css must use convention.
===============

See next few example to understand how parser work.

Example 1
------------

### *.html ###
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

### *.css ###
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


Example 2
------------
### *.html ###
~~~html
<div class="header">
  <div class="header__title">EPAM</div>
  <ul class="header__menu-items">
    <li class="header__menu-item"></li>
    <li class="header__menu-item header__menu-item--selected"></li>
    <li class="header__menu-item header__menu-item--highlighted"></li>
  </ul>
  <img class="header_logo header_logo--left" src="/path_to_image"/>

  <ul class="header__menu-items">
    <li class="header__menu-item"></li>
    <li class="header__menu-item header__menu-item--red-selection"></li>
    <li class="header__menu-item header__menu-item--blue-selection"></li>
  </ul>
  <img class="header_logo header_logo--right" src="/path_to_image"/>
</div>
~~~

### *.css ###
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
    .header__menu-item--red-selection{
    }
    .header__menu-item--blue-selection{
    }
~~~


