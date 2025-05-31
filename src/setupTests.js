import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

jest.mock('punycode', () => ({}), { virtual: true })

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('uuid', () => ({
	v4: () => 'mocked-unique-id',
}))
