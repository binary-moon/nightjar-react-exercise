export const createIsFavouritedSelector = id => state => {
  const { favourites } = state.favourites
  return favourites.indexOf(id) > -1
}
