import '../src/style/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Welcome', 'CorgiiExample', ['Button', 'Input', 'Menu', 'Icon', 'AutoComplete', 'Progress', 'Upload', 'Transition']],
    },
  },
}
