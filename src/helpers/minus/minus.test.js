import { minus } from './minus';

describe('minus', () => {
    test('positive', () => {
        expect(minus(5, 5)).toBe(0)
    })

    test('negative', () => {
        expect(minus(-5, -5)).toBe(0)
    })
})