<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Vue3 Bootstrap Datatable</h3>

  <p align="center">
    Feature complete datatable based on Bootstrap for Vue3
    <br />
    <a href="https://github.com/Infineon/infineon-vue-datatable/issues">Report Bug</a>
    ·
    <a href="https://github.com/Infineon/infineon-vue-datatable/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#basic-example">Basic Example</a></li>
        <li><a href="#edit-example">Edit Example</a></li>
        <li><a href="#hidden-rows-example">Hidden Rows Example</a></li>
        <li><a href="#dynamically-calculate-column-value">Dynamically calculate column value</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<a href="https://github.com/Infineon/infineon-vue-datatable">
  <img src="https://github.com/Infineon/infineon-vue-datatable/blob/master/images/screenshot.png?raw=true" alt="Datatable Screenshot">
</a>

This is a feature complete datatable based on Vue3 and Bootstrap. It is under active development.
If you need new features or want existing ones enhanced feel free to submit an feature request or contribute directly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Vue][Vue.js]][Vue-url] [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you include and use this datatable in your Vue3 application - All examples here are using <a href="https://vuejs.org/guide/scaling-up/sfc.html">Single File Components</a> and <a href="https://vuejs.org/guide/extras/composition-api-faq.html">Composition API</a>.

### Installation

   ```sh
   npm install --save @infineon/infineon-vue-datatable
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### Basic Example
This example displays the data in "rows"

   ```html
  <template>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </template>
  ```
  ```html
  <script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';

const rows = [
    { id: 1, name: 'item1'},
    { id: 2, name: 'item2'},
    { id: 3, name: 'item3'},
    { id: 4, name: 'item4'}
];

const columns = [
    {
      key: 'id',
      title: 'ID column title',
      sortable: true,
      sortType: 'NUMBER',
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      sortType: 'STRING',
    }
  ];
</script>
  ```
### Edit Example
Edit functionality for Text + Drop Downs is build in
   ```html
  <template>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :editable="true"
    />
  </template>
  ```
  ```html
  <script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';

const rows = [
    { id: 1, name: 'item1', type: 'A'},
    { id: 2, name: 'item2', type: 'B'},
    { id: 3, name: 'item3', type: 'A'},
    { id: 4, name: 'item4', type: 'D'}
];

const columns = [
    {
      key: 'id',
      title: 'ID column title',
      sortable: true,
      sortType: 'NUMBER',
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      sortType: 'STRING',
      // enables string editing together with editable=true in template
      editable: true,
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true,
      sortType: 'STRING',
      // enables drop down together with editable=true in template
      editable: true,
      possibleValues: ['A', 'B', 'C', 'D']
    }
  ];
</script>
  ```

### Hidden Rows Example
Columns can be hidden by the user. This feature is used if the table has to many columns. The state will be persisted in browser cache that means if the user reopens the application he will have the same configuration as last time.
   ```html
  <template>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </template>
  ```
  ```html
  <script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';

const rows = [
    { id: 1, name: 'item1', type: 'A'},
    { id: 2, name: 'item2', type: 'B'},
    { id: 3, name: 'item3', type: 'A'},
    { id: 4, name: 'item4', type: 'D'}
];

const columns = [
    {
      key: 'id',
      title: 'ID column title',
      sortable: true,
      sortType: 'NUMBER',
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      sortType: 'STRING',
      // marks the column as hidable - means a X will apear next to its header where the user can click on.
      hidable: true,
    },
    {
      key: 'type',
      title: 'Type',
      sortable: true,
      sortType: 'STRING',
      // marks the column as hidable - means a X will apear next to its header where the user can click on.
      hidable: true,
      // determins if the default state is hidden. Only on first load - on each subsequential page load the browser cache will be used.
      defaultHidden: true,
    }
  ];
</script>
  ```

### Dynamically calculate column value
What really is displayed to the user can be different from the applications datastructure. Things like formatting dates and replacing user IDs with real names needs to be done in order to make our data understandable.
Because we want to keep this example simple we just multiplie a column with another one.
   ```html
  <template>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </template>
  ```
  ```html
  <script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';

const rows = [
    { id: 1, name: 'item1', amount: 5, price: 1.5},
    { id: 2, name: 'item2', amount: 6, price: 1.2},
    { id: 3, name: 'item3', amount: 7, price: 0.7},
    { id: 4, name: 'item4', amount: 8, price: 1.9}
];

// method that is calculating our amount.
// we get the whole row as parameter
const amountValueResolver = (row) => {
  const { amount, price } = row;
  return amount * price + ' €';
}

const columns = [
    {
      key: 'id',
      title: 'ID column title',
      sortable: true,
      sortType: 'NUMBER',
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      sortType: 'STRING',
    },
    {
      // we still need the key attribute even that we get our display value from the valueResolver.
      key: 'amountXPrice',
      title: 'Amount times price',
      sortable: true,
      sortType: 'STRING',
      valueResolver: (row) => row.sourcePostTimeDate,
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      sortType: 'NUMBER',
    }
  ];
</script>
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Change Design to match Infineons Digital Design System

See the [open issues](https://github.com/Infineon/infineon-vue-datatable/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Kai Werther - kai.werther@infineon.com

Project Link: [https://github.com/Infineon/infineon-vue-datatable](https://github.com/Infineon/infineon-vue-datatable)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Infineon/infineon-vue-datatable.svg?style=for-the-badge
[contributors-url]: https://github.com/Infineon/infineon-vue-datatable/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Infineon/infineon-vue-datatable.svg?style=for-the-badge
[forks-url]: https://github.com/Infineon/infineon-vue-datatable/network/members
[stars-shield]: https://img.shields.io/github/stars/Infineon/infineon-vue-datatable.svg?style=for-the-badge
[stars-url]: https://github.com/Infineon/infineon-vue-datatable/stargazers
[issues-shield]: https://img.shields.io/github/issues/Infineon/infineon-vue-datatable.svg?style=for-the-badge
[issues-url]: https://github.com/Infineon/infineon-vue-datatable/issues
[license-shield]: https://img.shields.io/github/license/Infineon/infineon-vue-datatable.svg?style=for-the-badge
[license-url]: https://github.com/Infineon/infineon-vue-datatable/blob/master/LICENSE.txt
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
