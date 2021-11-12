import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import Find from '../../../src/components/Find/Find';

describe('Find', () => {
    let showFind = true;

    test('opens the Find Collapse', () => {
        render(<Find closeFind={() => { return !showFind }} />);
        const collapse = screen.getByRole('textbox');
        expect(collapse.classList.contains('value')).toBeFalsy();

    });

    test('pass valid find string', () => {
        render(<Find />)
        const findText = screen.getByTestId("find-input");
        fireEvent.change(findText, { target: { value: 'Boise' } })

        expect(findText.value).toEqual("Boise");
    })
});
