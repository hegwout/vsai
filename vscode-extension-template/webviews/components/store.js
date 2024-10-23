import { readable } from 'svelte/store';

const apiURL = "https://jsonplaceholder.typicode.com/todos";

const getData = async () => {
    const res = await fetch(apiURL)
    if (!res.ok) throw new Error('Bad response')
    const items = await res.json()
    return items.slice(0, 20)
}

export const todos = readable([], set => {
    // called when the store is first subscribed (when subscribers goes from 0 to 1)
    getData()
        .then(set)
        .catch(err => {
            console.error('Failed to fetch', err)
        })
    return () => {
        // you can do cleanup here if needed
    }
})