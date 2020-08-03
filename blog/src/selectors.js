import { createSelector } from 'reselect'

import nocodeSelectors from '@nocode-works/template/store/selectors/nocode'

const blogbarLinks = createSelector(
  nocodeSelectors.nodes,
  (nodes) => {
    return [{
      id: 'root',
      name: 'Home',
      route: {
        name: 'root',
        path: '/',
      },
    }, {
      id: 'blogbar-travel',
      name: 'Travel',
      route: {
        name: 'tag',
        path: '/tag',
        params: {
          tag: 'travel',
        }
      },
    }, {
      id: 'blogbar-food',
      name: 'Food',
      route: {
        name: 'tag',
        path: '/tag',
        params: {
          tag: 'food',
        }
      },
    }]
  }
)

const selectors = {
  blogbarLinks,
}

export default selectors