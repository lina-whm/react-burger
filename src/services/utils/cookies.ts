interface CookieOptions {
	expires?: number
	path?: string
}

export const setCookie = (
	name: string,
	value: string,
	options: CookieOptions = {}
): void => {
	let expires = ''
	if (options.expires) {
		const date = new Date()
		date.setTime(date.getTime() + options.expires * 1000)
		expires = '; expires=' + date.toUTCString()
	}
	const path = options.path ? `; path=${options.path}` : '; path=/'
	document.cookie = name + '=' + encodeURIComponent(value) + expires + path
}

export const getCookie = (name: string): string | null => {
	const nameEQ = name + '='
	const cookies = document.cookie.split(';')
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i]
		while (cookie.charAt(0) === ' ') cookie = cookie.substring(1)
		if (cookie.indexOf(nameEQ) === 0) {
			return decodeURIComponent(cookie.substring(nameEQ.length))
		}
	}
	return null
}

export const deleteCookie = (name: string): void => {
	document.cookie = name + '=; Max-Age=-99999999; path=/'
}
