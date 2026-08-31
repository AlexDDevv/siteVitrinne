export type Theme = "light" | "dark"

/** Clé de persistance du choix explicite de l'utilisateur. */
export const THEME_KEY = "theme"

/**
 * Script exécuté avant le premier rendu, dans le <head>.
 *
 * Sans lui, la page peint d'abord le thème sombre par défaut puis bascule au
 * montage de React : un utilisateur en clair verrait un éclair sombre. Il est
 * volontairement minuscule et synchrone, et échoue silencieusement si
 * localStorage est inaccessible (navigation privée, cookies bloqués).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`
