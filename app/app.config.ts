export default defineAppConfig({
  ui: {
    pageGrid: {
      base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
    },
    pageCard: {
      slots: {
        wrapper: 'flex flex-col flex-1 items-center'
      }
    }
  }
})
