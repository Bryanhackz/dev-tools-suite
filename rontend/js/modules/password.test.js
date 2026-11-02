import { test } from 'node:test';
import assert from 'node:assert';
import { generatePassword } from './password.js';

test('generatePassword returns a string of the correct length', () => {
    const pwd = generatePassword(24);
    assert.strictEqual(pwd.length, 24);
});

test('generatePassword handles different lengths', () => {
    assert.strictEqual(generatePassword(8).length, 8);
    assert.strictEqual(generatePassword(64).length, 64);
});

test('generatePassword generates different strings', () => {
    const pwd1 = generatePassword(16);
    const pwd2 = generatePassword(16);
    assert.notStrictEqual(pwd1, pwd2);
});
