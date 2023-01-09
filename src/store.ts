import { writable, derived } from 'svelte/store';

const token = writable(1);
const list = writable([]);
const log = writable([]);

export {token, list, log}