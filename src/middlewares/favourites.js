/* global fetch:false */
import {
  fetchFavouritesActionCreator,
  toggleFavouriteActionCreator,
  REHYDRATED,
  TOGGLE_FAVOURITE_TYPE
} from '../actions'
import { getFavouritesApiUrl } from '../selectors'

const fetchFavourites = async (apiUrl) => {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error('Failed to fetch favourites')
    error.status = response.status
    throw error
  }
  return data
}

const addFavourite = async (apiUrl, eventId) => {
  let url = apiUrl
  if (eventId) {
    url += '/' + eventId
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error('Failed to add favourite')
    error.status = response.status
    throw error
  }

  return data
}

const deleteFavourite = async (apiUrl, eventId) => {
  let url = apiUrl
  if (eventId) {
    url += '/' + eventId
  }

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error('Failed to delete favourite')
    error.status = response.status
    throw error
  }

  return data
}

export default store => next => action => {
  const ret = next(action)

  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  } else if (action.type === TOGGLE_FAVOURITE_TYPE) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    const eventId = action.payload
    const { favourites } = state.favourites

    if (favourites.indexOf(eventId) === -1) {
      store.dispatch(toggleFavouriteActionCreator(addFavourite(apiUrl, eventId)))
    } else {
      store.dispatch(toggleFavouriteActionCreator(deleteFavourite(apiUrl, eventId)))
    }
  }

  return ret
}
